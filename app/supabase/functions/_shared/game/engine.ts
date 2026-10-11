// GERADO por scripts/sync-engine.mjs a partir de src/game/engine.ts. Não edite aqui.
/**
 * Motor do Eu Duvido! — TS puro, sem I/O, sem Date nem Math.random (`now` e `rng` são injetados), pra rodar igual
 * no app (partida local) e na Edge Function (online: `npm run sync:engine` copia este arquivo pro Supabase).
 *
 * Regras (como o Nem a Pato e o modo número do I_doubt):
 *  - Aparece a pergunta (resposta numérica). Quem abre dá o primeiro lance.
 *  - Um lance quer dizer "a resposta é X ou mais".
 *  - Na sua vez: aumenta o lance (no mínimo +1) ou grita "eu duvido!" do último lance.
 *  - Duvidou: revela a resposta. Se o lance passou da resposta, quem deu o lance perde uma vida;
 *    se não passou, quem duvidou perde.
 *  - Com timer: estourou o tempo da vez, perde uma vida.
 *  - Sem vidas, sai da partida. O último que sobrar ganha. Quem perdeu a vida abre a próxima rodada.
 */
import type { Question } from './questions.ts';

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 8;
export const LIVES_OPTIONS = [2, 3, 5] as const;
export const TIMER_OPTIONS = [null, 15, 30, 60] as const;
export const MAX_BID = 9_999_999_999_999;

export type Player = { id: string; name: string };
export type Bid = { playerId: string; value: number };
export type Phase = 'intro' | 'turn' | 'result' | 'end';

export type RoundResult = {
  answer: number;
  /** `over`: o lance passou da resposta (o blefe caiu). `ok`: a resposta é igual ou maior. `timeout`: a vez estourou. */
  outcome: 'over' | 'ok' | 'timeout';
  /** O lance contestado (null quando o tempo estourou antes de qualquer lance). */
  bid: Bid | null;
  /** Quem duvidou (null no timeout). */
  doubterId: string | null;
  loserId: string;
  eliminated: boolean;
};

export type Match = {
  players: Player[];
  lives: Record<string, number>;
  startLives: number;
  /** Segundos por vez, ou null sem timer. */
  turnSeconds: number | null;
  /** Fim da vez atual (ms, no relógio de quem roda o motor), ou null. */
  deadline: number | null;
  /** Fila de perguntas já embaralhada; reembaralha (volta ao início) quando acaba. */
  deck: Question[];
  deckIndex: number;
  round: number;
  question: Question;
  openerId: string;
  turnId: string;
  bids: Bid[];
  phase: Phase;
  result: RoundResult | null;
  /** Ordem em que o pessoal saiu (pro ranking final). */
  out: string[];
  winnerId: string | null;
};

/** O que todo mundo pode ver: sem o baralho e sem a resposta antes da revelação. */
export type PublicQuestion = { id: string; text: string; unit: string; answer?: number; fact?: string; source?: string };
export type PublicMatch = Omit<Match, 'deck' | 'deckIndex' | 'question'> & { question: PublicQuestion };

export type Action =
  | { type: 'START_TURN' }
  | { type: 'BID'; value: number }
  | { type: 'DOUBT' }
  | { type: 'TIMEOUT' }
  | { type: 'NEXT_ROUND' }
  | { type: 'REMOVE_PLAYER'; playerId: string };

export type Ctx = { now: number };

export function shuffle<T>(items: T[], rng: () => number): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createMatch({
  players,
  pool,
  lives = 3,
  turnSeconds = null,
  rng,
}: {
  players: Player[];
  pool: Question[];
  lives?: number;
  turnSeconds?: number | null;
  rng: () => number;
}): Match {
  if (players.length < MIN_PLAYERS || players.length > MAX_PLAYERS) throw new RangeError('players');
  if (pool.length === 0) throw new RangeError('pool');
  const deck = shuffle(pool, rng);
  const opener = players[Math.floor(rng() * players.length)].id;
  return {
    players,
    lives: Object.fromEntries(players.map((p) => [p.id, lives])),
    startLives: lives,
    turnSeconds,
    deadline: null,
    deck,
    deckIndex: 0,
    round: 1,
    question: deck[0],
    openerId: opener,
    turnId: opener,
    bids: [],
    phase: 'intro',
    result: null,
    out: [],
    winnerId: null,
  };
}

type View = Pick<Match, 'players' | 'lives' | 'bids' | 'out'>;

export const isActive = (m: Pick<Match, 'lives'>, id: string) => (m.lives[id] ?? 0) > 0;
export const activePlayers = (m: View) => m.players.filter((p) => isActive(m, p.id));
export const playerById = (m: Pick<Match, 'players'>, id: string) => m.players.find((p) => p.id === id) ?? { id, name: '?' };
export const lastBid = (m: Pick<Match, 'bids'>): Bid | null => m.bids[m.bids.length - 1] ?? null;

/** Próximo jogador ainda vivo depois de `id`, na ordem da roda. */
export function nextActiveAfter(m: Pick<Match, 'players' | 'lives'>, id: string): string {
  const i = m.players.findIndex((p) => p.id === id);
  for (let k = 1; k <= m.players.length; k++) {
    const p = m.players[(i + k) % m.players.length];
    if (isActive(m, p.id)) return p.id;
  }
  return id;
}

/** Menor lance válido agora: 1 pra abrir, ou o último + 1. */
export function minBid(m: Pick<Match, 'bids'>): number {
  const last = lastBid(m);
  return last ? last.value + 1 : 1;
}

const deadlineFrom = (m: Match, now: number) => (m.turnSeconds ? now + m.turnSeconds * 1000 : null);

/** Fecha a rodada: `loserId` perde uma vida. */
function endRound(m: Match, info: Omit<RoundResult, 'eliminated' | 'answer'>): Match {
  const lives = { ...m.lives, [info.loserId]: Math.max(0, m.lives[info.loserId] - 1) };
  const eliminated = lives[info.loserId] === 0;
  const out = eliminated ? [...m.out, info.loserId] : m.out;
  const alive = m.players.filter((p) => lives[p.id] > 0);
  return {
    ...m,
    lives,
    out,
    phase: 'result',
    deadline: null,
    result: { ...info, answer: m.question.answer, eliminated },
    winnerId: alive.length === 1 ? alive[0].id : null,
  };
}

/** Ação inválida devolve o mesmo objeto (dá pra comparar com `===`). */
export function reduce(m: Match, a: Action, ctx: Ctx = { now: 0 }): Match {
  switch (a.type) {
    case 'START_TURN':
      return m.phase === 'intro' ? { ...m, phase: 'turn', deadline: deadlineFrom(m, ctx.now) } : m;

    case 'BID': {
      if (m.phase !== 'turn' || !Number.isInteger(a.value) || a.value < minBid(m) || a.value > MAX_BID) return m;
      return { ...m, bids: [...m.bids, { playerId: m.turnId, value: a.value }], turnId: nextActiveAfter(m, m.turnId), deadline: deadlineFrom(m, ctx.now) };
    }

    case 'DOUBT': {
      const bid = lastBid(m);
      if (m.phase !== 'turn' || !bid) return m;
      const outcome = bid.value > m.question.answer ? 'over' : 'ok';
      return endRound(m, { outcome, bid, doubterId: m.turnId, loserId: outcome === 'over' ? bid.playerId : m.turnId });
    }

    case 'TIMEOUT': {
      if (m.phase !== 'turn' || m.deadline === null || ctx.now < m.deadline) return m;
      return endRound(m, { outcome: 'timeout', bid: lastBid(m), doubterId: null, loserId: m.turnId });
    }

    case 'NEXT_ROUND': {
      if (m.phase !== 'result' || !m.result) return m;
      if (m.winnerId) return { ...m, phase: 'end' };
      const loser = m.result.loserId;
      const opener = isActive(m, loser) ? loser : nextActiveAfter(m, loser);
      const nextIndex = m.deckIndex + 1 >= m.deck.length ? 0 : m.deckIndex + 1;
      return { ...m, round: m.round + 1, deckIndex: nextIndex, question: m.deck[nextIndex], openerId: opener, turnId: opener, bids: [], phase: 'intro', result: null, deadline: null };
    }

    case 'REMOVE_PLAYER': {
      // saiu da sala (online): perde todas as vidas, sem revelar nada da rodada
      if (!isActive(m, a.playerId) || m.phase === 'end') return m;
      const lives = { ...m.lives, [a.playerId]: 0 };
      const next: Match = { ...m, lives, out: [...m.out, a.playerId] };
      const alive = m.players.filter((p) => lives[p.id] > 0);
      if (alive.length <= 1) return { ...next, phase: 'end', deadline: null, winnerId: alive[0]?.id ?? null };
      if (m.turnId === a.playerId) {
        next.turnId = nextActiveAfter(next, a.playerId);
        if (m.phase === 'turn') next.deadline = deadlineFrom(m, ctx.now);
      }
      if (m.openerId === a.playerId && m.phase === 'intro') next.openerId = next.turnId;
      return next;
    }
  }
}

/** Estado visível pra todos: tira o baralho; a resposta e a curiosidade só aparecem depois da revelação. */
export function publicState(m: Match): PublicMatch {
  const { deck: _deck, deckIndex: _deckIndex, question, ...rest } = m;
  const revealed = m.phase === 'result' || m.phase === 'end';
  return {
    ...rest,
    question: revealed ? { ...question } : { id: question.id, text: question.text, unit: question.unit },
  };
}

/** Ranking final: o vencedor, depois quem saiu por último primeiro. */
export function standings(m: View): Player[] {
  const alive = activePlayers(m);
  return [...alive, ...[...m.out].reverse().map((id) => playerById(m, id))];
}

/** Número em pt-BR com ponto de milhar. */
export function formatNumber(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Anos não levam ponto de milhar ("1960", não "1.960"). */
export function formatValue(n: number, unit: string): string {
  return unit === 'ano' ? String(Math.round(n)) : formatNumber(n);
}

export function formatDigits(digits: string, unit = ''): string {
  return digits === '' ? '0' : formatValue(Number(digits), unit);
}
