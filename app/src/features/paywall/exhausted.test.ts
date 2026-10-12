import assert from 'node:assert/strict';
import { test } from 'node:test';
import { EXHAUSTED_EVERY_MS, freeExhausted, shouldOfferExhausted } from './exhausted';

const q = (n: number) => Array.from({ length: n }, (_, i) => ({ id: `q${i}`, text: '', answer: 1, unit: '' }));
const ids = (n: number) => Array.from({ length: n }, (_, i) => `q${i}`);

test('freeExhausted: esgota quando sobram menos de 8 novas', () => {
  assert.equal(freeExhausted(q(61), ids(50)), false);
  assert.equal(freeExhausted(q(61), ids(53)), false); // sobram 8
  assert.equal(freeExhausted(q(61), ids(54)), true); // sobram 7
  assert.equal(freeExhausted(q(61), ids(61)), true);
});

test('shouldOfferExhausted: só pra quem não é pro, só quando esgotou, no máximo 1 vez a cada 20 h', () => {
  const now = 10 * EXHAUSTED_EVERY_MS;
  assert.equal(shouldOfferExhausted({ premium: true, exhausted: true, lastOfferAt: null }, now), false);
  assert.equal(shouldOfferExhausted({ premium: false, exhausted: false, lastOfferAt: null }, now), false);
  assert.equal(shouldOfferExhausted({ premium: false, exhausted: true, lastOfferAt: null }, now), true);
  assert.equal(shouldOfferExhausted({ premium: false, exhausted: true, lastOfferAt: now - 1000 }, now), false);
  assert.equal(shouldOfferExhausted({ premium: false, exhausted: true, lastOfferAt: now - EXHAUSTED_EVERY_MS }, now), true);
});
