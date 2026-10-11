import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyMagnitude, pressKey } from '../components/keypadRules';
import { createMatch, formatNumber, formatValue, minBid, publicState, reduce, standings, type Match, type Player } from './engine';
import { PACKS, type Question } from './questions';

const players: Player[] = [
  { id: 'a', name: 'Bia' },
  { id: 'b', name: 'Léo' },
  { id: 'c', name: 'Cacá' },
];
const q100: Question = { id: 'x', text: 'teste', answer: 100, unit: 'coisas' };
const fixed = (v: number) => () => v;

function started(lives = 3): Match {
  // rng 0 → abre o primeiro jogador (Bia)
  return reduce(createMatch({ players, pool: [q100], lives, rng: fixed(0) }), { type: 'START_TURN' });
}

test('lance precisa ser maior que o anterior', () => {
  let m = started();
  assert.equal(minBid(m), 1);
  m = reduce(m, { type: 'BID', value: 50 });
  assert.equal(m.turnId, 'b');
  assert.equal(minBid(m), 51);
  const same = reduce(m, { type: 'BID', value: 50 });
  assert.equal(same, m, 'lance igual é recusado');
  m = reduce(m, { type: 'BID', value: 51 });
  assert.equal(m.turnId, 'c');
});

test('não dá pra duvidar sem lance', () => {
  const m = started();
  assert.equal(reduce(m, { type: 'DOUBT' }), m);
});

test('duvidou de lance acima da resposta: quem deu o lance perde', () => {
  let m = started();
  m = reduce(m, { type: 'BID', value: 90 }); // Bia
  m = reduce(m, { type: 'BID', value: 120 }); // Léo blefa
  m = reduce(m, { type: 'DOUBT' }); // Cacá duvida
  assert.equal(m.result?.outcome, 'over');
  assert.equal(m.result?.loserId, 'b');
  assert.equal(m.lives.b, 2);
});

test('duvidou de lance certo: quem duvidou perde (igual à resposta conta como certo)', () => {
  let m = started();
  m = reduce(m, { type: 'BID', value: 100 });
  m = reduce(m, { type: 'DOUBT' });
  assert.equal(m.result?.outcome, 'ok');
  assert.equal(m.result?.loserId, 'b');
});

test('quem perde abre a próxima rodada; eliminado sai da roda; último vivo vence', () => {
  let m = started(1);
  m = reduce(m, { type: 'BID', value: 500 }); // Bia blefa
  m = reduce(m, { type: 'DOUBT' }); // Léo duvida → Bia sai
  assert.equal(m.result?.eliminated, true);
  m = reduce(m, { type: 'NEXT_ROUND' });
  assert.equal(m.phase, 'intro');
  assert.equal(m.openerId, 'b', 'Bia saiu, abre o próximo vivo');
  m = reduce(m, { type: 'START_TURN' });
  m = reduce(m, { type: 'BID', value: 10 }); // Léo
  assert.equal(m.turnId, 'c');
  m = reduce(m, { type: 'BID', value: 11 }); // Cacá
  assert.equal(m.turnId, 'b', 'pula a Bia eliminada');
  m = reduce(m, { type: 'DOUBT' }); // Léo duvida de 11 (resposta 100) → Léo sai
  assert.equal(m.winnerId, 'c');
  m = reduce(m, { type: 'NEXT_ROUND' });
  assert.equal(m.phase, 'end');
  assert.deepEqual(
    standings(m).map((p) => p.id),
    ['c', 'b', 'a'],
  );
});

test('perguntas reembaralham quando acabam', () => {
  let m = createMatch({ players, pool: PACKS[0].questions.slice(0, 2), lives: 5, rng: fixed(0) });
  const seen = new Set<string>();
  for (let r = 0; r < 4; r++) {
    seen.add(m.question.id);
    m = reduce(m, { type: 'START_TURN' });
    m = reduce(m, { type: 'BID', value: 1 });
    m = reduce(m, { type: 'DOUBT' });
    m = reduce(m, { type: 'NEXT_ROUND' });
  }
  assert.equal(seen.size, 2);
});

test('teclado: zero à esquerda, magnitude, limite', () => {
  assert.equal(pressKey('0', '5'), '5');
  assert.equal(pressKey('12', '⌫'), '1');
  assert.equal(pressKey('12', 'C'), '');
  assert.equal(applyMagnitude('', 3), '1000');
  assert.equal(applyMagnitude('25', 6), '25000000');
  assert.equal(pressKey('1234567890123', '4'), '1234567890123');
});

test('formato pt-BR', () => {
  assert.equal(formatNumber(1200), '1.200');
  assert.equal(formatValue(1960, 'ano'), '1960');
});

test('todas as perguntas têm resposta inteira positiva e ids únicos', () => {
  const ids = PACKS.flatMap((p) => p.questions.map((x) => x.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const p of PACKS) for (const x of p.questions) assert.ok(Number.isInteger(x.answer) && x.answer > 0, x.id);
});

test('timer: estourou a vez, perde uma vida; antes do prazo é recusado', () => {
  let m = reduce(createMatch({ players, pool: [q100], lives: 3, turnSeconds: 30, rng: fixed(0) }), { type: 'START_TURN' }, { now: 1000 });
  assert.equal(m.deadline, 31_000);
  m = reduce(m, { type: 'BID', value: 10 }, { now: 5000 });
  assert.equal(m.deadline, 35_000, 'cada lance reinicia o relógio');
  assert.equal(reduce(m, { type: 'TIMEOUT' }, { now: 34_999 }), m);
  m = reduce(m, { type: 'TIMEOUT' }, { now: 35_000 });
  assert.equal(m.result?.outcome, 'timeout');
  assert.equal(m.result?.loserId, 'b');
  assert.equal(m.lives.b, 2);
});

test('sem timer não existe timeout', () => {
  const m = started();
  assert.equal(m.deadline, null);
  assert.equal(reduce(m, { type: 'TIMEOUT' }, { now: 9e12 }), m);
});

test('quem sai perde as vidas e passa a vez; sobrando um, acaba', () => {
  let m = started();
  m = reduce(m, { type: 'REMOVE_PLAYER', playerId: 'a' }); // Bia (da vez) sai
  assert.equal(m.lives.a, 0);
  assert.equal(m.turnId, 'b');
  m = reduce(m, { type: 'REMOVE_PLAYER', playerId: 'c' });
  assert.equal(m.phase, 'end');
  assert.equal(m.winnerId, 'b');
});

test('estado público nunca tem a resposta antes da revelação', () => {
  let m = started();
  m = reduce(m, { type: 'BID', value: 10 });
  for (const s of [publicState(m), publicState(reduce(createMatch({ players, pool: [q100], rng: fixed(0) }), { type: 'START_TURN' }))]) {
    const json = JSON.stringify(s);
    assert.equal('answer' in s.question, false);
    assert.equal(json.includes('"deck"'), false);
    assert.equal(json.includes('100'), false, 'nem o número da resposta aparece');
  }
  m = reduce(m, { type: 'DOUBT' });
  assert.equal(publicState(m).question.answer, 100);
  assert.equal(publicState(m).result?.answer, 100);
});

test('pular repetidas: tira as já jogadas; se sobrar pouco, volta a usar tudo', async () => {
  const { freshPool, MIN_FRESH } = await import('./played');
  const pool = PACKS[0].questions;
  const played = pool.slice(0, 10).map((q) => q.id);
  const r = freshPool(pool, played, true);
  assert.equal(r.pool.length, pool.length - 10);
  assert.ok(r.pool.every((q) => !played.includes(q.id)));
  assert.equal(freshPool(pool, played, false).pool.length, pool.length);
  const almostAll = pool.slice(0, pool.length - (MIN_FRESH - 1)).map((q) => q.id);
  const back = freshPool(pool, almostAll, true);
  assert.equal(back.recycled, true);
  assert.equal(back.pool.length, pool.length);
});

test('lance exato: quem cravou recupera um "!" (até o máximo); quem duvidou perde', () => {
  // Bia perde uma vida antes, depois crava 100
  let m = started(3);
  m = reduce(m, { type: 'BID', value: 500 }); // Bia blefa
  m = reduce(m, { type: 'DOUBT' }); // Léo duvida → Bia 2
  assert.equal(m.lives.a, 2);
  m = reduce(m, { type: 'NEXT_ROUND' }); // Bia abre
  m = reduce(m, { type: 'START_TURN' });
  m = reduce(m, { type: 'BID', value: 100 }); // Bia crava a resposta
  m = reduce(m, { type: 'DOUBT' }); // Léo duvida à toa
  assert.equal(m.result?.exact, true);
  assert.equal(m.result?.bonusId, 'a');
  assert.equal(m.lives.a, 3, 'Bia volta a ter 3');
  assert.equal(m.lives.b, 2, 'Léo perde um');
});

test('lance exato com vidas cheias: é na mosca, mas sem passar do máximo', () => {
  let m = started(3);
  m = reduce(m, { type: 'BID', value: 100 });
  m = reduce(m, { type: 'DOUBT' });
  assert.equal(m.result?.exact, true);
  assert.equal(m.result?.bonusId, null);
  assert.equal(m.lives.a, 3);
});

test('lance abaixo da resposta não é exato', () => {
  let m = started(3);
  m = reduce(m, { type: 'BID', value: 99 });
  m = reduce(m, { type: 'DOUBT' });
  assert.equal(m.result?.outcome, 'ok');
  assert.equal(m.result?.exact, false);
});
