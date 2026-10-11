// GERADO por scripts/sync-engine.mjs a partir de src/game/played.ts. Não edite aqui.
import type { Question } from './questions.ts';

/** Abaixo disso, o filtro de repetidas desiste e usa o pacote inteiro (melhor repetir do que jogar com 3 perguntas). */
export const MIN_FRESH = 8;

/**
 * Perguntas pra partida, pulando as que já saíram (se `avoid`).
 * `recycled = true` quando as novas acabaram e o pacote volta a repetir.
 */
export function freshPool(pool: Question[], played: readonly string[], avoid: boolean): { pool: Question[]; fresh: number; recycled: boolean } {
  if (!avoid) return { pool, fresh: pool.length, recycled: false };
  const seen = new Set(played);
  const fresh = pool.filter((q) => !seen.has(q.id));
  return fresh.length >= MIN_FRESH ? { pool: fresh, fresh: fresh.length, recycled: false } : { pool, fresh: fresh.length, recycled: true };
}
