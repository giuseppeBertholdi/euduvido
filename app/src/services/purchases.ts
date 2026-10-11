/**
 * Compras atrás de uma interface (as telas não sabem qual está ativa).
 *  - `revenuecat`: build nativo (dev client ou produção) com EXPO_PUBLIC_REVENUECAT_IOS_KEY. Preço, período e teste
 *    grátis vêm da App Store via RevenueCat; o entitlement `pro` decide quem é premium.
 *  - `mock`: Expo Go, web ou sem chave. Comprar só liga o premium no aparelho; os preços são os de referência abaixo.
 * O usuário do RevenueCat é o mesmo id do Supabase, pra o servidor conferir a assinatura (create-room).
 */
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';
import type { CustomerInfo, PurchasesPackage } from 'react-native-purchases';

export type PlanId = 'annual' | 'weekly' | 'monthly' | 'lifetime';
/** `period: null` = compra única (vitalício). `featured`: aparece na vista principal do paywall. */
export type Plan = {
  id: PlanId;
  title: string;
  price: string;
  period: string | null;
  perMonth?: string;
  badge?: string;
  trialDays?: number;
  featured?: boolean;
  /** Pacote do RevenueCat (só no modo revenuecat). */
  pkg?: PurchasesPackage;
};

export const ENTITLEMENT = 'pro';

/**
 * Preços de referência (Brasil), usados no modo mock. Com o RevenueCat, valem os da loja.
 * Anual vs. semanal o ano todo (52 × R$ 9,90 = R$ 514,80): R$ 69,90 é 86% mais barato.
 */
export const PLANS: Plan[] = [
  { id: 'annual', title: 'anual', price: 'R$ 69,90', period: 'ano', perMonth: 'R$ 5,83/mês', badge: '-86%', trialDays: 3, featured: true },
  { id: 'weekly', title: 'semanal', price: 'R$ 9,90', period: 'semana', featured: true },
  { id: 'monthly', title: 'mensal', price: 'R$ 19,90', period: 'mês' },
  { id: 'lifetime', title: 'vitalício', price: 'R$ 149,90', period: null },
];

const iosKey = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY;
const inExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
export const storeMode: 'revenuecat' | 'mock' = Platform.OS === 'ios' && !!iosKey && !inExpoGo ? 'revenuecat' : 'mock';

export type PurchaseResult = { ok: boolean; cancelled?: boolean; premium: boolean };

export interface PurchasesService {
  /** Liga a loja e avisa sempre que o premium mudar. */
  start(appUserId: string | null, onPremium: (premium: boolean) => void): Promise<void>;
  /** Planos com preço da loja (ordem: anual, semanal, mensal, vitalício). */
  plans(): Promise<Plan[]>;
  purchase(plan: Plan): Promise<PurchaseResult>;
  restore(): Promise<{ premium: boolean }>;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const mock: PurchasesService = {
  async start() {},
  async plans() {
    return PLANS;
  },
  async purchase() {
    await wait(700);
    return { ok: true, premium: true };
  },
  async restore() {
    await wait(500);
    return { premium: false };
  },
};

// ───────────── RevenueCat ─────────────

const ORDER: PlanId[] = ['annual', 'weekly', 'monthly', 'lifetime'];
const META: Record<PlanId, { title: string; period: string | null; type: string }> = {
  annual: { title: 'anual', period: 'ano', type: 'ANNUAL' },
  weekly: { title: 'semanal', period: 'semana', type: 'WEEKLY' },
  monthly: { title: 'mensal', period: 'mês', type: 'MONTHLY' },
  lifetime: { title: 'vitalício', period: null, type: 'LIFETIME' },
};
const UNIT_DAYS: Record<string, number> = { DAY: 1, WEEK: 7, MONTH: 30, YEAR: 365 };

const isPro = (info: CustomerInfo) => info.entitlements.active[ENTITLEMENT] !== undefined;

function createRevenueCat(): PurchasesService {
  // require só aqui: no Expo Go/web o módulo nativo nem é tocado
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Purchases = (require('react-native-purchases') as typeof import('react-native-purchases')).default;
  let started: Promise<void> | null = null;

  return {
    start(appUserId, onPremium) {
      started ??= (async () => {
        Purchases.configure({ apiKey: iosKey as string, appUserID: appUserId ?? undefined });
        Purchases.addCustomerInfoUpdateListener((info) => onPremium(isPro(info)));
        onPremium(isPro(await Purchases.getCustomerInfo()));
      })().catch(() => undefined);
      return started;
    },

    async plans() {
      await started;
      const offerings = await Purchases.getOfferings();
      const pkgs = offerings.current?.availablePackages ?? [];
      const found = ORDER.map((id) => ({ id, pkg: pkgs.find((p) => p.packageType === META[id].type) })).filter((x) => x.pkg) as { id: PlanId; pkg: PurchasesPackage }[];
      if (found.length === 0) throw new Error('no_offerings');

      // teste grátis só pra quem ainda tem direito (a loja responde; na dúvida, não mostra)
      const ids = found.map((f) => f.pkg.product.identifier);
      const eligibility = await Purchases.checkTrialOrIntroductoryPriceEligibility(ids).catch(() => ({}) as Record<string, { status: number }>);
      const weekly = found.find((f) => f.id === 'weekly')?.pkg.product.price;

      return found.map(({ id, pkg }) => {
        const p = pkg.product;
        const intro = p.introPrice;
        const eligible = eligibility[p.identifier]?.status === Purchases.INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_ELIGIBLE;
        const trialDays = intro && intro.price === 0 && eligible ? intro.periodNumberOfUnits * (UNIT_DAYS[intro.periodUnit] ?? 1) : undefined;
        const savings = id === 'annual' && weekly ? Math.round((1 - p.price / (weekly * 52)) * 100) : 0;
        return {
          id,
          title: META[id].title,
          price: p.priceString,
          period: META[id].period,
          perMonth: id === 'annual' && p.pricePerMonthString ? `${p.pricePerMonthString}/mês` : undefined,
          badge: savings > 0 ? `-${savings}%` : undefined,
          trialDays,
          featured: id === 'annual' || id === 'weekly',
          pkg,
        };
      });
    },

    async purchase(plan) {
      if (!plan.pkg) return { ok: false, premium: false };
      try {
        const { customerInfo } = await Purchases.purchasePackage(plan.pkg);
        return { ok: true, premium: isPro(customerInfo) };
      } catch (e) {
        const err = e as { userCancelled?: boolean | null; code?: string };
        const cancelled = !!err.userCancelled || err.code === Purchases.PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR;
        return { ok: false, cancelled, premium: false };
      }
    },

    async restore() {
      try {
        return { premium: isPro(await Purchases.restorePurchases()) };
      } catch {
        return { premium: false };
      }
    },
  };
}

export const purchases: PurchasesService = storeMode === 'revenuecat' ? createRevenueCat() : mock;
