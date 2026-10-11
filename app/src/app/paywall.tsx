import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type IconName } from '@/components/Icon';
import { BangMark } from '@/components/brand';
import { DelayedClose } from '@/components/DelayedClose';
import { Btn, Label, Raised, Title } from '@/components/ui';
import { links } from '@/config/links';
import { PACKS } from '@/game/questions';
import { ProView } from '@/features/paywall/ProView';
import { Teasers } from '@/features/paywall/Teasers';
import { usePlans } from '@/features/paywall/usePlans';
import { purchases, type PlanId } from '@/services/purchases';
import { useApp } from '@/state/app';
import { colors, fonts } from '@/theme';

/** O ✕ demora pra aparecer: mais na primeira vez (fim da introdução) e ao abrir o app. */
const CLOSE_AFTER_MS: Record<string, number> = { onboarding: 4000, launch: 3000 };
const CLOSE_DEFAULT_MS = 3500;

const TITLES: Record<string, string> = {
  pack: 'absurdos BR\nte espera',
  pin: 'sala com PIN\né do pro',
};

const PRO_PACKS = PACKS.filter((p) => p.premium);
const PRO_QUESTIONS = PRO_PACKS.reduce((n, p) => n + p.questions.length, 0);

const PERKS: [IconName, string][] = [
  ['sparkle', `+${PRO_PACKS.length} pacotes, +${PRO_QUESTIONS} perguntas desse naipe`],
  ['room', 'criar sala com PIN pra galera entrar'],
  ['refresh', 'pacotes novos chegando direto'],
  ['users', 'só quem cria a sala precisa assinar'],
];

export default function Paywall() {
  const { source = 'home' } = useLocalSearchParams<{ source?: string }>();
  const { set, premium } = useApp();
  const insets = useSafeAreaInsets();
  const onboarding = source === 'onboarding';
  const [plan, setPlan] = useState<PlanId>('annual');
  const [allPlans, setAllPlans] = useState(false);
  const [busy, setBusy] = useState(false);
  const { plans, error: plansError, reload } = usePlans();
  const [buyError, setBuyError] = useState<string | null>(null);
  const selected = plans?.find((p) => p.id === plan) ?? plans?.[0] ?? null;
  const shown = plans ? (allPlans ? plans : plans.filter((p) => p.featured)) : [];
  const weekly = plans?.find((p) => p.id === 'weekly');

  const leave = () => {
    if (onboarding) {
      set({ onboarded: true });
      router.replace('/');
    } else if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  const buy = async () => {
    if (!selected) return;
    setBusy(true);
    setBuyError(null);
    const r = await purchases.purchase(selected);
    setBusy(false);
    if (!r.ok && !r.cancelled) setBuyError('A compra não foi concluída. Tenta de novo?');
    if (r.ok && !r.premium) setBuyError('Compra feita, mas o pro ainda não ativou. Toque em restaurar compras.');
    if (r.ok && r.premium) {
      set({ premium: true, ...(onboarding ? { onboarded: true } : null) });
      if (source === 'pin') router.replace('/pin/create');
      else leave();
    }
  };
  const restore = async () => {
    setBusy(true);
    const r = await purchases.restore();
    setBusy(false);
    if (r.premium) {
      set({ premium: true });
      leave();
    }
  };

  // quem já assina não vê oferta: vê o que tem e como gerenciar
  if (premium && !onboarding) return <ProView onClose={leave} onRestore={restore} busy={busy} />;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <StatusBar style="dark" />
      <View style={styles.topRow}>
        <DelayedClose delayMs={CLOSE_AFTER_MS[source] ?? CLOSE_DEFAULT_MS} onClose={leave} />
        <Pressable onPress={restore} hitSlop={10} style={{ minHeight: 44, justifyContent: 'center' }} accessibilityRole="button">
          <Text style={styles.restore}>restaurar compras</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={{ flex: 1 }}>
            <Label>eu duvido! pro</Label>
            <Title size={32} style={{ marginTop: 6 }}>
              {TITLES[source] ?? 'toda noite\nde jogo,\nliberada'}
              <Text style={{ color: colors.pinkInk }}>.</Text>
            </Title>
          </View>
          <View style={styles.heroArt}>
            <BangMark size={96} style={{ transform: [{ rotate: '8deg' }] }} />
          </View>
        </View>

        <Teasers />

        <View style={styles.perks}>
          {PERKS.map(([icon, t]) => (
            <View key={t} style={styles.perk}>
              <Icon name={icon} size={22} accent={colors.yellow} />
              <Text style={styles.perkText}>{t}</Text>
            </View>
          ))}
        </View>

        {!plans && (
          <View style={styles.loadingPlans}>
            {plansError ? (
              <Pressable onPress={reload} accessibilityRole="button" style={{ alignItems: 'center', gap: 4 }}>
                <Text style={styles.planTitle}>Não deu pra carregar os preços.</Text>
                <Text style={styles.allPlans}>tentar de novo</Text>
              </Pressable>
            ) : (
              <ActivityIndicator color={colors.ink} />
            )}
          </View>
        )}
        <View style={{ gap: 12, marginTop: 22 }} accessibilityRole="radiogroup">
          {shown.map((p) => {
            const on = p.id === plan;
            return (
              <Raised
                key={p.id}
                onPress={() => setPlan(p.id)}
                face={on ? colors.yellow : colors.surface}
                plate={on ? colors.ink : colors.line}
                border={on ? colors.ink : colors.line}
                accessibilityLabel={`plano ${p.title}, ${p.price}${p.period ? ` por ${p.period}` : ', pagamento único'}${p.perWeek ? `, equivale a ${p.perWeek} por semana` : ''}${p.trialDays ? `, ${p.trialDays} dias grátis` : ''}`}
                accessibilityState={{ selected: on }}
              >
                <View style={styles.plan}>
                  <View style={[styles.radio, on && styles.radioOn]}>{on && <Icon name="check" size={14} color={colors.yellow} strokeWidth={3.2} />}</View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.planTitle}>{p.title}</Text>
                    <Text style={styles.planSub}>{p.trialDays ? `${p.trialDays} dias grátis` : p.period ? `cobrado por ${p.period}` : 'paga uma vez, é seu pra sempre'}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.planPrice}>{p.price}</Text>
                    <Text style={styles.planSub}>{p.period ? `por ${p.period}` : 'uma vez'}</Text>
                  </View>
                </View>
                {p.perWeek && (
                  <View style={[styles.weekStrip, on && styles.weekStripOn]}>
                    <Text style={styles.perWeek}>
                      sai {p.perWeek} por semana
                      {weekly ? (
                        <Text style={styles.perWeekVs}>
                          {'  '}no semanal, <Text style={styles.strike}>{weekly.price}</Text>
                        </Text>
                      ) : null}
                    </Text>
                  </View>
                )}
                {p.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>economiza {p.badge.replace('-', '')}</Text>
                  </View>
                )}
              </Raised>
            );
          })}
          {!allPlans && (
            <Pressable onPress={() => setAllPlans(true)} hitSlop={8} style={{ minHeight: 40, justifyContent: 'center' }} accessibilityRole="button">
              <Text style={styles.allPlans}>ver todos os planos</Text>
            </Pressable>
          )}
        </View>

        {selected?.trialDays ? (
          <View style={styles.timeline}>
            {[
              ['hoje', 'libera tudo, nada a pagar agora'],
              [`dia ${selected.trialDays - 1}`, 'cancela até aqui e não paga nada'],
              [`dia ${selected.trialDays}`, `cobra ${selected.price}/${selected.period ?? ''}`],
            ].map(([d, t], k) => (
              <View key={d} style={styles.tlRow}>
                <View style={[styles.tlDot, k === 0 && { backgroundColor: colors.yellow }]} />
                <Text style={styles.tlDay}>{d}</Text>
                <Text style={styles.tlText}>{t}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        {buyError && <Text style={styles.buyError}>{buyError}</Text>}
        <Btn
          label={!selected ? 'Carregando…' : selected.trialDays ? `Testar ${selected.trialDays} dias grátis` : selected.period ? `Assinar por ${selected.price}` : `Comprar por ${selected.price}`}
          onPress={buy}
          disabled={busy || !selected}
          busy={busy ? <ActivityIndicator color={colors.ink} /> : undefined}
          height={62}
        />
        {selected && (
        <Text style={styles.legal}>
          {!selected.period ? `${selected.price}, pagamento único. ` : selected.trialDays ? `${selected.trialDays} dias grátis, depois ${selected.price}/${selected.period}. ` : `${selected.price}/${selected.period}. `}
          {selected.period ? 'Renova sozinho até você cancelar nos Ajustes do iPhone.' : 'Sem renovação.'}
          {' '}
          <Text style={styles.legalLink} onPress={() => void Linking.openURL(links.terms)} accessibilityRole="link">
            Termos de Uso
          </Text>
          {' · '}
          <Text style={styles.legalLink} onPress={() => void Linking.openURL(links.privacy)} accessibilityRole="link">
            Privacidade
          </Text>
        </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  restore: { color: colors.inkSoft, fontFamily: fonts.ui700, fontSize: 14, textDecorationLine: 'underline' },
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },
  hero: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 },
  heroArt: { width: 116, height: 130, alignItems: 'center', justifyContent: 'center' },
  perks: { gap: 10, marginTop: 18 },
  perk: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  perkText: { color: colors.inkSoft, fontFamily: fonts.ui700, fontSize: 16, flex: 1 },
  plan: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: 2.5, borderColor: colors.inkMuted, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  radioOn: { borderColor: colors.ink, backgroundColor: colors.ink },
  planTitle: { color: colors.ink, fontFamily: fonts.ui800, fontSize: 17 },
  planSub: { color: colors.inkSoft, fontFamily: fonts.ui600, fontSize: 13 },
  weekStrip: { marginHorizontal: 12, marginBottom: 12, marginTop: -4, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.sunk },
  weekStripOn: { backgroundColor: colors.surface },
  perWeek: { color: colors.pinkInk, fontFamily: fonts.ui800, fontSize: 15 },
  perWeekVs: { color: colors.inkSoft, fontFamily: fonts.ui600, fontSize: 13 },
  strike: { textDecorationLine: 'line-through' },
  planPrice: { color: colors.ink, fontFamily: fonts.display, fontSize: 20, letterSpacing: -0.5 },
  badge: { position: 'absolute', top: -12, right: 16, backgroundColor: colors.pink, borderWidth: 2, borderColor: colors.ink, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 2, transform: [{ rotate: '3deg' }] },
  badgeText: { color: colors.ink, fontFamily: fonts.ui800, fontSize: 12 },
  allPlans: { color: colors.ink, fontFamily: fonts.ui700, fontSize: 14, textAlign: 'center', textDecorationLine: 'underline' },
  timeline: { marginTop: 20, gap: 12, borderLeftWidth: 2.5, borderColor: colors.line, marginLeft: 6, paddingLeft: 16 },
  tlRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tlDot: { position: 'absolute', left: -24.5, width: 14, height: 14, borderRadius: 7, backgroundColor: colors.surface, borderWidth: 2.5, borderColor: colors.ink },
  tlDay: { color: colors.ink, fontFamily: fonts.ui800, fontSize: 14, width: 52 },
  tlText: { color: colors.inkSoft, fontFamily: fonts.ui600, fontSize: 14, flex: 1 },
  footer: { paddingHorizontal: 20, paddingTop: 12, gap: 6, borderTopWidth: 2, borderColor: colors.line, backgroundColor: colors.paper },
  loadingPlans: { minHeight: 120, alignItems: 'center', justifyContent: 'center', marginTop: 22 },
  buyError: { fontFamily: fonts.ui700, fontSize: 14, color: colors.pinkInk, textAlign: 'center' },
  legalLink: { textDecorationLine: 'underline', color: colors.ink },
  legal: { color: colors.inkMuted, fontFamily: fonts.ui500, fontSize: 11.5, lineHeight: 15, textAlign: 'center' },
});
