/**
 * Gera o dias.json da página do desafio no site (idoubtit.fun/d/<número>): só a 1ª pergunta de cada dia, a que dá pra
 * jogar no navegador. As outras 4 ficam só no app. Rode de novo quando as perguntas mudarem (o inglês tem outras):
 *   npx tsx scripts/daily-web.ts ~/I_doubt/web/euduvido/desafio.json
 *   EXPO_PUBLIC_LANG=en npx tsx scripts/daily-web.ts ~/I_doubt/web/euduvido/desafio.en.json
 */
import { writeFileSync } from 'node:fs';
import { bidText, dailyRounds } from '../src/game/daily';
import { packById } from '../src/game/content';
import { formatValue, isYear } from '../src/game/engine';

const out = process.argv[2];
if (!out) throw new Error('uso: npx tsx scripts/daily-web.ts <saída.json>');
const DAYS = 400;
const days = Array.from({ length: DAYS }, (_, i) => {
  const r = dailyRounds(i + 1)[0];
  const q = r.question;
  return {
    pack: packById(r.packId)?.title ?? '',
    q: q.text,
    bid: bidText(r),
    answer: formatValue(q.answer, q.unit),
    unit: isYear(q.unit) ? '' : q.unit,
    correct: r.correct,
    fact: q.fact ?? '',
    source: q.source ?? '',
  };
});
writeFileSync(out, JSON.stringify({ epoch: '2026-10-20', days }));
console.log(`${out}: ${DAYS} dias`);
