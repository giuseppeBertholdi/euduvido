import { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { links } from '@/config/links';
import { PACKS } from '@/game/content';
import { usePlans } from '@/features/paywall/usePlans';
import { analytics } from '@/services/analytics';
import { purchases } from '@/services/purchases';
import { colors, fonts, radii } from '@/theme';
import { Icon, type IconName } from './Icon';
import { BangMark } from './brand';
import { DelayedClose } from './DelayedClose';
import { Btn, Title } from './ui';
import { t } from '@/i18n';

const PERKS: [IconName, string][] = [
  ['sparkle', t('+{n} pacotes (absurdos BR, ciência, comida…)', { n: PACKS.filter((p) => p.premium).length })],
  ['room', t('todos os pacotes na sala com PIN')],
  ['refresh', t('perguntas novas sem parar')],
];

/**
 * O "easy paywall": uma folha curta que sobe ao entrar no app (quem não assina e já jogou uma partida).
 * Um plano só (anual com teste), um botão, o ✕ já visível; "ver todos os planos" abre o paywall completo.
 */
export function EasyPaywall({ visible, onClose, onSeeAll, onPurchased }: { visible: boolean; onClose: () => void; onSeeAll: () => void; onPurchased: () => void }) {
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState(false);
  const { plans, error: plansError } = usePlans();
  const annual = plans?.find((p) => p.id === 'annual') ?? null;

  useEffect(() => {
    if (visible) analytics.track('paywall_viewed', { source: 'launch', kind: 'easy' });
  }, [visible]);

  const buy = async () => {
    if (!annual) return;
    setBusy(true);
    const track = { source: 'launch', kind: 'easy', plan: annual.id, trial: !!annual.trialDays };
    analytics.track('purchase_started', track);
    const r = await purchases.purchase(annual);
    setBusy(false);
    analytics.track(r.ok && r.premium ? 'purchase_completed' : 'purchase_failed', { ...track, cancelled: !!r.cancelled, activated: r.premium });
    if (r.ok && r.premium) onPurchased();
  };
  const close = () => {
    analytics.track('paywall_closed', { source: 'launch', kind: 'easy' });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={() => undefined}>
      <View style={styles.scrim}>
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} accessibilityViewIsModal>
          <View style={styles.peek} pointerEvents="box-none">
            <BangMark size={76} style={{ transform: [{ rotate: '10deg' }] }} />
          </View>
          <View style={styles.closeRow}>
            <DelayedClose delayMs={0} onClose={close} ready={!!annual || plansError} />
          </View>

          <Text style={styles.kicker}>{t('eu duvido! pro')}</Text>
          <Title size={36}>
            {t('libera o jogo\ninteiro')}<Text style={{ color: colors.pinkInk }}>.</Text>
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
                {annual.trialDays ? <Text style={styles.offerKicker}>{t('{n} dias grátis, depois', { n: annual.trialDays })}</Text> : null}
                <Text style={styles.offerBig}>{annual.price}/{t('ano')}</Text>
                {annual.perWeek ? <Text style={styles.offerWeek}>{t('só {price} por semana', { price: annual.perWeek })}</Text> : null}
              </View>
            ) : (
              <ActivityIndicator color={colors.ink} style={{ flex: 1 }} />
            )}
          </View>

          <Btn
            label={!annual ? t('Carregando…') : annual.trialDays ? t('Testar {n} dias grátis', { n: annual.trialDays }) : t('Assinar por {price}', { price: annual.price })}
            onPress={buy}
            disabled={busy || !annual}
            busy={busy ? <ActivityIndicator color={colors.ink} /> : undefined}
            height={62}
          />
          <Pressable onPress={onSeeAll} hitSlop={10} style={styles.linkBtn} accessibilityRole="button">
            <Text style={styles.link}>{t('ver todos os planos')}</Text>
          </Pressable>
          <Text style={styles.legal}>
            {annual ? `${annual.trialDays ? `${t('{n} dias grátis, depois', { n: annual.trialDays })} ` : ''}${annual.price}/${t('ano')}. ` : ''}{t('Renova sozinho até você cancelar nos Ajustes do iPhone.')}{' '}
            <Text style={styles.legalLink} onPress={() => void Linking.openURL(links.terms)} accessibilityRole="link">
              {t('Termos de Uso')}
            </Text>
            {' · '}
            <Text style={styles.legalLink} onPress={() => void Linking.openURL(links.privacy)} accessibilityRole="link">
              {t('Privacidade')}
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
