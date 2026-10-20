import { adminClient, requireUser } from '../_shared/clients.ts';
import { hasPro } from '../_shared/entitlement.ts';
import { HttpError, serveJson } from '../_shared/http.ts';
import { PACKS } from '../_shared/game/questions.ts';
import { parseConfig, parseName } from '../_shared/rooms.ts';

const MAX_OPEN_ROOMS_PER_USER = 3;

/** Cria uma sala com PIN de 4 dígitos; quem cria é o host (assento 0). */
Deno.serve(
  serveJson(async (req, body) => {
    const db = adminClient();
    const user = await requireUser(req, db);
    const name = parseName(body.name);
    const config = parseConfig(body);
    // qualquer um cria sala (é o que traz gente nova); sem pro, a sala só usa os pacotes grátis
    if (!(await hasPro(user.id))) {
      const free = config.packs.filter((id) => !PACKS.find((p) => p.id === id)?.premium);
      config.packs = free.length ? free : PACKS.filter((p) => !p.premium).map((p) => p.id);
    }

    // limpeza barata: salas vencidas liberam o PIN
    await db.from('rooms').update({ status: 'closed' }).lt('expires_at', new Date().toISOString()).neq('status', 'closed');
    // e some de vez 1 dia depois de vencer (jogadores, nomes e estado vão junto, em cascata): é o que a Privacidade promete
    await db.from('rooms').delete().lt('expires_at', new Date(Date.now() - 24 * 3600 * 1000).toISOString());
    // fecha salas antigas deste host e limita abusos
    const { count } = await db.from('rooms').select('id', { count: 'exact', head: true }).eq('host_id', user.id).neq('status', 'closed');
    if ((count ?? 0) >= MAX_OPEN_ROOMS_PER_USER) {
      await db.from('rooms').update({ status: 'closed' }).eq('host_id', user.id).neq('status', 'closed');
    }

    for (let attempt = 0; attempt < 12; attempt++) {
      const pin = String(1000 + Math.floor(Math.random() * 9000));
      const { data, error } = await db.from('rooms').insert({ pin, host_id: user.id, created_by: user.id, config }).select('id, pin').single();
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
