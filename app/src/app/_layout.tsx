import { RethinkSans_500Medium } from '@expo-google-fonts/rethink-sans/500Medium';
import { RethinkSans_600SemiBold } from '@expo-google-fonts/rethink-sans/600SemiBold';
import { RethinkSans_700Bold } from '@expo-google-fonts/rethink-sans/700Bold';
import { RethinkSans_800ExtraBold } from '@expo-google-fonts/rethink-sans/800ExtraBold';
import { Syne_800ExtraBold } from '@expo-google-fonts/syne/800ExtraBold';
import { useFonts } from 'expo-font';
import { router, SplashScreen, Stack, useGlobalSearchParams, usePathname, useSegments } from 'expo-router';
import { PostHogProvider } from 'posthog-react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, type ReactNode } from 'react';
import { AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { analytics, posthog } from '@/services/analytics';
import { dailyDone } from '@/game/daily';
import { onReminderOpened, rescheduleReminders } from '@/services/engagement/reminders';
import { purchases, storeMode } from '@/services/purchases';
import { onlineEnabled } from '@/services/rooms';
import { ensureUserId } from '@/services/supabase';
import { AppProvider, useApp } from '@/state/app';
import { NEW_VISIT_AFTER_MS, visits } from '@/state/visits';
import { colors } from '@/theme';
import { lang } from '@/i18n';

void SplashScreen.preventAutoHideAsync();

/** Uma tela por troca de rota: o nome é a rota do arquivo (`/pack/[id]`), o caminho e os parâmetros vão junto. */
function useScreenTracking() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useGlobalSearchParams();
  useEffect(() => {
    const route = `/${segments.join('/')}`;
    const p = Object.fromEntries(Object.entries(params).map(([k, v]) => [`param_${k}`, Array.isArray(v) ? v.join(',') : v]));
    analytics.screen(route === '/' ? '/index' : route, { path: pathname, ...p });
    // segments e params mudam junto com o pathname
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}

/** Quem é a pessoa: o id do Supabase (o mesmo do RevenueCat) e um retrato do uso, atualizado quando muda. */
function usePerson() {
  const app = useApp();
  const person = {
    name: app.name || null,
    premium: app.premium,
    onboarded: app.onboarded,
    matches_finished: app.matchesFinished,
    questions_played: app.played.length,
    packs: app.packs,
    lives: app.lives,
    timer: app.timer,
    sounds: app.sounds,
    haptics: app.haptics,
    reminders_on: app.remindersOn,
    avoid_repeats: app.avoidRepeats,
  };
  const key = JSON.stringify(person);
  const identified = useRef(false);
  useEffect(() => {
    if (!app.ready) return;
    if (identified.current) return analytics.person(person);
    identified.current = true;
    const once = { first_open_at: app.firstOpenAt ? new Date(app.firstOpenAt).toISOString() : null };
    (onlineEnabled ? ensureUserId() : Promise.reject(new Error('offline')))
      .then((id) => analytics.identify(id, person, once))
      .catch(() => analytics.person({ ...person, ...once }));
    // o retrato inteiro está em `key`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.ready, key]);
}

function Root() {
  const { ready, remindersOn, set, premium, onboarded, matchesFinished, daily } = useApp();
  useScreenTracking();
  usePerson();
  const [fontsLoaded, fontError] = useFonts({ Syne_800ExtraBold, RethinkSans_500Medium, RethinkSans_600SemiBold, RethinkSans_700Bold, RethinkSans_800ExtraBold });
  const loaded = ready && (fontsLoaded || !!fontError);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => visits.onAppState(s, Date.now()));
    return () => sub.remove();
  }, []);

  // funil: uma abertura por visita (do zero, ou voltando depois de 30 min); "pro" e o idioma vão junto em todo evento
  useEffect(() => {
    analytics.register({ premium, lang });
  }, [premium]);
  useEffect(() => {
    if (!ready) return;
    analytics.track('app_opened', { onboarded, matches_finished: matchesFinished });
    let away: number | null = null;
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'background') away ??= Date.now();
      else if (s === 'active' && away !== null) {
        if (Date.now() - away >= NEW_VISIT_AFTER_MS) analytics.track('app_opened', { resumed: true });
        away = null;
      }
    });
    return () => sub.remove();
    // só na abertura: os valores servem de retrato do momento
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // loja: com RevenueCat, o entitlement `pro` manda no premium (no mock não faz nada)
  useEffect(() => {
    if (!ready || storeMode !== 'revenuecat') return;
    // mesmo id do Supabase, pra o servidor conferir a assinatura de quem cria sala
    void purchases.start(async () => (onlineEnabled ? ensureUserId() : null), (premium) => set({ premium }));
  }, [ready, set]);

  // lembretes: refaz o plano ao abrir, ao voltar pro app e ao fazer o desafio (o de hoje para de avisar)
  const doneToday = dailyDone(daily, new Date());
  useEffect(() => {
    if (!ready) return;
    void rescheduleReminders(remindersOn, doneToday);
    const sub = AppState.addEventListener('change', (s) => s === 'active' && void rescheduleReminders(remindersOn, dailyDone(daily, new Date())));
    return () => sub.remove();
  }, [ready, remindersOn, doneToday, daily]);

  // tocou no aviso do desafio: abre o desafio
  useEffect(() => {
    if (!ready || !onboarded) return;
    return onReminderOpened((url) => {
      analytics.track('reminder_opened', { url });
      router.push(url as '/daily');
    });
  }, [ready, onboarded]);

  useEffect(() => {
    if (loaded) void SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.paper }, animation: 'fade' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
      <Stack.Screen name="paywall" options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom', gestureEnabled: false }} />
      <Stack.Screen name="how-to-play" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="setup" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="game" options={{ gestureEnabled: false }} />
      <Stack.Screen name="pack/[id]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="online/[id]" options={{ gestureEnabled: false }} />
      <Stack.Screen name="settings" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="daily" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="pin/join" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="pin/create" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}

/** Sem chave (desenvolvimento), sem PostHog: o app roda igual. */
function Analytics({ children }: { children: ReactNode }) {
  if (!posthog) return <>{children}</>;
  return (
    <PostHogProvider client={posthog} autocapture={{ captureScreens: false, captureTouches: true }}>
      {children}
    </PostHogProvider>
  );
}

export default function RootLayout() {
  return (
    <Analytics>
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar style="dark" />
          <Root />
        </AppProvider>
      </SafeAreaProvider>
    </Analytics>
  );
}
