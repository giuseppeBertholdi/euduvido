/** Toda frase passada a `t()`/`plural()` no app precisa estar em `en.ts`, e as variáveis `{x}` têm que bater. */
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { EN } from './en';

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return files(p);
    return /\.tsx?$/.test(f) && !f.endsWith('.test.ts') && !p.includes('/i18n/') ? [p] : [];
  });
}

// literal de string simples ('…' ou "…") como primeiro argumento (e o 2º e 3º do plural)
const STR = String.raw`'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"`;
const CALL = new RegExp(String.raw`\bt\(\s*(?:${STR})`, 'g');
const PLURAL = new RegExp(String.raw`\bplural\([^,]+,\s*(?:${STR})\s*,\s*(?:${STR})`, 'g');

const unescape = (s: string) => s.replace(/\\n/g, '\n').replace(/\\(['"\\])/g, '$1');
const vars = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

function used(): Map<string, string> {
  const out = new Map<string, string>();
  for (const f of files(join(__dirname, '..'))) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(CALL)) out.set(unescape(m[1] ?? m[2]), f);
    for (const m of src.matchAll(PLURAL)) {
      out.set(unescape(m[1] ?? m[2]), f);
      out.set(unescape(m[3] ?? m[4]), f);
    }
  }
  return out;
}

test('toda frase do app tem tradução em inglês', () => {
  const missing = [...used()].filter(([k]) => !(k in EN)).map(([k, f]) => `${f}: ${JSON.stringify(k)}`);
  assert.deepEqual(missing, []);
});

test('as traduções usam as mesmas variáveis', () => {
  const wrong = Object.entries(EN).filter(([pt, en]) => vars(pt) !== vars(en)).map(([pt]) => pt);
  assert.deepEqual(wrong, []);
});
