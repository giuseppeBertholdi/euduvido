/**
 * Funil de uso (PostHog pela API HTTP, sem SDK nativo: roda no Expo Go e não muda o build).
 *  - Liga com EXPO_PUBLIC_POSTHOG_KEY (e EXPO_PUBLIC_POSTHOG_HOST, padrão a nuvem dos EUA). Sem chave, não manda nada
 *    (em desenvolvimento, só mostra no console).
 *  - Anônimo: um id aleatório criado neste celular, sem IDFA, sem nome, sem e-mail; a geolocalização por IP vai desligada.
 *  - Os eventos ficam numa fila e saem em lote: a cada 15 s, com 20 na fila, ou quando o app vai pro fundo.
 * Os nomes dos eventos estão em `Event` (é o funil: onboarding → paywall → partida → grátis acabou → compra).
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { AppState, Platform } from 'react-native';

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
  | 'match_finished'
  | 'free_exhausted'
  | 'room_created'
  | 'room_joined'
  | 'card_shared'
  | 'invite_shared'
  | 'review_tapped'
  | 'reminders_answered';

type Props = Record<string, string | number | boolean | null | undefined | string[]>;

const KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const HOST = (process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com').replace(/\/$/, '');
const ID_KEY = 'euduvido:aid';
const FLUSH_EVERY_MS = 15_000;
const FLUSH_AT = 20;
/** Se a rede falhar por muito tempo, a fila não cresce sem limite: os mais velhos saem. */
const MAX_QUEUE = 300;

export const analyticsEnabled = !!KEY;

type Queued = { event: string; properties: Props; timestamp: string };

let queue: Queued[] = [];
let distinctId: string | null = null;
let idLoading: Promise<string> | null = null;
let sending = false;
let timer: ReturnType<typeof setInterval> | null = null;
/** Propriedades que vão em todo evento (ex.: se é pro). */
const superProps: Props = {};

const BASE: Props = {
  $lib: 'euduvido-http',
  $os: Platform.OS,
  $os_version: String(Platform.Version),
  $app_version: Constants.expoConfig?.version ?? null,
  $geoip_disable: true,
};

function randomId(): string {
  const hex = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  return `${hex(8)}-${hex(4)}-4${hex(3)}-${hex(4)}-${hex(12)}`;
}

function loadId(): Promise<string> {
  idLoading ??= AsyncStorage.getItem(ID_KEY)
    .then(async (saved) => {
      if (saved) return saved;
      const fresh = randomId();
      await AsyncStorage.setItem(ID_KEY, fresh).catch(() => undefined);
      return fresh;
    })
    .catch(() => randomId())
    .then((id) => (distinctId = id));
  return idLoading;
}

async function flush(): Promise<void> {
  if (!KEY || sending || queue.length === 0) return;
  sending = true;
  const id = distinctId ?? (await loadId());
  const batch = queue;
  queue = [];
  try {
    const res = await fetch(`${HOST}/batch/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: KEY, batch: batch.map((e) => ({ ...e, properties: { ...e.properties, distinct_id: id } })) }),
    });
    // erro do servidor: tenta de novo depois; 4xx (chave errada, evento inválido): descarta pra não travar a fila
    if (res.status >= 500) queue = [...batch, ...queue].slice(-MAX_QUEUE);
  } catch {
    queue = [...batch, ...queue].slice(-MAX_QUEUE);
  } finally {
    sending = false;
  }
}

function startLoop() {
  if (timer || !KEY) return;
  void loadId();
  timer = setInterval(() => void flush(), FLUSH_EVERY_MS);
  AppState.addEventListener('change', (s) => s !== 'active' && void flush());
}

export const analytics = {
  /** Registra um evento. Nunca lança erro nem espera a rede. */
  track(event: Event, props: Props = {}): void {
    if (!KEY) {
      if (__DEV__) console.log(`[analytics] ${event}`, props);
      return;
    }
    startLoop();
    queue.push({ event, properties: { ...BASE, ...superProps, ...props }, timestamp: new Date().toISOString() });
    if (queue.length > MAX_QUEUE) queue = queue.slice(-MAX_QUEUE);
    if (queue.length >= FLUSH_AT) void flush();
  },
  /** Propriedades que passam a ir em todos os eventos. */
  register(props: Props): void {
    Object.assign(superProps, props);
  },
};
