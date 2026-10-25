import { MIN_FRESH } from '../../game/played';
import type { Question } from '../../game/content';

/**
 * "Vocês zeraram as grátis": quem não assina e já jogou (quase) todas as perguntas liberadas vê o paywall nesse momento,
 * que é quando ele faz mais sentido. No máximo uma vez a cada EXHAUSTED_EVERY_MS, pra não virar castigo: a partida
 * começa do mesmo jeito (repetindo perguntas) e a oferta sobe por cima.
 */
export const EXHAUSTED_EVERY_MS = 20 * 60 * 60 * 1000;

/** Sobraram menos de MIN_FRESH perguntas novas (independe do interruptor de pular as repetidas). */
export function freeExhausted(pool: readonly Question[], played: readonly string[]): boolean {
  const seen = new Set(played);
  return pool.filter((q) => !seen.has(q.id)).length < MIN_FRESH;
}

export function shouldOfferExhausted(s: { premium: boolean; exhausted: boolean; lastOfferAt: number | null }, now: number): boolean {
  if (s.premium || !s.exhausted) return false;
  return s.lastOfferAt === null || now - s.lastOfferAt >= EXHAUSTED_EVERY_MS;
}
