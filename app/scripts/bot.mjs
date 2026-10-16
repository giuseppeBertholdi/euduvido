// Bot(s) que entram numa sala com PIN e jogam sozinhos, pra testar ou gravar o online sem outra pessoa.
//   npm run bot -- 1234            (1 bot, "Robô")
//   npm run bot -- 1234 3          (3 bots: Robô, Robô 2, Robô 3)
// Crie a sala no app (precisa do pro), rode o comando com o PIN e comece a partida no app quando os bots aparecerem.
// Os bots dão lance, aumentam ou duvidam na vez deles e abrem a rodada quando são os primeiros. Quem passa pra
// próxima rodada é você, no app. Ctrl+C tira os bots da sala.
// Usa EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY do .env (o mesmo projeto do app).
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

const URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const [pin, countArg] = process.argv.slice(2);
const count = Math.min(Math.max(Number(countArg ?? 1) || 1, 1), 7);

if (!URL || !KEY) throw new Error('Faltam EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY (rode com: npm run bot -- <PIN>).');
if (!/^\d{4}$/.test(pin ?? '')) throw new Error('Passe o PIN de 4 números: npm run bot -- 1234');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (min, max) => min + Math.random() * (max - min);
const fmt = (n) => n.toLocaleString('pt-BR');
/** Arredonda pra 2 algarismos significativos, como uma pessoa chutaria (13.000, não 12.873). */
const round2 = (n) => {
  if (n < 100) return Math.round(n);
  const p = 10 ** (Math.floor(Math.log10(n)) - 1);
  return Math.round(n / p) * p;
};
const OPENINGS = [3, 5, 10, 12, 20, 30, 50, 100, 200, 500, 1000];

async function bot(name) {
  const db = createClient(URL, KEY, { auth: { persistSession: false }, realtime: { transport: ws } });
  const { data, error } = await db.auth.signInAnonymously();
  if (error) throw error;
  const me = data.user.id;
  const call = async (fn, body) => {
    const { data: res, error: err } = await db.functions.invoke(fn, { body });
    if (err) return { error: (await err.context?.json?.().catch(() => null))?.error ?? err.message };
    return res;
  };
  const joined = await call('join-room', { pin, name });
  if (joined.error) throw new Error(`${name} não entrou: ${joined.error}`);
  console.log(`🤖 ${name} entrou na sala ${pin}`);
  return { name, me, db, call, roomId: joined.roomId };
}

/** Decide a jogada do bot na vez dele. */
function decide(state) {
  const last = state.bids.at(-1);
  if (!last) return { type: 'BID', value: OPENINGS[Math.floor(Math.random() * OPENINGS.length)] };
  // quanto mais a rodada sobe, mais chance de duvidar
  if (Math.random() < 0.3 + 0.15 * state.bids.length) return { type: 'DOUBT' };
  return { type: 'BID', value: Math.max(last.value + 1, round2(last.value * rand(1.2, 1.9))) };
}

async function play(b) {
  let acted = '';
  for (;;) {
    const { data: room } = await b.db.from('rooms').select('status, state, version').eq('id', b.roomId).maybeSingle();
    if (!room || room.status === 'closed') return console.log(`🤖 ${b.name}: a sala fechou.`);
    const s = room.state;
    // uma jogada por versão da sala: espera o estado mudar antes de jogar de novo
    const key = `${room.version}`;
    if (room.status === 'playing' && s && acted !== key) {
      let action = null;
      if (s.phase === 'intro' && s.openerId === b.me) action = { type: 'START_TURN' };
      else if (s.phase === 'turn' && s.turnId === b.me) action = decide(s);
      if (action) {
        acted = key;
        await sleep(rand(1500, 3200)); // "pensando", pra parecer gente no vídeo
        const res = await b.call('room-action', { roomId: b.roomId, expectedVersion: room.version, action });
        if (res.error) {
          if (res.error !== 'stale_version') console.log(`🤖 ${b.name}: ${res.error}`);
        } else if (action.type === 'BID') console.log(`🤖 ${b.name}: lance de ${fmt(action.value)} ${s.question.unit}`);
        else if (action.type === 'DOUBT') console.log(`🤖 ${b.name}: EU DUVIDO!`);
      }
    }
    if (s?.phase === 'end' && acted !== `end${room.version}` && b === bots[0]) {
      acted = `end${room.version}`;
      const winner = s.players.find((p) => p.id === s.winnerId)?.name;
      console.log(`🏁 Fim de jogo${winner ? `: ${winner} ganhou` : ''}. Os bots continuam na sala pra revanche (Ctrl+C sai).`);
    }
    await sleep(800);
  }
}

const names = Array.from({ length: count }, (_, i) => (i === 0 ? 'Robô' : `Robô ${i + 1}`));
const bots = [];
for (const n of names) bots.push(await bot(n)); // um de cada vez, pra entrar na ordem
console.log('Comece a partida no app. Ctrl+C tira os bots da sala.');

let leaving = false;
process.on('SIGINT', async () => {
  if (leaving) process.exit(1);
  leaving = true;
  console.log('\nTirando os bots da sala…');
  await Promise.all(bots.map((b) => b.call('leave-room', { roomId: b.roomId })));
  process.exit(0);
});

await Promise.all(bots.map(play));
process.exit(0);
