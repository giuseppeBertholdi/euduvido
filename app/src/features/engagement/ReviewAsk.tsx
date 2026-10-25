import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { links } from '@/config/links';
import { analytics } from '@/services/analytics';
import { shouldShowReviewCard } from '@/services/engagement/policy';
import { useApp } from '@/state/app';
import { colors, fonts, radii } from '@/theme';
import { t } from '@/i18n';

/**
 * Convite pra avaliar, no fim da partida (regras em shouldShowReviewCard). Leva direto pra tela de escrever
 * avaliação da App Store. Não pede nota nem filtra quem gostou (a Apple proíbe), só convida.
 */
export function ReviewAsk() {
  const app = useApp();
  if (Platform.OS === 'web' || !shouldShowReviewCard(app)) return null;

  const answer = (rate: boolean) => {
    analytics.track('review_tapped', { source: 'match_end', action: rate ? 'rate' : 'later', matches_finished: app.matchesFinished });
    app.set({ reviewCardDone: true });
    if (rate) void Linking.openURL(links.writeReview);
  };

  return (
    <View style={styles.card} accessibilityLiveRegion="polite">
      <Icon name="heart" size={28} accent={colors.pink} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{t('Curtiu a resenha?')}</Text>
        <Text style={styles.text}>{t('Uma avaliação na App Store ajuda demais um jogo que tá começando.')}</Text>
        <View style={styles.row}>
          <Pressable onPress={() => answer(true)} style={({ pressed }) => [styles.btn, styles.btnYes, pressed && { opacity: 0.8 }]} accessibilityRole="button">
            <Text style={styles.btnText}>{t('avaliar')}</Text>
          </Pressable>
          <Pressable onPress={() => answer(false)} style={styles.btn} accessibilityRole="button">
            <Text style={[styles.btnText, { color: colors.inkSoft }]}>{t('agora não')}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 12, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink, borderRadius: radii.card, padding: 14, marginTop: 6 },
  title: { fontFamily: fonts.ui800, fontSize: 16, color: colors.ink },
  text: { fontFamily: fonts.ui600, fontSize: 14, color: colors.inkSoft, marginTop: 2 },
  row: { flexDirection: 'row', gap: 8, marginTop: 10 },
  btn: { minHeight: 38, paddingHorizontal: 14, borderRadius: 999, justifyContent: 'center', borderWidth: 2, borderColor: colors.line },
  btnYes: { backgroundColor: colors.yellow, borderColor: colors.ink },
  btnText: { fontFamily: fonts.ui800, fontSize: 14, color: colors.ink },
});
