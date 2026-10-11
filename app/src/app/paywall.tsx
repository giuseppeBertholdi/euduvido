import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProView } from '@/features/paywall/ProView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type IconName } from '@/components/Icon';
import { BangMark } from '@/components/brand';
import { DelayedClose } from '@/components/DelayedClose';
import { Btn, Label, Raised, Title } from '@/components/ui';
import { links } from '@/config/links';
import { PACKS } from '@/game/questions';
import { PLANS, purchases, type PlanId } from '@/services/purchases';
import { useApp } from '@/state/app';
import { colors, fonts } from '@/theme';

/** O ✕ demora pra aparecer: mais na primeira vez (fim da introdução) e ao abrir o app. */
const CLOSE_AFTER_MS: Record<string, number> = { onboarding: 6000, launch: 3000 };
const CLOSE_DEFAULT_MS = 3500;

const TITLES: Record<string, string> = {
  pack: 'absurdos BR\nte espera',
  pin: 'sala com PIN\né do pro',
};

const PERKS: [IconName, string][] = [
  ['sparkle', 'todos os pacotes, sem limite'],
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
  const selected = PLANS.find((p) => p.id === plan) ?? PLANS[0];
  const shown = allPlans ? PLANS : PLANS.filter((p) => p.featured);


  const leave = () => {
    if (onboarding) {
      set({ onboarded: true });
      router.replace('/');
    } else if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  const buy = async () => {
    setBusy(true);
    const r = await purchases.purchase(plan);
    setBusy(false);
    if (r.ok) {
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.packs} style={{ marginHorizontal: -20 }}>
          {PACKS.filter((p) => p.premium).map((p) => (
            <View key={p.id} style={[styles.packChip, { backgroundColor: p.tint }]}>
              <Icon name={p.icon} size={18} accent={colors.surface} />
              <Text style={styles.packText}>
                {p.title} · {p.questions.length}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.perks}>
          {PERKS.map(([icon, t]) => (
            <View key={t} style={styles.perk}>
              <Icon name={icon} size={22} accent={colors.yellow} />
              <Text style={styles.perkText}>{t}</Text>
            </View>
          ))}
        </View>

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
                accessibilityLabel={`plano ${p.title}, ${p.price}${p.period ? ` por ${p.period}` : ', pagamento único'}${p.trialDays ? `, ${p.trialDays} dias grátis` : ''}`}
                accessibilityState={{ selected: on }}
              >
                <View style={styles.plan}>
                  <View style={[styles.radio, on && styles.radioOn]}>{on && <Icon name="check" size={14} color={colors.yellow} strokeWidth={3.2} />}</View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.planTitle}>{p.title}</Text>
                    <Text style={styles.planSub}>{p.trialDays ? `${p.trialDays} dias grátis · ${p.perMonth}` : p.period ? `cobrado por ${p.period}` : 'paga uma vez, é seu pra sempre'}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.planPrice}>{p.price}</Text>
                    <Text style={styles.planSub}>{p.period ? `por ${p.period}` : 'uma vez'}</Text>
                  </View>
                </View>
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

        {selected.trialDays ? (
          <View style={styles.timeline}>
            {[
              ['hoje', 'libera tudo, nada a pagar agora'],
              [`dia ${selected.trialDays - 1}`, 'a gente te lembra antes'],
              [`dia ${selected.trialDays}`, `cobra ${selected.price}/${selected.period}`],
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
        <Btn
          label={selected.trialDays ? `Testar ${selected.trialDays} dias grátis` : selected.period ? `Assinar por ${selected.price}` : `Comprar por ${selected.price}`}
          onPress={buy}
          disabled={busy}
          busy={busy ? <ActivityIndicator color={colors.ink} /> : undefined}
          height={62}
        />
        <Text style={styles.legal}>
          {!selected.period ? `${selected.price}, pagamento único. ` : selected.trialDays ? `${selected.trialDays} dias grátis, depois ${selected.price}/${selected.period}. ` : `${selected.price}/${selected.period}. `}
          {selected.period ? 'Renova sozinho até você cancelar nos Ajustes do iPhone.' : 'Sem renovação.'}
          {links.terms && (
            <Text style={styles.legalLink} onPress={() => void Linking.openURL(links.terms as string)} accessibilityRole="link">
              {' '}Termos
            </Text>
          )}
          {links.privacy && (
            <Text style={styles.legalLink} onPress={() => void Linking.openURL(links.privacy as string)} accessibilityRole="link">
              {' '}Privacidade
            </Text>
          )}
        </Text>
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
  packs: { gap: 8, paddingHorizontal: 20, marginTop: 18 },
  packChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 999, borderWidth: 2, borderColor: colors.ink, paddingHorizontal: 12, paddingVertical: 6 },
  packText: { color: colors.ink, fontFamily: fonts.ui800, fontSize: 14 },
  perks: { gap: 10, marginTop: 18 },
  perk: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  perkText: { color: colors.inkSoft, fontFamily: fonts.ui700, fontSize: 16, flex: 1 },
  plan: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
  radio: { width: 26, height: 26, borderRadius: 13, borderWidth: 2.5, borderColor: colors.inkMuted, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  radioOn: { borderColor: colors.ink, backgroundColor: colors.ink },
  planTitle: { color: colors.ink, fontFamily: fonts.ui800, fontSize: 17 },
  planSub: { color: colors.inkSoft, fontFamily: fonts.ui600, fontSize: 13 },
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
  legalLink: { textDecorationLine: 'underline', color: colors.ink },
  legal: { color: colors.inkMuted, fontFamily: fonts.ui500, fontSize: 11.5, lineHeight: 15, textAlign: 'center' },
});
