/**
 * Salas com PIN (cada um no seu celular) via Supabase.
 * O app só LÊ a própria sala (RLS) e ouve mudanças pelo Realtime; toda escrita passa pelas Edge Functions,
 * que rodam o mesmo motor (src/game/engine.ts) e guardam a resposta longe do app.
 */
import { FunctionsHttpError } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import type { Action, PublicMatch } from '@/game/engine';
import { ensureUserId, supabase } from './supabase';

export type RoomConfig = { lives: number; turnSeconds: number | null; packs: string[]; skip?: string[] };
export type RoomPlayer = { userId: string; name: string; seat: number };
export type RoomStatus = 'lobby' | 'playing' | 'finished' | 'closed';
export type Room = {
  id: string;
  pin: string;
  hostId: string;
  status: RoomStatus;
  config: RoomConfig;
  state: PublicMatch | null;
  version: number;
  players: RoomPlayer[];
};
export type RoomAction = Action | { type: 'START' } | { type: 'PLAY_AGAIN' };

export const onlineEnabled = !!supabase;

const MESSAGES: Record<string, string> = {
  room_not_found: 'Não achei essa sala. Confere o PIN?',
  already_started: 'Essa partida já começou.',
  room_full: 'Sala lotada (8 pessoas).',
  name_taken: 'Já tem alguém com esse nome na sala.',
  bad_name: 'Bota um nome (até 12 letras).',
  bad_pin: 'O PIN tem 4 números.',
  not_enough_players: 'Precisa de pelo menos 2 pessoas.',
  host_only: 'Só quem criou a sala pode fazer isso.',
  not_your_turn: 'Calma, não é tua vez.',
  stale_version: 'Alguém jogou antes. Atualizando…',
  rejected: 'Essa jogada não vale agora.',
  offline_disabled: 'O online ainda não tá ligado neste app.',
  pro_required: 'Não deu pra criar a sala. Atualiza o app e tenta de novo.',
  store_unavailable: 'Não deu pra conferir a assinatura agora. Tenta de novo.',
  network: 'Sem conexão. Tenta de novo.',
};

export class RoomError extends Error {
  constructor(readonly code: string) {
    super(MESSAGES[code] ?? 'Deu ruim. Tenta de novo.');
  }
}

/** Diferença entre o relógio do servidor e o do celular (pro timer bater com o do servidor). */
let clockOffset = 0;
export const serverNow = () => Date.now() + clockOffset;

async function call<T>(fn: string, body: Record<string, unknown>): Promise<T> {
  if (!supabase) throw new RoomError('offline_disabled');
  await ensureUserId();
  const sentAt = Date.now();
  const { data, error } = await supabase.functions.invoke(fn, { body });
  let payload = data as (Record<string, unknown> & { serverNow?: number; error?: string }) | null;
  if (error) {
    if (error instanceof FunctionsHttpError) payload = await error.context.json().catch(() => null);
    else throw new RoomError('network');
  }
  if (typeof payload?.serverNow === 'number') clockOffset = payload.serverNow - (sentAt + Date.now()) / 2;
  if (!payload || payload.error) throw new RoomError(payload?.error ?? 'internal_error');
  return payload as T;
}

export const createRoom = (name: string, config: RoomConfig) => call<{ roomId: string; pin: string }>('create-room', { name, ...config });
export const joinRoom = async (pin: string, name: string) => (await call<{ roomId: string }>('join-room', { pin, name })).roomId;
export const leaveRoom = (roomId: string) => call('leave-room', { roomId });
export const act = (roomId: string, expectedVersion: number, action: RoomAction) => call<{ version: number }>('room-action', { roomId, expectedVersion, action });
export const myUserId = ensureUserId;

type RoomRow = { id: string; pin: string; host_id: string; status: RoomStatus; config: RoomConfig; state: PublicMatch | null; version: number };

export async function fetchRoom(roomId: string): Promise<Room | null> {
  if (!supabase) throw new RoomError('offline_disabled');
  const [{ data: room, error }, { data: players, error: pError }] = await Promise.all([
    supabase.from('rooms').select('id, pin, host_id, status, config, state, version').eq('id', roomId).maybeSingle<RoomRow>(),
    supabase.from('room_players').select('user_id, name, seat').eq('room_id', roomId).is('left_at', null).order('seat'),
  ]);
  if (error || pError) throw new RoomError('network');
  if (!room) return null;
  return {
    id: room.id,
    pin: room.pin,
    hostId: room.host_id,
    status: room.status,
    config: room.config,
    state: room.state,
    version: room.version,
    players: (players ?? []).map((p: { user_id: string; name: string; seat: number }) => ({ userId: p.user_id, name: p.name, seat: p.seat })),
  };
}

/**
 * Ouve a sala: busca o estado, assina o Realtime (sala + jogadores) e busca de novo a cada mudança,
 * ao reconectar e ao voltar pro app. Devolve a função pra parar.
 */
export function watchRoom(roomId: string, onRoom: (room: Room | null) => void, onError: (e: RoomError) => void): () => void {
  if (!supabase) {
    onError(new RoomError('offline_disabled'));
    return () => undefined;
  }
  const db = supabase;
  let alive = true;
  let lastVersion = -1;
  let pending: ReturnType<typeof setTimeout> | null = null;
  const refresh = () => {
    if (pending) return;
    pending = setTimeout(async () => {
      pending = null;
      try {
        const room = await fetchRoom(roomId);
        if (!alive) return;
        // ignora respostas fora de ordem (uma busca antiga chegando depois de uma nova)
        if (room && room.version < lastVersion && room.players.length > 0) return;
        if (room) lastVersion = room.version;
        onRoom(room);
      } catch (e) {
        if (alive) onError(e instanceof RoomError ? e : new RoomError('network'));
      }
    }, 60);
  };
  const channel = db
    .channel(`room:${roomId}:${Math.random().toString(36).slice(2)}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` }, refresh)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'room_players', filter: `room_id=eq.${roomId}` }, refresh)
    .subscribe((status) => status === 'SUBSCRIBED' && refresh());
  const sub = AppState.addEventListener('change', (s) => s === 'active' && refresh());
  refresh();
  return () => {
    alive = false;
    if (pending) clearTimeout(pending);
    sub.remove();
    void db.removeChannel(channel);
  };
}
