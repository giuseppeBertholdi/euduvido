import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { dailyDone } from '@/game/daily';
import { askReminderPermission, rescheduleReminders } from '@/services/engagement/reminders';
import { analytics } from '@/services/analytics';
import { useApp } from '@/state/app';
import { colors, fonts, radii } from '@/theme';
import { t } from '@/i18n';

/**
 * Convite pros lembretes, no fim da primeira partida (nunca antes: a pessoa já sabe que o jogo é bom).
 * Só depois do "quero" o sistema pede a permissão de notificação.
 */
export function RemindersAsk() {
  const app = useApp();
  const [busy, setBusy] = useState(false);
  if (app.remindersAsked || app.matchesFinished < 1) return null;

  const yes = async () => {
    setBusy(true);
    const granted = await askReminderPermission();
    app.set({ remindersAsked: true, remindersOn: granted });
    analytics.track('reminders_answered', { wanted: true, granted });
    await rescheduleReminders(granted, dailyDone(app.daily, new Date()));
    setBusy(false);
  };

  return (
    <View style={styles.card} accessibilityLiveRegion="polite">
      <Icon name="timer" size={28} accent={colors.yellow} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{t('Te aviso do desafio do dia?')}</Text>
        <Text style={styles.text}>{t('Um aviso ao meio-dia, com a pergunta do dia. Para sozinho se você parar de jogar.')}</Text>
        <View style={styles.row}>
          <Pressable onPress={yes} disabled={busy} style={({ pressed }) => [styles.btn, styles.btnYes, pressed && { opacity: 0.8 }]} accessibilityRole="button">
            {busy ? <ActivityIndicator color={colors.ink} /> : <Text style={styles.btnText}>{t('quero')}</Text>}
          </Pressable>
          <Pressable onPress={() => {
            analytics.track('reminders_answered', { wanted: false, granted: false });
            app.set({ remindersAsked: true });
          }} style={styles.btn} accessibilityRole="button">
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
