import { adminClient, requireUser } from '../_shared/clients.ts';
import { HttpError, serveJson } from '../_shared/http.ts';
import { gameAction, getRoom, parseAction, parseUuid, requireMember, startMatch } from '../_shared/rooms.ts';

/**
 * Toda jogada passa aqui. O servidor manda: confere se é membro, se é a vez dele, a versão da sala
 * (jogada velha é recusada) e o relógio (timer).
 */
Deno.serve(
  serveJson(async (req, body) => {
    const db = adminClient();
    const user = await requireUser(req, db);
    const roomId = parseUuid(body.roomId);
    const room = await getRoom(db, roomId);
    await requireMember(db, roomId, user.id);
    if (room.version !== body.expectedVersion) throw new HttpError(409, 'stale_version');
    const type = (body.action as { type?: string } | undefined)?.type;
    const version = type === 'START' || type === 'PLAY_AGAIN' ? await startMatch(db, room, user.id) : await gameAction(db, room, user.id, parseAction(body.action));
    return { ok: true, version };
  }),
);
