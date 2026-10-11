import { adminClient, requireUser } from '../_shared/clients.ts';
import { serveJson } from '../_shared/http.ts';
import { getRoom, leave, parseUuid } from '../_shared/rooms.ts';

/** Sai da sala (na partida, perde as vidas). */
Deno.serve(
  serveJson(async (req, body) => {
    const db = adminClient();
    const user = await requireUser(req, db);
    const room = await getRoom(db, parseUuid(body.roomId));
    await leave(db, room, user.id);
    return { ok: true };
  }),
);
