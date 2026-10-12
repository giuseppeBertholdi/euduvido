import { RethinkSans_500Medium } from '@expo-google-fonts/rethink-sans/500Medium';
import { RethinkSans_600SemiBold } from '@expo-google-fonts/rethink-sans/600SemiBold';
import { RethinkSans_700Bold } from '@expo-google-fonts/rethink-sans/700Bold';
import { RethinkSans_800ExtraBold } from '@expo-google-fonts/rethink-sans/800ExtraBold';
import { Syne_800ExtraBold } from '@expo-google-fonts/syne/800ExtraBold';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { analytics } from '@/services/analytics';
import { rescheduleReminders } from '@/services/engagement/reminders';
import { purchases, storeMode } from '@/services/purchases';
import { onlineEnabled } from '@/services/rooms';
import { ensureUserId } from '@/services/supabase';
import { AppProvider, useApp } from '@/state/app';
import { NEW_VISIT_AFTER_MS, visits } from '@/state/visits';
import { colors } from '@/theme';

void SplashScreen.preventAutoHideAsync();

function Root() {
  const { ready, remindersOn, set, premium, onboarded, matchesFinished } = useApp();
  const [fontsLoaded, fontError] = useFonts({ Syne_800ExtraBold, RethinkSans_500Medium, RethinkSans_600SemiBold, RethinkSans_700Bold, RethinkSans_800ExtraBold });
  const loaded = ready && (fontsLoaded || !!fontError);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => visits.onAppState(s, Date.now()));
    return () => sub.remove();
  }, []);

  // funil: uma abertura por visita (do zero, ou voltando depois de 30 min); "pro" vai junto em todo evento
  useEffect(() => {
    analytics.register({ premium });
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

  // lembretes: refaz o plano ao abrir e ao voltar pro app (quem joga sempre nunca recebe)
  useEffect(() => {
    if (!ready) return;
    void rescheduleReminders(remindersOn);
    const sub = AppState.addEventListener('change', (s) => s === 'active' && void rescheduleReminders(remindersOn));
    return () => sub.remove();
  }, [ready, remindersOn]);

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
      <Stack.Screen name="pin/join" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="pin/create" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" />
        <Root />
      </AppProvider>
    </SafeAreaProvider>
  );
}
