import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bidText, DAILY_SIZE, dailyNumber, dailyRounds, dailyShareText, dailyStreak } from './daily';

test('desafio: #1 no dia de lançamento, conta pelo dia local (não pela hora)', () => {
  assert.equal(dailyNumber(new Date(2026, 9, 20, 0, 5)), 1);
  assert.equal(dailyNumber(new Date(2026, 9, 20, 23, 55)), 1);
  assert.equal(dailyNumber(new Date(2026, 9, 21, 8)), 2);
  assert.equal(dailyNumber(new Date(2026, 11, 31, 12)), 73);
});

test('desafio: as mesmas 5 pra todo mundo, outras no dia seguinte, sem picante nem resposta pequena', () => {
  for (let n = 1; n <= 120; n++) {
    const a = dailyRounds(n);
    assert.equal(a.length, DAILY_SIZE);
    assert.deepEqual(
      a.map((r) => r.question.id),
      dailyRounds(n).map((r) => r.question.id),
    );
    assert.equal(new Set(a.map((r) => r.question.id)).size, DAILY_SIZE, 'sem repetir no mesmo dia');
    assert.equal(a.filter((r) => r.question.unit === 'ano').length, 1, 'um ano por dia');
    assert.notEqual(a[0].question.unit, 'ano', 'a primeira (a da notificação) não é de ano');
    for (const r of a) {
      assert.notEqual(r.packId, 'picante');
      assert.ok(r.question.answer >= 10);
    }
  }
  assert.notDeepEqual(
    dailyRounds(1).map((r) => r.question.id),
    dailyRounds(2).map((r) => r.question.id),
  );
});

test('desafio: o lance nunca é a resposta, e o certo bate com a regra do jogo (lance = "isso ou mais")', () => {
  let doubts = 0;
  let total = 0;
  for (let n = 1; n <= 200; n++) {
    for (const r of dailyRounds(n)) {
      assert.notEqual(r.bid, r.question.answer);
      assert.ok(r.bid > 0);
      assert.equal(r.correct, r.question.answer >= r.bid ? 'believe' : 'doubt');
      total++;
      if (r.correct === 'doubt') doubts++;
    }
  }
  // nem sempre a mesma resposta: entre 35% e 65% dos lances são pra duvidar
  assert.ok(doubts / total > 0.35 && doubts / total < 0.65, `duvidar: ${doubts}/${total}`);
});

test('desafio: texto do lance', () => {
  assert.equal(bidText({ bid: 15000, question: { id: 'x', text: '', answer: 15415, unit: 'litros' } }), '15.000 litros ou mais');
  assert.equal(bidText({ bid: 1980, question: { id: 'y', text: '', answer: 1977, unit: 'ano' } }), 'em 1980 ou depois');
});

test('desafio: sequência conta de hoje ou de ontem, e quebra num dia sem jogar', () => {
  assert.equal(dailyStreak([], 10), 0);
  assert.equal(dailyStreak([8, 9, 10], 10), 3);
  assert.equal(dailyStreak([8, 9], 10), 2, 'hoje ainda dá tempo');
  assert.equal(dailyStreak([7, 9, 10], 10), 2);
  assert.equal(dailyStreak([7, 8], 10), 0, 'ontem passou em branco');
});

test('desafio: compartilhar mostra a grade, não as respostas', () => {
  const t = dailyShareText(12, [true, true, false, true, true], 4, 'https://x');
  assert.equal(t, 'Eu Duvido! #12 · 4/5 · 🔥 4 dias\n🟨🟨🟥🟨🟨\nduvido você fazer melhor: https://x');
  assert.ok(!dailyShareText(1, [true], 1, 'u').includes('🔥'), 'sem fogo com 1 dia');
});
