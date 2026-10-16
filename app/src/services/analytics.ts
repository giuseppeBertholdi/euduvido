/**
 * Analytics com o SDK do PostHog (`posthog-react-native` + `@posthog/react-native-plugin` pra gravação e crashes).
 *  - Liga com EXPO_PUBLIC_POSTHOG_KEY (e EXPO_PUBLIC_POSTHOG_HOST, padrão a nuvem dos EUA). Sem chave, não manda nada
 *    (em desenvolvimento, só mostra no console).
 *  - Pessoa: o id é o mesmo do Supabase (`identify` em _layout), com o nome do onboarding e um retrato do uso
 *    (`person`). Cidade e país vêm do IP (geoIP ligado).
 *  - Telas: `screen` a cada troca de rota do Expo Router (_layout). Toques, abertura/fundo do app e erros são automáticos.
 *  - Gravação de sessão sem máscara (dá pra ver o que foi digitado); a gravação também precisa estar ligada no projeto.
 *    Funciona só em build (não no Expo Go).
 * Os nomes dos eventos estão em `Event` (o funil: onboarding → paywall → partida → rodada → grátis acabou → compra).
 */
import PostHog from 'posthog-react-native';

export type Event =
  | 'app_opened'
  | 'onboarding_step'
  | 'onboarding_completed'
  | 'paywall_viewed'
  | 'paywall_closed'
  | 'purchase_started'
  | 'purchase_completed'
  | 'purchase_failed'
  | 'restore_tapped'
  | 'pack_opened'
  | 'match_started'
  | 'round_revealed'
  | 'match_finished'
  | 'free_exhausted'
  | 'room_created'
  | 'room_joined'
  | 'card_shared'
  | 'invite_shared'
  | 'review_tapped'
  | 'setting_changed'
  | 'reminders_answered';

type Value = string | number | boolean | null | undefined | string[];
type Props = Record<string, Value>;

const KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const HOST = (process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com').replace(/\/$/, '');

export const analyticsEnabled = !!KEY;

export const posthog: PostHog | null = KEY
  ? new PostHog(KEY, {
      host: HOST,
      personProfiles: 'always',
      captureAppLifecycleEvents: true,
      enableSessionReplay: true,
      sessionReplayConfig: { maskAllTextInputs: false, maskAllImages: false, captureNetworkTelemetry: true },
      errorTracking: { autocapture: { uncaughtExceptions: true, unhandledRejections: true, nativeCrashes: true } },
    })
  : null;

/** Tira os undefined (o PostHog grava null, e "não informado" é diferente de "vazio"). */
function clean(props: Props): Record<string, Exclude<Value, undefined>> {
  return Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined)) as Record<string, Exclude<Value, undefined>>;
}

function devLog(what: string, props?: Props) {
  if (__DEV__) console.log(`[analytics] ${what}`, props ?? '');
}

export const analytics = {
  /** Registra um evento. Nunca lança erro nem espera a rede. */
  track(event: Event, props: Props = {}): void {
    if (!posthog) return devLog(event, props);
    posthog.capture(event, clean(props));
  },
  /** Propriedades que passam a ir em todos os eventos (ex.: se é pro). */
  register(props: Props): void {
    if (!posthog) return devLog('register', props);
    void posthog.register(clean(props));
  },
  /** Uma tela do Expo Router (a rota, ex. `/pack/[id]`, com os parâmetros). */
  screen(route: string, props: Props = {}): void {
    if (!posthog) return devLog(`screen ${route}`, props);
    void posthog.screen(route, clean(props));
  },
  /** Liga os eventos deste celular à pessoa (id do Supabase) e grava o retrato dela. */
  identify(userId: string, person: Props, once: Props = {}): void {
    if (!posthog) return devLog(`identify ${userId}`, person);
    posthog.identify(userId, { $set: clean(person), $set_once: clean(once) });
  },
  /** Atualiza o retrato da pessoa (nome, pro, partidas...) sem trocar o id. */
  person(props: Props): void {
    if (!posthog) return devLog('person', props);
    posthog.setPersonProperties(clean(props));
  },
};
