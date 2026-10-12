import assert from 'node:assert/strict';
import { test } from 'node:test';
import { HIGHLIGHTS, showcase, STARTER, starterFirst, TEASERS, questionById } from './highlights';
import { PACKS } from './questions';

test('todo pacote pro tem 3 destaques, e eles existem no próprio pacote', () => {
  for (const p of PACKS.filter((x) => x.premium)) {
    const ids = HIGHLIGHTS[p.id];
    assert.equal(ids?.length, 3, p.id);
    for (const id of ids) assert.ok(p.questions.some((q) => q.id === id), `${p.id}: ${id}`);
  }
});

test('a vitrine põe os destaques primeiro sem perder nem repetir pergunta', () => {
  for (const p of PACKS) {
    const s = showcase(p);
    assert.equal(s.length, p.questions.length);
    assert.equal(new Set(s.map((q) => q.id)).size, s.length);
    (HIGHLIGHTS[p.id] ?? []).forEach((id, i) => assert.equal(s[i].id, id));
  }
});

test('teasers do paywall existem e vêm de pacotes pro', () => {
  for (const id of TEASERS) {
    assert.ok(questionById(id), id);
    assert.ok(PACKS.some((p) => p.premium && p.questions.some((q) => q.id === id)), id);
  }
});

test('a primeira partida começa pelas melhores do clássico, sem repetir as já jogadas', () => {
  const classico = PACKS.find((p) => p.id === 'classico')!;
  for (const id of STARTER) assert.ok(classico.questions.some((q) => q.id === id), id);
  const deck = [...classico.questions].reverse();
  const fresh = starterFirst(deck, []);
  assert.equal(fresh.length, deck.length);
  assert.deepEqual(new Set(fresh.slice(0, STARTER.length).map((q) => q.id)), new Set(STARTER));
  const played = STARTER.slice(0, 5);
  const later = starterFirst(deck, played);
  assert.deepEqual(new Set(later.slice(0, STARTER.length - 5).map((q) => q.id)), new Set(STARTER.slice(5)));
  assert.deepEqual(starterFirst(deck, STARTER), deck);
});
