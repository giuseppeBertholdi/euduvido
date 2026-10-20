import type { Db } from './clients.ts';
import { HttpError } from './http.ts';
import { createMatch, LIVES_OPTIONS, MAX_PLAYERS, MIN_PLAYERS, publicState, reduce, TIMER_OPTIONS, type Action, type Match } from './game/engine.ts';
import { freshPool } from './game/played.ts';
import { PACKS } from './game/questions.ts';
import { creditReferrals } from './referral.ts';

/** `skip`: perguntas que já saíram (no celular de quem criou + partidas anteriores da sala). */
export type RoomConfig = { lives: number; turnSeconds: number | null; packs: string[]; skip?: string[] };
export type RoomRow = { id: string; pin: string; host_id: string; created_by: string | null; status: string; config: RoomConfig; version: number; expires_at: string };
type PlayerRow = { user_id: string; name: string; seat: number };

// ───────────── validação do que vem do app (nunca confie no cliente) ─────────────

export function parseName(v: unknown): string {
  const name = typeof v === 'string' ? v.trim() : '';
  if (name.length < 1 || name.length > 12) throw new HttpError(400, 'bad_name');
  return name;
}

export function parseConfig(body: Record<string, unknown>): RoomConfig {
  const lives = body.lives;
  const turnSeconds = body.turnSeconds ?? null;
  const packs = body.packs;
  if (typeof lives !== 'number' || !(LIVES_OPTIONS as readonly number[]).includes(lives)) throw new HttpError(400, 'bad_lives');
  if (!(TIMER_OPTIONS as readonly (number | null)[]).includes(turnSeconds as number | null)) throw new HttpError(400, 'bad_timer');
  if (!Array.isArray(packs) || packs.length === 0 || packs.some((p) => typeof p !== 'string' || !PACKS.some((k) => k.id === p))) throw new HttpError(400, 'bad_packs');
  const skip = body.skip ?? [];
  if (!Array.isArray(skip) || skip.length > 1000 || skip.some((s) => typeof s !== 'string' || s.length > 24)) throw new HttpError(400, 'bad_skip');
  return { lives, turnSeconds: turnSeconds as number | null, packs: [...new Set(packs as string[])], skip: [...new Set(skip as string[])] };
}

export function parseUuid(v: unknown, code = 'bad_room'): string {
  if (typeof v !== 'string' || !/^[0-9a-f-]{36}$/i.test(v)) throw new HttpError(400, code);
  return v;
}

// ───────────── leitura ─────────────

export async function getRoom(db: Db, roomId: string): Promise<RoomRow> {
  const { data, error } = await db.from('rooms').select('id, pin, host_id, created_by, status, config, version, expires_at').eq('id', roomId).maybeSingle();
  if (error) throw error;
  if (!data || data.status === 'closed') throw new HttpError(404, 'room_not_found');
  return data as RoomRow;
}

export async function activePlayers(db: Db, roomId: string): Promise<PlayerRow[]> {
  const { data, error } = await db.from('room_players').select('user_id, name, seat').eq('room_id', roomId).is('left_at', null).order('seat');
  if (error) throw error;
  return (data ?? []) as PlayerRow[];
}

export async function requireMember(db: Db, roomId: string, userId: string): Promise<void> {
  const players = await activePlayers(db, roomId);
  if (!players.some((p) => p.user_id === userId)) throw new HttpError(403, 'not_member');
}

async function loadEngine(db: Db, roomId: string): Promise<Match | null> {
  const { data, error } = await db.from('room_secrets').select('engine').eq('room_id', roomId).maybeSingle();
  if (error) throw error;
  return (data?.engine as Match | undefined) ?? null;
}

// ───────────── escrita ─────────────

/** Grava o novo estado se ninguém mexeu antes (versão otimista). Devolve a nova versão. */
async function save(db: Db, room: RoomRow, engine: Match, extra: Partial<Pick<RoomRow, 'status' | 'host_id'>> = {}): Promise<number> {
  const version = room.version + 1;
  const status = extra.status ?? (engine.phase === 'end' ? 'finished' : 'playing');
  const { data, error } = await db
    .from('rooms')
    .update({ state: publicState(engine), version, status, updated_at: new Date().toISOString(), ...extra })
    .eq('id', room.id)
    .eq('version', room.version)
    .select('id');
  if (error) throw error;
  if (!data || data.length === 0) throw new HttpError(409, 'stale_version');
  const { error: secretError } = await db.from('room_secrets').upsert({ room_id: room.id, engine });
  if (secretError) throw secretError;
  if (status === 'finished' && room.status !== 'finished') {
    // convite (3 pessoas novas = 1 semana de pro): se falhar, a partida segue
    const players = await activePlayers(db, room.id);
    await creditReferrals(db, { ...room, ...extra }, players.map((p) => p.user_id)).catch((e) => console.error('referral', e));
  }
  return version;
}

function newMatch(config: RoomConfig, players: PlayerRow[], alsoSkip: string[] = []): Match {
  const all = PACKS.filter((p) => config.packs.includes(p.id)).flatMap((p) => p.questions);
  const { pool } = freshPool(all, [...(config.skip ?? []), ...alsoSkip], true);
  return createMatch({
    players: players.map((p) => ({ id: p.user_id, name: p.name })),
    pool,
    lives: config.lives,
    turnSeconds: config.turnSeconds,
    rng: Math.random,
  });
}

/** Host começa a partida (lobby) ou joga de novo (fim). */
export async function startMatch(db: Db, room: RoomRow, userId: string): Promise<number> {
  if (room.host_id !== userId) throw new HttpError(403, 'host_only');
  if (room.status !== 'lobby' && room.status !== 'finished') throw new HttpError(409, 'already_playing');
  const players = await activePlayers(db, room.id);
  if (players.length < MIN_PLAYERS) throw new HttpError(409, 'not_enough_players');
  // revanche: pula também as perguntas que já saíram na partida anterior
  const previous = room.status === 'finished' ? await loadEngine(db, room.id) : null;
  const asked = previous ? previous.deck.slice(0, previous.deckIndex + 1).map((q) => q.id) : [];
  return save(db, room, newMatch(room.config, players, asked), { status: 'playing' });
}

/** Quem pode fazer cada jogada: o motor confere a regra; aqui conferimos a pessoa. */
function allowed(engine: Match, room: RoomRow, userId: string, action: Action): boolean {
  switch (action.type) {
    case 'START_TURN':
      return userId === engine.openerId || userId === room.host_id;
    case 'BID':
    case 'DOUBT':
      return userId === engine.turnId;
    case 'TIMEOUT':
    case 'NEXT_ROUND':
      return true; // o motor só aceita no momento certo (relógio do servidor no TIMEOUT)
    case 'REMOVE_PLAYER':
      return false; // só via leave-room
  }
}

export function parseAction(v: unknown): Action {
  if (!v || typeof v !== 'object') throw new HttpError(400, 'bad_action');
  const a = v as { type?: unknown; value?: unknown };
  switch (a.type) {
    case 'START_TURN':
    case 'DOUBT':
    case 'TIMEOUT':
    case 'NEXT_ROUND':
      return { type: a.type };
    case 'BID':
      if (typeof a.value !== 'number' || !Number.isInteger(a.value)) throw new HttpError(400, 'bad_bid');
      return { type: 'BID', value: a.value };
    default:
      throw new HttpError(400, 'bad_action');
  }
}

export async function gameAction(db: Db, room: RoomRow, userId: string, action: Action): Promise<number> {
  if (room.status !== 'playing') throw new HttpError(409, 'not_playing');
  const engine = await loadEngine(db, room.id);
  if (!engine) throw new HttpError(409, 'not_playing');
  if (!allowed(engine, room, userId, action)) throw new HttpError(403, 'not_your_turn');
  const next = reduce(engine, action, { now: Date.now() });
  if (next === engine) throw new HttpError(409, 'rejected');
  return save(db, room, next);
}

/** Sai da sala. Na partida, o motor tira o jogador (perde as vidas). Host passa a coroa; sala vazia fecha. */
export async function leave(db: Db, room: RoomRow, userId: string): Promise<void> {
  const { error } = await db.from('room_players').update({ left_at: new Date().toISOString() }).eq('room_id', room.id).eq('user_id', userId).is('left_at', null);
  if (error) throw error;
  const rest = await activePlayers(db, room.id);
  if (rest.length === 0) {
    await db.from('rooms').update({ status: 'closed', version: room.version + 1, updated_at: new Date().toISOString() }).eq('id', room.id);
    return;
  }
  const host_id = room.host_id === userId ? rest[0].user_id : room.host_id;
  const engine = room.status === 'playing' ? await loadEngine(db, room.id) : null;
  if (engine) {
    const next = reduce(engine, { type: 'REMOVE_PLAYER', playerId: userId }, { now: Date.now() });
    // tenta algumas vezes se alguém jogou ao mesmo tempo
    for (let attempt = 0; ; attempt++) {
      try {
        await save(db, room, next, { host_id });
        return;
      } catch (e) {
        if (!(e instanceof HttpError) || e.code !== 'stale_version' || attempt >= 3) throw e;
        room = await getRoom(db, room.id);
      }
    }
  }
  await db.from('rooms').update({ host_id, version: room.version + 1, updated_at: new Date().toISOString() }).eq('id', room.id);
}

/** Menor assento livre (0–7). */
export function freeSeat(players: PlayerRow[]): number {
  for (let s = 0; s < MAX_PLAYERS; s++) if (!players.some((p) => p.seat === s)) return s;
  throw new HttpError(409, 'room_full');
}
