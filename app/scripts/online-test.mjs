// Teste de integração do online contra um Supabase (local por padrão).
//   supabase start && supabase functions serve   (em outro terminal)
//   npm run test:online
// Usa SUPABASE_URL / SUPABASE_ANON_KEY do ambiente, ou o padrão do `supabase start` deste projeto.
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

const URL = process.env.SUPABASE_URL ?? 'http://127.0.0.1:55321';
const KEY =
  process.env.SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

async function player(name) {
  const db = createClient(URL, KEY, { auth: { persistSession: false }, realtime: { transport: ws } });
  const { data, error } = await db.auth.signInAnonymously();
  if (error) throw error;
  const call = async (fn, body) => {
    const { data: res, error: err } = await db.functions.invoke(fn, { body });
    if (err) {
      const payload = await err.context?.json?.().catch(() => null);
      return { error: payload?.error ?? err.message, status: err.context?.status };
    }
    return res;
  };
  return { name, db, id: data.user.id, call };
}

const room = async (p, id) => (await p.db.from('rooms').select('*').eq('id', id).single()).data;
const act = (p, roomId, version, action) => p.call('room-action', { roomId, expectedVersion: version, action });
let passed = 0;
const step = (msg) => console.log(`  ✓ ${msg}`, ++passed);

const [a, b, c, out] = await Promise.all(['Bia', 'Léo', 'Cacá', 'Intrusa'].map(player));

// ── criar e entrar ──
const created = await a.call('create-room', { name: 'Bia', lives: 2, turnSeconds: null, packs: ['classico'] });
assert.ok(created.roomId && /^\d{4}$/.test(created.pin), JSON.stringify(created));
assert.ok(typeof created.serverNow === 'number');
step(`sala criada, PIN ${created.pin}`);
const roomId = created.roomId;

assert.equal((await b.call('join-room', { pin: '0000', name: 'Léo' })).error, 'room_not_found');
assert.equal((await b.call('join-room', { pin: 'abc', name: 'Léo' })).error, 'bad_pin');
assert.equal((await b.call('join-room', { pin: created.pin, name: 'bia' })).error, 'name_taken');
assert.equal((await a.call('create-room', { name: 'Bia', lives: 4, packs: ['classico'] })).error, 'bad_lives');
assert.equal((await a.call('create-room', { name: 'Bia', lives: 2, packs: ['nao-existe'] })).error, 'bad_packs');
step('erros de PIN, nome repetido e config inválida');

assert.equal((await b.call('join-room', { pin: created.pin, name: 'Léo' })).roomId, roomId);
assert.equal((await c.call('join-room', { pin: created.pin, name: 'Cacá' })).roomId, roomId);
const { data: seats } = await b.db.from('room_players').select('name, seat').eq('room_id', roomId).is('left_at', null).order('seat');
assert.deepEqual(seats.map((s) => s.name), ['Bia', 'Léo', 'Cacá']);
step('Léo e Cacá entraram; os membros veem a roda');

// ── RLS ──
assert.equal((await out.db.from('rooms').select('id').eq('id', roomId)).data.length, 0);
assert.equal((await out.db.from('room_players').select('name').eq('room_id', roomId)).data.length, 0);
const secret = await b.db.from('room_secrets').select('*').eq('room_id', roomId);
assert.ok(secret.error || secret.data.length === 0, 'segredo nunca legível pelo app');
const hack = await b.db.from('rooms').update({ status: 'finished' }).eq('id', roomId).select();
assert.ok(hack.error || hack.data.length === 0, 'app não grava direto');
assert.equal((await act(out, roomId, 0, { type: 'START' })).error, 'not_member');
step('RLS: intrusa não lê; ninguém lê o segredo nem grava direto');

// ── realtime ──
const heard = [];
const channel = c.db
  .channel(`room-${roomId}`)
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` }, (p) => heard.push(p.new.version))
  .subscribe();
await new Promise((r) => setTimeout(r, 1500));

// ── começar ──
assert.equal((await act(b, roomId, 0, { type: 'START' })).error, 'host_only');
const started = await act(a, roomId, 0, { type: 'START' });
assert.equal(started.version, 1, JSON.stringify(started));
let r = await room(b, roomId);
assert.equal(r.status, 'playing');
assert.equal(r.state.phase, 'intro');
assert.equal('answer' in r.state.question, false, 'pergunta sem resposta');
assert.equal('deck' in r.state, false, 'sem baralho');
step('host começou; estado público sem resposta nem baralho');

const byId = { [a.id]: a, [b.id]: b, [c.id]: c };
const ps = [a, b, c];
const notOpener = ps.find((p) => p.id !== r.state.openerId && p.id !== a.id);
assert.equal((await act(notOpener, roomId, r.version, { type: 'START_TURN' })).error, 'not_your_turn');
assert.equal((await act(a, roomId, r.version, { type: 'START_TURN' })).version, 2); // host pode abrir a vez
r = await room(a, roomId);
assert.equal(r.state.phase, 'turn');

// fora da vez
const other = ps.find((p) => p.id !== r.state.turnId);
assert.equal((await act(other, roomId, r.version, { type: 'BID', value: 5 })).error, 'not_your_turn');
// versão velha
assert.equal((await act(byId[r.state.turnId], roomId, r.version - 1, { type: 'BID', value: 5 })).error, 'stale_version');
// duvidar sem lance
assert.equal((await act(byId[r.state.turnId], roomId, r.version, { type: 'DOUBT' })).error, 'rejected');
// timer desligado: timeout recusado
assert.equal((await act(other, roomId, r.version, { type: 'TIMEOUT' })).error, 'rejected');
step('só joga quem é da vez; versão velha e jogada inválida recusadas');

// lances
await act(byId[r.state.turnId], roomId, r.version, { type: 'BID', value: 1 });
r = await room(a, roomId);
assert.equal((await act(byId[r.state.turnId], roomId, r.version, { type: 'BID', value: 1 })).error, 'rejected', 'lance tem que subir');
await act(byId[r.state.turnId], roomId, r.version, { type: 'BID', value: 99_999_999 });
r = await room(a, roomId);
const doubter = r.state.turnId;
await act(byId[doubter], roomId, r.version, { type: 'DOUBT' });
r = await room(a, roomId);
assert.equal(r.state.phase, 'result');
assert.equal(r.state.result.outcome, 'over');
assert.ok(typeof r.state.question.answer === 'number', 'resposta revelada depois da dúvida');
assert.equal(r.state.lives[r.state.result.loserId], 1);
step(`lances, dúvida e revelação (resposta ${r.state.question.answer})`);

await new Promise((res) => setTimeout(res, 800));
assert.ok(heard.length >= 4, `realtime ouviu ${heard.length} mudanças`);
step(`realtime: Cacá ouviu ${heard.length} atualizações da sala`);

// saída no meio da partida
await act(c, roomId, r.version, { type: 'NEXT_ROUND' });
await c.call('leave-room', { roomId });
r = await room(a, roomId);
assert.equal(r.state.lives[c.id], 0);
assert.ok(r.state.out.includes(c.id));
step('Cacá saiu: perdeu os “!” e saiu da roda');

// joga até acabar
for (let guard = 0; r.status === 'playing' && guard < 20; guard++) {
  const s = r.state;
  if (s.phase === 'intro') await act(a, roomId, r.version, { type: 'START_TURN' });
  else if (s.phase === 'turn' && s.bids.length === 0) await act(byId[s.turnId], roomId, r.version, { type: 'BID', value: 99_999_999 });
  else if (s.phase === 'turn') await act(byId[s.turnId], roomId, r.version, { type: 'DOUBT' });
  else await act(a, roomId, r.version, { type: 'NEXT_ROUND' });
  r = await room(a, roomId);
}
assert.equal(r.status, 'finished');
assert.equal(r.state.phase, 'end');
assert.ok(r.state.winnerId);
step(`partida acabou; venceu ${r.state.players.find((p) => p.id === r.state.winnerId).name}`);

const again = await act(a, roomId, r.version, { type: 'PLAY_AGAIN' });
r = await room(a, roomId);
assert.equal(r.status, 'playing');
assert.equal(r.state.players.length, 2, 'revanche só com quem ficou');
step(`revanche (versão ${again.version})`);

// ── timer ──
const t = await a.call('create-room', { name: 'Bia', lives: 2, turnSeconds: 15, packs: ['classico'] });
await b.call('join-room', { pin: t.pin, name: 'Léo' });
await act(a, t.roomId, 0, { type: 'START' });
await act(a, t.roomId, 1, { type: 'START_TURN' });
let tr = await room(a, t.roomId);
assert.ok(tr.state.deadline > Date.now() + 10_000, 'prazo de ~15 s no relógio do servidor');
assert.equal((await act(b, t.roomId, tr.version, { type: 'TIMEOUT' })).error, 'rejected');
step('timer: prazo definido pelo servidor; timeout antes da hora recusado');
await new Promise((res) => setTimeout(res, tr.state.deadline - Date.now() + 600));
const lateBy = tr.state.turnId;
assert.ok((await act(a, t.roomId, tr.version, { type: 'TIMEOUT' })).version, 'timeout aceito depois do prazo');
tr = await room(a, t.roomId);
assert.equal(tr.state.result.outcome, 'timeout');
assert.equal(tr.state.result.loserId, lateBy);
step('timer: depois do prazo, quem estava na vez perde um “!”');

// ── pular repetidas ──
const { PACKS } = await import('../src/game/questions.ts');
const classicIds = PACKS.find((p) => p.id === 'classico').questions.map((q) => q.id);
{
  const keep = classicIds.slice(-10);
  const skip = classicIds.slice(0, -10);
  const s1 = await a.call('create-room', { name: 'Bia', lives: 2, turnSeconds: null, packs: ['classico'], skip });
  await b.call('join-room', { pin: s1.pin, name: 'Léo' });
  await act(a, s1.roomId, 0, { type: 'START' });
  const sr = await room(a, s1.roomId);
  assert.ok(keep.includes(sr.state.question.id), 'a pergunta sorteada é uma das não jogadas');
  assert.equal((await a.call('create-room', { name: 'Bia', lives: 2, packs: ['classico'], skip: 'x' })).error, 'bad_skip');
  step('pular repetidas: o servidor sorteia só entre as que não saíram');
}

await c.db.removeChannel(channel);
console.log(`\nonline ok: ${passed} verificações`);
process.exit(0);
