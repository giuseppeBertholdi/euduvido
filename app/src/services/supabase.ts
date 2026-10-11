import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

/**
 * Cliente do Supabase. URL e chave anon vêm do `.env` (EXPO_PUBLIC_*, públicas por natureza: a RLS protege os dados).
 * Sem elas, o online fica desligado e o resto do app funciona igual.
 */
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { storage: AsyncStorage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
      })
    : null;

// Recomendado pro React Native: só renova o token com o app em primeiro plano.
if (supabase) {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}

/**
 * Garante uma sessão (login anônimo) e devolve o id do usuário.
 * Chamadas ao mesmo tempo dividem o mesmo login: sem isso, o primeiro uso do app criava DOIS usuários anônimos
 * (a sala nascia com um e a tela usava o outro, e o host não era reconhecido).
 */
let pendingUser: Promise<string> | null = null;
export function ensureUserId(): Promise<string> {
  if (!supabase) return Promise.reject(new Error('offline_disabled'));
  const db = supabase;
  pendingUser ??= (async () => {
    const { data } = await db.auth.getSession();
    if (data.session?.user) return data.session.user.id;
    const { data: signed, error } = await db.auth.signInAnonymously();
    if (error || !signed.user) throw error ?? new Error('auth_failed');
    return signed.user.id;
  })().finally(() => {
    pendingUser = null;
  });
  return pendingUser;
}
