import { useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PACKS } from '@/game/questions';
import { purchases, PLANS } from '@/services/purchases';
import { colors, fonts, radii } from '@/theme';
import { Icon, type IconName } from './Icon';
import { BangMark } from './brand';
import { DelayedClose } from './DelayedClose';
import { Btn, Title } from './ui';

const CLOSE_AFTER_MS = 4000;

const PERKS: [IconName, string][] = [
  ['sparkle', `+${PACKS.filter((p) => p.premium).length} pacotes (absurdos BR, ciência, comida…)`],
  ['room', 'sala com PIN pra galera'],
  ['refresh', 'perguntas novas sem parar'],
];

/**
 * O "easy paywall": uma folha curta que sobe toda vez que a pessoa entra (quem não assina).
 * Um plano só (anual com teste), um botão; o ✕ aparece depois de 2 s; "ver todos os planos" abre o paywall completo.
 */
export function EasyPaywall({ visible, onClose, onSeeAll, onPurchased }: { visible: boolean; onClose: () => void; onSeeAll: () => void; onPurchased: () => void }) {
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState(false);
  const annual = PLANS[0];


  const buy = async () => {
    setBusy(true);
    const r = await purchases.purchase(annual.id);
    setBusy(false);
    if (r.ok) onPurchased();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={() => undefined}>
      <View style={styles.scrim}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} accessibilityViewIsModal>
          <View style={styles.peek} pointerEvents="box-none">
            <BangMark size={76} style={{ transform: [{ rotate: '10deg' }] }} />
          </View>
          <View style={styles.closeRow}>
            <DelayedClose delayMs={CLOSE_AFTER_MS} onClose={onClose} />
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
            <View style={{ flex: 1 }}>
              <Text style={styles.offerBig}>{annual.trialDays} dias grátis</Text>
              <Text style={styles.offerSmall}>
                depois {annual.price}/{annual.period} · {annual.perMonth}
              </Text>
            </View>
          </View>

          <Btn label={`Testar ${annual.trialDays} dias grátis`} onPress={buy} disabled={busy} busy={busy ? <ActivityIndicator color={colors.ink} /> : undefined} height={62} />
          <Pressable onPress={onSeeAll} hitSlop={10} style={styles.linkBtn} accessibilityRole="button">
            <Text style={styles.link}>ver todos os planos</Text>
          </Pressable>
          <Text style={styles.legal}>Renova sozinho. Cancela quando quiser nos Ajustes do iPhone.</Text>
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
  offerSmall: { color: colors.inkSoft, fontFamily: fonts.ui600, fontSize: 14, marginTop: 2 },
  linkBtn: { minHeight: 40, justifyContent: 'center', alignSelf: 'center' },
  link: { color: colors.ink, fontFamily: fonts.ui700, fontSize: 15, textDecorationLine: 'underline' },
  legal: { color: colors.inkMuted, fontFamily: fonts.ui500, fontSize: 12, textAlign: 'center' },
});
