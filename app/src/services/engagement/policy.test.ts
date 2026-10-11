import assert from 'node:assert/strict';
import { test } from 'node:test';
import { planReminders, REMINDER_DAYS, REMINDER_HOUR, shouldAskReview } from './policy';

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

const ok = { matchesFinished: 3, firstOpenAt: base - 2 * DAY, reviewAsks: [] as number[] };

test('avaliação: só com partida boa, 3+ partidas e depois do primeiro dia', () => {
  assert.equal(shouldAskReview(ok, base, true), true);
  assert.equal(shouldAskReview(ok, base, false), false, 'não pede depois de momento ruim');
  assert.equal(shouldAskReview({ ...ok, matchesFinished: 2 }, base, true), false);
  assert.equal(shouldAskReview({ ...ok, firstOpenAt: base - 3600_000 }, base, true), false, 'nunca no primeiro dia');
  assert.equal(shouldAskReview({ ...ok, firstOpenAt: null }, base, true), false);
});

test('avaliação: no máximo a cada 60 dias e 3 vezes por ano', () => {
  assert.equal(shouldAskReview({ ...ok, reviewAsks: [base - 30 * DAY] }, base, true), false);
  assert.equal(shouldAskReview({ ...ok, reviewAsks: [base - 61 * DAY] }, base, true), true);
  assert.equal(shouldAskReview({ ...ok, reviewAsks: [base - 300 * DAY, base - 200 * DAY, base - 100 * DAY] }, base, true), false);
});
