/**
 * Compras atrás de uma interface. No Expo Go é um mock (comprar só liga o premium no aparelho);
 * num build nativo, troque por RevenueCat (`react-native-purchases`) sem mexer nas telas.
 */
export type PlanId = 'annual' | 'weekly' | 'monthly' | 'lifetime';
/** `period: null` = compra única (vitalício). `featured`: aparece na vista principal do paywall. */
export type Plan = { id: PlanId; title: string; price: string; period: string | null; perMonth?: string; badge?: string; trialDays?: number; featured?: boolean };

/**
 * Preços de referência (Brasil). Com o RevenueCat, preço, período e teste grátis vêm da loja; isto vira só o fallback do mock.
 * Anual vs. semanal o ano todo (52 × R$ 9,90 = R$ 514,80): R$ 69,90 é 86% mais barato.
 */
export const PLANS: Plan[] = [
  { id: 'annual', title: 'anual', price: 'R$ 69,90', period: 'ano', perMonth: 'R$ 5,83/mês', badge: '-86%', trialDays: 3, featured: true },
  { id: 'weekly', title: 'semanal', price: 'R$ 9,90', period: 'semana', featured: true },
  { id: 'monthly', title: 'mensal', price: 'R$ 19,90', period: 'mês' },
  { id: 'lifetime', title: 'vitalício', price: 'R$ 149,90', period: null },
];

export interface PurchasesService {
  purchase(plan: PlanId): Promise<{ ok: boolean }>;
  restore(): Promise<{ premium: boolean }>;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const purchases: PurchasesService = {
  async purchase() {
    await wait(700);
    return { ok: true };
  },
  async restore() {
    await wait(500);
    return { premium: false };
  },
};
