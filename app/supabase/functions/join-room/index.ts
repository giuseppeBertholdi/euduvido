import { adminClient, requireUser } from '../_shared/clients.ts';
import { HttpError, serveJson } from '../_shared/http.ts';
import { activePlayers, freeSeat, parseName } from '../_shared/rooms.ts';

/** Entra numa sala pelo PIN (só antes de começar). Voltar pra mesma sala é permitido. */
Deno.serve(
  serveJson(async (req, body) => {
    const db = adminClient();
    const user = await requireUser(req, db);
    const name = parseName(body.name);
    const pin = typeof body.pin === 'string' && /^[0-9]{4}$/.test(body.pin) ? body.pin : null;
    if (!pin) throw new HttpError(400, 'bad_pin');

    const { data: room, error } = await db
      .from('rooms')
      .select('id, status, expires_at')
      .eq('pin', pin)
      .neq('status', 'closed')
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();
    if (error) throw error;
    if (!room) throw new HttpError(404, 'room_not_found');

    const players = await activePlayers(db, room.id);
    if (players.some((p) => p.user_id === user.id)) return { roomId: room.id };
    if (room.status !== 'lobby') throw new HttpError(409, 'already_started');
    if (players.some((p) => p.name.toLowerCase() === name.toLowerCase())) throw new HttpError(409, 'name_taken');
    const seat = freeSeat(players);

    const { error: insertError } = await db
      .from('room_players')
      .upsert({ room_id: room.id, user_id: user.id, name, seat, joined_at: new Date().toISOString(), left_at: null });
    if (insertError) {
      if (insertError.code === '23505') throw new HttpError(409, 'name_taken');
      throw insertError;
    }
    return { roomId: room.id };
  }),
);
