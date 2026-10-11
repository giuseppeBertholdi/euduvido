import { adminClient, requireUser } from '../_shared/clients.ts';
import { hasPro } from '../_shared/entitlement.ts';
import { HttpError, serveJson } from '../_shared/http.ts';
import { parseConfig, parseName } from '../_shared/rooms.ts';

const MAX_OPEN_ROOMS_PER_USER = 3;

/** Cria uma sala com PIN de 4 dígitos; quem cria é o host (assento 0). */
Deno.serve(
  serveJson(async (req, body) => {
    const db = adminClient();
    const user = await requireUser(req, db);
    const name = parseName(body.name);
    const config = parseConfig(body);
    // criar sala é do pro (quem entra com PIN não precisa assinar)
    if (!(await hasPro(user.id))) throw new HttpError(403, 'pro_required');

    // limpeza barata: salas vencidas liberam o PIN
    await db.from('rooms').update({ status: 'closed' }).lt('expires_at', new Date().toISOString()).neq('status', 'closed');
    // fecha salas antigas deste host e limita abusos
    const { count } = await db.from('rooms').select('id', { count: 'exact', head: true }).eq('host_id', user.id).neq('status', 'closed');
    if ((count ?? 0) >= MAX_OPEN_ROOMS_PER_USER) {
      await db.from('rooms').update({ status: 'closed' }).eq('host_id', user.id).neq('status', 'closed');
    }

    for (let attempt = 0; attempt < 12; attempt++) {
      const pin = String(1000 + Math.floor(Math.random() * 9000));
      const { data, error } = await db.from('rooms').insert({ pin, host_id: user.id, config }).select('id, pin').single();
      if (error) {
        if (error.code === '23505') continue; // PIN em uso, sorteia outro
        throw error;
      }
      const { error: playerError } = await db.from('room_players').insert({ room_id: data.id, user_id: user.id, name, seat: 0 });
      if (playerError) throw playerError;
      return { roomId: data.id, pin: data.pin };
    }
    throw new HttpError(503, 'no_pin_available');
  }),
);
