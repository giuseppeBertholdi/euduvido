import assert from 'node:assert/strict';
import { test } from 'node:test';
import { planReminders, REMINDER_DAYS, REMINDER_HOUR, shouldAskReview, shouldShowReviewCard } from './policy';

const DAY = 24 * 60 * 60 * 1000;
const base = new Date(2026, 9, 11, 15, 0).getTime(); // 11/10/2026 15h (hora local)

test('lembretes: 3 por ausência, à noite, nos dias certos', () => {
  const r = planReminders(base);
  assert.equal(r.length, REMINDER_DAYS.length);
  r.forEach((x, i) => {
    const d = new Date(x.at);
    assert.equal(d.getHours(), REMINDER_HOUR);
    assert.equal(Math.round((new Date(d).setHours(0, 0, 0, 0) - new Date(base).setHours(0, 0, 0, 0)) / DAY), REMINDER_DAYS[i]);
  });
  assert.notEqual(r[0].title, r[1].title, 'textos variam');
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
