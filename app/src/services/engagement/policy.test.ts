import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DAILY_DAYS, DAILY_HOUR, planReminders, REMINDER_DAYS, REMINDER_HOUR, shouldAskReview, shouldShowReviewCard } from './policy';

const DAY = 24 * 60 * 60 * 1000;
const base = new Date(2026, 9, 21, 9, 0).getTime(); // 21/10/2026 9h (hora local), antes do aviso do meio-dia
const dayOf = (t: number) => Math.round((new Date(t).setHours(0, 0, 0, 0) - new Date(base).setHours(0, 0, 0, 0)) / DAY);

test('lembretes: desafio ao meio-dia por uma semana (com a pergunta do dia), depois só a resenha à noite', () => {
  const r = planReminders(base);
  const daily = r.filter((x) => x.url === '/daily');
  assert.equal(daily.length, DAILY_DAYS, 'hoje (ainda antes do meio-dia) e os 6 seguintes');
  daily.forEach((x, i) => {
    assert.equal(new Date(x.at).getHours(), DAILY_HOUR);
    assert.equal(dayOf(x.at), i);
    assert.equal(x.title, `desafio do dia #${2 + i}`);
    assert.match(x.body, /Duvida\?$/);
  });
  assert.notEqual(daily[0].body, daily[1].body, 'cada dia, uma pergunta');
  const party = r.filter((x) => !x.url);
  assert.deepEqual(party.map((x) => dayOf(x.at)), [...REMINDER_DAYS]);
  party.forEach((x) => assert.equal(new Date(x.at).getHours(), REMINDER_HOUR));
});

test('lembretes: quem já fez o de hoje, ou abriu depois do meio-dia, só recebe a partir de amanhã', () => {
  assert.equal(dayOf(planReminders(base, true)[0].at), 1);
  assert.equal(dayOf(planReminders(base + 5 * 3600 * 1000)[0].at), 1);
});

const ok = { matchesFinished: 1, reviewAsks: [] as number[] };

test('avaliação: já no fim da primeira partida boa', () => {
  assert.equal(shouldAskReview(ok, base, true), true);
  assert.equal(shouldAskReview(ok, base, false), false, 'não pede depois de momento ruim');
  assert.equal(shouldAskReview({ ...ok, matchesFinished: 0 }, base, true), false);
});

test('cartão de avaliar no fim: da segunda partida em diante, sem disputar com o dos lembretes, até a pessoa responder', () => {
  const s = { matchesFinished: 2, remindersAsked: true, reviewCardDone: false };
  assert.equal(shouldShowReviewCard(s), true);
  assert.equal(shouldShowReviewCard({ ...s, matchesFinished: 1 }), false, 'na primeira já sai o pedido nativo');
  assert.equal(shouldShowReviewCard({ ...s, remindersAsked: false }), false);
  assert.equal(shouldShowReviewCard({ ...s, reviewCardDone: true }), false);
});

test('avaliação: no máximo a cada 60 dias e 3 vezes por ano', () => {
  assert.equal(shouldAskReview({ ...ok, reviewAsks: [base - 30 * DAY] }, base, true), false);
  assert.equal(shouldAskReview({ ...ok, reviewAsks: [base - 61 * DAY] }, base, true), true);
  assert.equal(shouldAskReview({ ...ok, reviewAsks: [base - 300 * DAY, base - 200 * DAY, base - 100 * DAY] }, base, true), false);
});
