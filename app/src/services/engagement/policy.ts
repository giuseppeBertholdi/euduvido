/**
 * Regras puras de engajamento (sem I/O, sem relógio próprio: `now` é injetado), testadas em policy.test.ts.
 */

// ───────────── lembretes (notificações locais) ─────────────

/** Dias depois da última visita em que cai cada lembrete. Máximo de 3 por ausência; abrir o app recomeça a contagem. */
export const REMINDER_DAYS = [2, 6, 13] as const;
/** Sempre à noite, quando a galera se junta. */
export const REMINDER_HOUR = 19;
export const REMINDER_MINUTE = 30;

const COPY: { title: string; body: string }[] = [
  { title: 'bora uma resenha?', body: 'Junta a galera: tem pergunta nova esperando quem chuta sem saber.' },
  { title: 'alguém tá blefando…', body: 'Faz dias que ninguém grita “eu duvido!”. Hoje é dia.' },
  { title: 'saudade da zoeira', body: 'Chama os amigos pra uma partida rapidinha. Quem perde paga o açaí.' },
];

export type PlannedReminder = { at: number; title: string; body: string };

/** Próximos lembretes a partir de agora (a última visita é agora, porque o plano é refeito a cada abertura). */
export function planReminders(now: number): PlannedReminder[] {
  return REMINDER_DAYS.map((days, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    d.setHours(REMINDER_HOUR, REMINDER_MINUTE, 0, 0);
    return { at: d.getTime(), ...COPY[i % COPY.length] };
  }).filter((r) => r.at > now);
}

// ───────────── pedido de avaliação (App Store) ─────────────

export const REVIEW_MIN_MATCHES = 3;
export const REVIEW_MIN_DAYS_SINCE_FIRST_OPEN = 1;
export const REVIEW_MIN_DAYS_BETWEEN = 60;
/** A Apple mostra o pedido no máximo 3 vezes por ano por pessoa; não adianta pedir mais. */
export const REVIEW_MAX_PER_YEAR = 3;

const DAY = 24 * 60 * 60 * 1000;

export type ReviewState = { matchesFinished: number; firstOpenAt: number | null; reviewAsks: number[] };

/**
 * Pede avaliação só num momento bom (acabou uma partida e foi divertida), com uso de verdade e sem insistir.
 * `happy`: a partida acabou bem pra essa pessoa (ganhou, cravou na mosca, ou partida local com a galera).
 */
export function shouldAskReview(s: ReviewState, now: number, happy: boolean): boolean {
  if (!happy) return false;
  if (s.matchesFinished < REVIEW_MIN_MATCHES) return false;
  if (s.firstOpenAt === null || now - s.firstOpenAt < REVIEW_MIN_DAYS_SINCE_FIRST_OPEN * DAY) return false;
  const lastYear = s.reviewAsks.filter((t) => now - t < 365 * DAY);
  if (lastYear.length >= REVIEW_MAX_PER_YEAR) return false;
  const last = Math.max(0, ...s.reviewAsks);
  return now - last >= REVIEW_MIN_DAYS_BETWEEN * DAY;
}
