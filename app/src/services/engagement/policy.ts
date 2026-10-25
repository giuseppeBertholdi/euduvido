/**
 * Regras puras de engajamento (sem I/O, sem relógio próprio: `now` é injetado), testadas em policy.test.ts.
 */
import { bidText, dailyNumber, dailyRounds } from '../../game/daily';
import { t } from '@/i18n';

// ───────────── lembretes (notificações locais) ─────────────

/**
 * O desafio do dia avisa ao meio-dia, com a primeira pergunta e o lance da galera (dá vontade de responder).
 * Vai por DAILY_DAYS dias depois da última visita; quem some recebe depois só os da resenha, à noite.
 * Abrir o app refaz o plano, então quem joga todo dia recebe só o do dia seguinte.
 */
export const DAILY_DAYS = 7;
export const DAILY_HOUR = 12;
/** Depois que os do desafio acabam: chamar pra resenha (à noite, quando a galera se junta). */
export const REMINDER_DAYS = [9, 13] as const;
export const REMINDER_HOUR = 19;
export const REMINDER_MINUTE = 30;

const COPY: { title: string; body: string }[] = [
  { title: t('bora uma resenha?'), body: t('Junta a galera: tem pergunta nova esperando quem chuta sem saber.') },
  { title: t('saudade da zoeira'), body: t('Chama os amigos pra uma partida rapidinha. Quem perde paga o açaí.') },
];

export type PlannedReminder = { at: number; title: string; body: string; url?: string };

const at = (now: number, days: number, hour: number, minute = 0) => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d.getTime();
};

/** Próximos lembretes a partir de agora. `playedToday`: o desafio de hoje já foi feito (não avisa de novo). */
export function planReminders(now: number, playedToday = false): PlannedReminder[] {
  const daily: PlannedReminder[] = [];
  for (let days = playedToday ? 1 : 0; days < DAILY_DAYS; days++) {
    const when = at(now, days, DAILY_HOUR);
    if (when <= now) continue;
    const n = dailyNumber(new Date(when));
    const first = dailyRounds(n)[0];
    daily.push({ at: when, title: t('desafio do dia #{n}', { n }), body: `${first.question.text} ${t('A galera diz: {bid}. Duvida?', { bid: bidText(first) })}`, url: '/daily' });
  }
  const party = REMINDER_DAYS.map((days, i) => ({ at: at(now, days, REMINDER_HOUR, REMINDER_MINUTE), ...COPY[i % COPY.length] }));
  return [...daily, ...party];
}

// ───────────── pedido de avaliação (App Store) ─────────────

/** Jogo de festa costuma ser jogado numa noite só: o fim da primeira partida boa é o pico, então já pede ali. */
export const REVIEW_MIN_MATCHES = 1;
export const REVIEW_MIN_DAYS_BETWEEN = 60;
/** A Apple mostra o pedido no máximo 3 vezes por ano por pessoa; não adianta pedir mais. */
export const REVIEW_MAX_PER_YEAR = 3;

const DAY = 24 * 60 * 60 * 1000;

export type ReviewState = { matchesFinished: number; reviewAsks: number[] };

/**
 * Pede avaliação só num momento bom (acabou uma partida e foi divertida) e sem insistir.
 * `happy`: a partida acabou bem pra essa pessoa (ganhou, cravou na mosca, ou partida local com a galera).
 */
export function shouldAskReview(s: ReviewState, now: number, happy: boolean): boolean {
  if (!happy) return false;
  if (s.matchesFinished < REVIEW_MIN_MATCHES) return false;
  const lastYear = s.reviewAsks.filter((t) => now - t < 365 * DAY);
  if (lastYear.length >= REVIEW_MAX_PER_YEAR) return false;
  const last = Math.max(0, ...s.reviewAsks);
  return now - last >= REVIEW_MIN_DAYS_BETWEEN * DAY;
}

/**
 * Cartão "avaliar" no fim da partida, pra quem o pedido nativo não apareceu (a Apple decide se mostra).
 * Da segunda partida em diante (na primeira já sai o nativo), nunca junto com o convite dos lembretes,
 * e some quando a pessoa responde.
 */
export function shouldShowReviewCard(s: { matchesFinished: number; remindersAsked: boolean; reviewCardDone: boolean }): boolean {
  return s.matchesFinished >= 2 && s.remindersAsked && !s.reviewCardDone;
}
