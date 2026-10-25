import { router } from 'expo-router';
import type { Question } from '@/game/content';
import { analytics } from '@/services/analytics';
import { freeExhausted, shouldOfferExhausted } from './exhausted';

/**
 * Chame ao começar uma partida (ou revanche) local. Registra no funil e, se for a hora, abre o paywall por cima da partida.
 * Devolve o novo `exhaustedOfferAt` quando mostrou (pra salvar), ou null.
 */
export function offerIfExhausted(
  s: { premium: boolean; pool: readonly Question[]; played: readonly string[]; lastOfferAt: number | null },
  where: 'setup' | 'rematch',
  now = Date.now(),
): number | null {
  if (s.premium) return null;
  const exhausted = freeExhausted(s.pool, s.played);
  if (!exhausted) return null;
  analytics.track('free_exhausted', { where, played: s.played.length });
  if (!shouldOfferExhausted({ premium: s.premium, exhausted, lastOfferAt: s.lastOfferAt }, now)) return null;
  // espera a tela da partida assentar antes de subir o paywall
  setTimeout(() => router.push({ pathname: '/paywall', params: { source: 'exhausted' } }), 450);
  return now;
}
