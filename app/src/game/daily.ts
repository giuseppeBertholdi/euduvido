/**
 * Desafio do dia (estilo Wordle): as mesmas 5 perguntas pra todo mundo, sorteadas pela data, sem servidor.
 * Em cada uma, a galera dá um lance ("15.000 litros ou mais") e a pessoa decide: ACREDITO ou EU DUVIDO!
 * Tudo aqui é puro (a data entra de fora), testado em daily.test.ts.
 */
import { formatValue } from './engine';
import { PACKS, type Question } from './questions';

export const DAILY_SIZE = 5;
/** O #1 é 20/10/2026 (data local), quando o desafio foi criado. */
const EPOCH = Date.UTC(2026, 9, 20);
const DAY = 24 * 60 * 60 * 1000;

export type DailyPick = 'believe' | 'doubt';
export type DailyRound = { question: Question; packId: string; bid: number; correct: DailyPick };

/** Número do desafio no dia local de `date` (#1 = 20/10/2026). */
export function dailyNumber(date: Date): number {
  return Math.round((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - EPOCH) / DAY) + 1;
}

/** FNV-1a 32 bits: o mesmo número em qualquer celular. */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/** Arredonda pra 2 algarismos significativos (14.000, 870, 35): lance de gente, não de calculadora. */
function nice(n: number): number {
  if (n < 100) return Math.max(1, Math.round(n));
  const p = 10 ** (Math.floor(Math.log10(n)) - 1);
  return Math.round(n / p) * p;
}

// metade abaixo da resposta (acredita), metade acima (duvida); 0,9 e 1,15 são os lances apertados
const RATIOS = [0.3, 0.5, 0.7, 0.9, 1.15, 1.4, 1.8, 2.5, 4];
const YEAR_OFFSETS = [-60, -25, -10, -4, 3, 8, 20, 45];

/** O lance da galera pra essa pergunta nesse dia. Nunca é a resposta exata. */
export function dailyBid(q: Question, n: number): number {
  const h = hash(`bid:${n}:${q.id}`);
  if (q.unit === 'ano') {
    const off = YEAR_OFFSETS[h % YEAR_OFFSETS.length];
    return q.answer + off;
  }
  const ratio = RATIOS[h % RATIOS.length];
  let bid = nice(q.answer * ratio);
  if (bid === q.answer) bid = ratio < 1 ? nice(q.answer * 0.8) : nice(q.answer * 1.25);
  if (bid === q.answer) bid = ratio < 1 ? Math.max(1, q.answer - 1) : q.answer + 1;
  return bid;
}

/** Quem pode cair no desafio: sem o picante (o resultado é compartilhado) e sem resposta pequena demais pra lance. */
function pool(): { q: Question; packId: string }[] {
  return PACKS.filter((p) => p.id !== 'picante').flatMap((p) => p.questions.filter((q) => q.answer >= 10).map((q) => ({ q, packId: p.id })));
}

/** As 5 do dia: 4 de número e 1 de ano (ano demais deixa o desafio com cara de prova). */
export function dailyRounds(n: number): DailyRound[] {
  const all = pool();
  const rank = (x: { q: Question }) => hash(`day:${n}:${x.q.id}`);
  const byRank = (a: { q: Question }, b: { q: Question }) => rank(a) - rank(b);
  const numbers = all.filter((x) => x.q.unit !== 'ano').sort(byRank).slice(0, DAILY_SIZE - 1);
  const year = all.filter((x) => x.q.unit === 'ano').sort(byRank).slice(0, 1);
  // o ano entra numa posição do meio (a primeira é a da notificação: tem que chocar)
  const at = 1 + (hash(`pos:${n}`) % (DAILY_SIZE - 1));
  const picked = [...numbers.slice(0, at), ...year, ...numbers.slice(at)];
  return picked.map(({ q, packId }) => {
    const bid = dailyBid(q, n);
    return { question: q, packId, bid, correct: q.answer >= bid ? 'believe' : 'doubt' };
  });
}

/** "15.000 litros ou mais" / "em 1980 ou depois". */
export function bidText(r: Pick<DailyRound, 'bid' | 'question'>): string {
  return r.question.unit === 'ano' ? `em ${formatValue(r.bid, 'ano')} ou depois` : `${formatValue(r.bid, r.question.unit)} ${r.question.unit} ou mais`;
}

/** Dias seguidos com o desafio feito, contando de hoje (ou de ontem, se hoje ainda não jogou). */
export function dailyStreak(done: readonly number[], today: number): number {
  const set = new Set(done);
  let day = set.has(today) ? today : today - 1;
  let streak = 0;
  while (set.has(day)) {
    streak++;
    day--;
  }
  return streak;
}

/** O texto pra compartilhar (a grade não entrega as respostas). */
export function dailyShareText(n: number, results: readonly boolean[], streak: number, url: string): string {
  const hits = results.filter(Boolean).length;
  const grid = results.map((ok) => (ok ? '🟨' : '🟥')).join('');
  const fire = streak >= 2 ? ` · 🔥 ${streak} dias` : '';
  return `Eu Duvido! #${n} · ${hits}/${results.length}${fire}\n${grid}\nduvido você fazer melhor: ${url}`;
}

/** Já terminou o desafio do dia de `date`? (`daily` é o que fica salvo no celular: acertos por número do desafio) */
export function dailyDone(daily: Record<string, boolean[]>, date: Date): boolean {
  return (daily[String(dailyNumber(date))]?.length ?? 0) >= DAILY_SIZE;
}

/** Números dos desafios terminados (pra sequência). */
export function dailyFinished(daily: Record<string, boolean[]>): number[] {
  return Object.entries(daily)
    .filter(([, r]) => r.length >= DAILY_SIZE)
    .map(([n]) => Number(n));
}
