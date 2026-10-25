// Copia o motor e as perguntas do app pras Edge Functions (o Deno exige a extensão .ts nos imports).
// `node scripts/sync-engine.mjs` grava; `--check` só confere (falha se estiver desatualizado).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
const files = ['engine.ts', 'questions.ts', 'questions.en.ts', 'packs.ts', 'played.ts'];
const outDir = 'supabase/functions/_shared/game';
const check = process.argv.includes('--check');
let stale = false;
mkdirSync(outDir, { recursive: true });
for (const f of files) {
  const src = readFileSync(`src/game/${f}`, 'utf8').replace(/from '\.\/([\w.]+)'/g, "from './$1.ts'");
  const out = `// GERADO por scripts/sync-engine.mjs a partir de src/game/${f}. Não edite aqui.\n${src}`;
  const dest = `${outDir}/${f}`;
  const cur = existsSync(dest) ? readFileSync(dest, 'utf8') : '';
  if (cur !== out) {
    stale = true;
    if (!check) writeFileSync(dest, out);
  }
}
if (check && stale) {
  console.error('motor das Edge Functions desatualizado: rode `npm run sync:engine`');
  process.exit(1);
}
console.log(check ? 'motor em dia' : 'motor copiado pras Edge Functions');
