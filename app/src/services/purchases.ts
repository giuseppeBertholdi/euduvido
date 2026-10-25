/**
 * Compras atrás de uma interface (as telas não sabem qual está ativa).
 *  - `revenuecat`: build nativo (dev client ou produção) com EXPO_PUBLIC_REVENUECAT_IOS_KEY. Preço, período e teste
 *    grátis vêm da App Store via RevenueCat; o entitlement `pro` decide quem é premium.
 *  - `mock`: Expo Go, web ou sem chave. Em desenvolvimento, comprar só liga o premium no aparelho (preços de referência
 *    abaixo); fora dele a compra falha, pra um build sem chave nunca liberar o pro de graça.
 * O usuário do RevenueCat é o mesmo id do Supabase, pra o servidor conferir a assinatura (create-room).
 */
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';
import type { CustomerInfo, PurchasesPackage } from 'react-native-purchases';
import { t } from '@/i18n';

export type PlanId = 'annual' | 'weekly' | 'monthly' | 'lifetime';
/** `period: null` = compra única (vitalício). `featured`: aparece na vista principal do paywall. */
export type Plan = {
  id: PlanId;
  title: string;
  price: string;
  period: string | null;
  perMonth?: string;
  /** Quanto sai por semana (só no anual, pra comparar com o semanal). */
  perWeek?: string;
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
  { id: 'annual', title: 'anual', price: 'R$ 69,90', period: 'ano', perMonth: 'R$ 5,83/mês', perWeek: 'R$ 1,34', badge: '-86%', trialDays: 3, featured: true },
  { id: 'weekly', title: 'semanal', price: 'R$ 9,90', period: 'semana', featured: true },
  { id: 'monthly', title: 'mensal', price: 'R$ 19,90', period: 'mês' },
  { id: 'lifetime', title: 'vitalício', price: 'R$ 149,90', period: null },
];

const iosKey = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY;
const inExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
export const storeMode: 'revenuecat' | 'mock' = Platform.OS === 'ios' && !!iosKey && !inExpoGo ? 'revenuecat' : 'mock';

export type PurchaseResult = { ok: boolean; cancelled?: boolean; premium: boolean };

export interface PurchasesService {
  /**
   * Liga a loja e avisa sempre que o premium mudar. Já começa a carregar os planos, pra o paywall abrir com preço.
   * `userId` é o id do Supabase; se demorar, a loja começa anônima e liga a conta quando ele chegar.
   */
  start(userId: () => Promise<string | null>, onPremium: (premium: boolean) => void): Promise<void>;
  /** Planos com preço da loja (ordem: anual, semanal, mensal, vitalício). Fica em cache depois da 1ª vez. */
  plans(): Promise<Plan[]>;
  /** Os planos já carregados, sem esperar (null se ainda não chegaram). */
  cachedPlans(): Plan[] | null;
  purchase(plan: Plan): Promise<PurchaseResult>;
  restore(): Promise<{ premium: boolean }>;
  /** Busca de novo na loja (ex.: o servidor acabou de dar a semana do convite) e avisa o `onPremium`. */
  refresh(): Promise<boolean>;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const mock: PurchasesService = {
  async start() {},
  async plans() {
    return PLANS;
  },
  cachedPlans: () => PLANS,
  async purchase() {
    await wait(700);
    return __DEV__ ? { ok: true, premium: true } : { ok: false, premium: false };
  },
  async restore() {
    await wait(500);
    return { premium: false };
  },
  async refresh() {
    return false;
  },
};

// ───────────── RevenueCat ─────────────

const ORDER: PlanId[] = ['annual', 'weekly', 'monthly', 'lifetime'];
const META: Record<PlanId, { title: string; period: string | null; type: string }> = {
  annual: { title: t('anual'), period: t('ano'), type: 'ANNUAL' },
  weekly: { title: t('semanal'), period: t('semana'), type: 'WEEKLY' },
  monthly: { title: t('mensal'), period: t('mês'), type: 'MONTHLY' },
  lifetime: { title: t('vitalício'), period: null, type: 'LIFETIME' },
};
const UNIT_DAYS: Record<string, number> = { DAY: 1, WEEK: 7, MONTH: 30, YEAR: 365 };
/** Ids dos produtos na App Store: dá pra checar o teste grátis junto com as ofertas, sem esperar uma pela outra. */
const PRODUCT_IDS = ['euduvido_pro_annual', 'euduvido_pro_weekly', 'euduvido_pro_monthly', 'euduvido_pro_lifetime'];
/** Quanto o login do Supabase pode segurar a loja antes de ela começar anônima. */
const USER_ID_WAIT_MS = 1500;

const isPro = (info: CustomerInfo) => info.entitlements.active[ENTITLEMENT] !== undefined;

function createRevenueCat(): PurchasesService {
  // require só aqui: no Expo Go/web o módulo nativo nem é tocado
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Purchases = (require('react-native-purchases') as typeof import('react-native-purchases')).default;
  let started: Promise<void> | null = null;
  let loading: Promise<Plan[]> | null = null;
  let cache: Plan[] | null = null;
  let notify: ((premium: boolean) => void) | null = null;

  async function loadPlans(): Promise<Plan[]> {
    // ofertas e elegibilidade ao teste em paralelo (as duas vão na rede)
    const [offerings, eligibility] = await Promise.all([
      Purchases.getOfferings(),
      Purchases.checkTrialOrIntroductoryPriceEligibility(PRODUCT_IDS).catch(() => ({}) as Record<string, { status: number }>),
    ]);
    const pkgs = offerings.current?.availablePackages ?? [];
    const found = ORDER.map((id) => ({ id, pkg: pkgs.find((p) => p.packageType === META[id].type) })).filter((x) => x.pkg) as { id: PlanId; pkg: PurchasesPackage }[];
    if (found.length === 0) throw new Error('no_offerings');
    const weekly = found.find((f) => f.id === 'weekly')?.pkg.product.price;

    return found.map(({ id, pkg }) => {
      const p = pkg.product;
      const intro = p.introPrice;
      // teste grátis só pra quem ainda tem direito (a loja responde; na dúvida, não mostra)
      const eligible = eligibility[p.identifier]?.status === Purchases.INTRO_ELIGIBILITY_STATUS.INTRO_ELIGIBILITY_STATUS_ELIGIBLE;
      const trialDays = intro && intro.price === 0 && eligible ? intro.periodNumberOfUnits * (UNIT_DAYS[intro.periodUnit] ?? 1) : undefined;
      const savings = id === 'annual' && weekly ? Math.round((1 - p.price / (weekly * 52)) * 100) : 0;
      return {
        id,
        title: META[id].title,
        price: p.priceString,
        period: META[id].period,
        perMonth: id === 'annual' && p.pricePerMonthString ? `${p.pricePerMonthString}/${t('mês')}` : undefined,
        perWeek: id === 'annual' ? (p.pricePerWeekString ?? undefined) : undefined,
        badge: savings > 0 ? `-${savings}%` : undefined,
        trialDays,
        featured: id === 'annual' || id === 'weekly',
        pkg,
      };
    });
  }

  const service: PurchasesService = {
    start(userId, onPremium) {
      notify = onPremium;
      started ??= (async () => {
        const timeout = new Promise<null>((r) => setTimeout(() => r(null), USER_ID_WAIT_MS));
        const pending = userId().catch(() => null);
        const id = await Promise.race([pending, timeout]);
        Purchases.configure({ apiKey: iosKey as string, appUserID: id ?? undefined });
        void service.plans().catch(() => undefined); // já deixa o paywall pronto
        Purchases.addCustomerInfoUpdateListener((info) => onPremium(isPro(info)));
        onPremium(isPro(await Purchases.getCustomerInfo()));
        if (!id) {
          // o login do Supabase atrasou: liga a conta agora (o servidor confere a assinatura por esse id)
          const late = await pending;
          if (late) onPremium(isPro((await Purchases.logIn(late)).customerInfo));
        }
      })().catch(() => undefined);
      return started;
    },

    plans() {
      loading ??= (async () => {
        await started;
        cache = await loadPlans();
        return cache;
      })().catch((e) => {
        loading = null; // deixa tentar de novo
        throw e;
      });
      return loading;
    },

    cachedPlans: () => cache,

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

    async refresh() {
      try {
        await started;
        await Purchases.invalidateCustomerInfoCache();
        const premium = isPro(await Purchases.getCustomerInfo());
        notify?.(premium);
        return premium;
      } catch {
        return false;
      }
    },
  };
  return service;
}

export const purchases: PurchasesService = storeMode === 'revenuecat' ? createRevenueCat() : mock;
