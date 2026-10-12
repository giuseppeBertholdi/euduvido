import { useState } from 'react';
import { ActivityIndicator, Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { links } from '@/config/links';
import { PACKS } from '@/game/questions';
import { usePlans } from '@/features/paywall/usePlans';
import { purchases } from '@/services/purchases';
import { colors, fonts, radii } from '@/theme';
import { Icon, type IconName } from './Icon';
import { BangMark } from './brand';
import { DelayedClose } from './DelayedClose';
import { Btn, Title } from './ui';

/** O ✕ do paywall de entrada aparece em 3 s. */
const CLOSE_AFTER_MS = 3000;

const PERKS: [IconName, string][] = [
  ['sparkle', `+${PACKS.filter((p) => p.premium).length} pacotes (absurdos BR, ciência, comida…)`],
  ['room', 'sala com PIN pra galera'],
  ['refresh', 'perguntas novas sem parar'],
];

/**
 * O "easy paywall": uma folha curta que sobe toda vez que a pessoa entra (quem não assina).
 * Um plano só (anual com teste), um botão; o ✕ aparece depois de 3 s; "ver todos os planos" abre o paywall completo.
 */
export function EasyPaywall({ visible, onClose, onSeeAll, onPurchased }: { visible: boolean; onClose: () => void; onSeeAll: () => void; onPurchased: () => void }) {
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState(false);
  const { plans, error: plansError } = usePlans();
  const annual = plans?.find((p) => p.id === 'annual') ?? null;

  const buy = async () => {
    if (!annual) return;
    setBusy(true);
    const r = await purchases.purchase(annual);
    setBusy(false);
    if (r.ok && r.premium) onPurchased();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={() => undefined}>
      <View style={styles.scrim}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} accessibilityViewIsModal>
          <View style={styles.peek} pointerEvents="box-none">
            <BangMark size={76} style={{ transform: [{ rotate: '10deg' }] }} />
          </View>
          <View style={styles.closeRow}>
            <DelayedClose delayMs={CLOSE_AFTER_MS} onClose={onClose} ready={!!annual || plansError} />
          </View>

          <Text style={styles.kicker}>eu duvido! pro</Text>
          <Title size={36}>
            libera o jogo{'\n'}inteiro<Text style={{ color: colors.pinkInk }}>.</Text>
          </Title>
          <View style={styles.perks}>
            {PERKS.map(([icon, p]) => (
              <View key={p} style={styles.perk}>
                <Icon name={icon} size={22} accent={colors.yellow} />
                <Text style={styles.perkText}>{p}</Text>
              </View>
            ))}
          </View>

          <View style={styles.offer}>
            <Icon name="timer" size={28} accent={colors.surface} />
            {annual ? (
              <View style={{ flex: 1 }}>
                {annual.trialDays ? <Text style={styles.offerKicker}>{annual.trialDays} dias grátis, depois</Text> : null}
                <Text style={styles.offerBig}>{annual.price}/ano</Text>
                {annual.perWeek ? <Text style={styles.offerWeek}>só {annual.perWeek} por semana</Text> : null}
              </View>
            ) : (
              <ActivityIndicator color={colors.ink} style={{ flex: 1 }} />
            )}
          </View>

          <Btn
            label={!annual ? 'Carregando…' : annual.trialDays ? `Testar ${annual.trialDays} dias grátis` : `Assinar por ${annual.price}`}
            onPress={buy}
            disabled={busy || !annual}
            busy={busy ? <ActivityIndicator color={colors.ink} /> : undefined}
            height={62}
          />
          <Pressable onPress={onSeeAll} hitSlop={10} style={styles.linkBtn} accessibilityRole="button">
            <Text style={styles.link}>ver todos os planos</Text>
          </Pressable>
          <Text style={styles.legal}>
            {annual ? `${annual.trialDays ? `${annual.trialDays} dias grátis, depois ` : ''}${annual.price}/ano. ` : ''}Renova sozinho até você cancelar nos Ajustes do iPhone.{' '}
            <Text style={styles.legalLink} onPress={() => void Linking.openURL(links.terms)} accessibilityRole="link">
              Termos de Uso
            </Text>
            {' · '}
            <Text style={styles.legalLink} onPress={() => void Linking.openURL(links.privacy)} accessibilityRole="link">
              Privacidade
            </Text>
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: { flex: 1, backgroundColor: colors.scrim, justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.paper, borderTopLeftRadius: radii.sheet, borderTopRightRadius: radii.sheet, paddingHorizontal: 20, paddingTop: 14, gap: 12, borderWidth: 2.5, borderBottomWidth: 0, borderColor: colors.ink },
  peek: { position: 'absolute', right: 24, top: -34, zIndex: 3 },
  closeRow: { flexDirection: 'row' },
  kicker: { color: colors.pinkInk, fontFamily: fonts.ui800, fontSize: 13, letterSpacing: 1.4, textTransform: 'uppercase' },
  perks: { gap: 10, marginTop: 2 },
  perk: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  perkText: { color: colors.inkSoft, fontFamily: fonts.ui700, fontSize: 16, flex: 1 },
  offer: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 4, borderRadius: radii.card, backgroundColor: colors.yellowSoft, paddingVertical: 14, paddingHorizontal: 16 },
  offerBig: { color: colors.ink, fontFamily: fonts.display, fontSize: 24, letterSpacing: -0.8 },
  offerKicker: { color: colors.inkSoft, fontFamily: fonts.ui700, fontSize: 14 },
  offerWeek: { color: colors.pinkInk, fontFamily: fonts.ui800, fontSize: 15, marginTop: 2 },
  linkBtn: { minHeight: 40, justifyContent: 'center', alignSelf: 'center' },
  link: { color: colors.ink, fontFamily: fonts.ui700, fontSize: 15, textDecorationLine: 'underline' },
  legal: { color: colors.inkMuted, fontFamily: fonts.ui500, fontSize: 12, lineHeight: 16, textAlign: 'center' },
  legalLink: { textDecorationLine: 'underline', color: colors.ink },
});
