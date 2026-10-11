import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { planReminders } from './policy';

/**
 * Lembretes LOCAIS (sem servidor de push): até 3 por ausência, à noite. O plano é refeito a cada abertura do app,
 * então quem joga sempre nunca recebe. Só depois de um "sim" da pessoa (pergunta após a primeira partida).
 */
const supported = Platform.OS !== 'web';

if (supported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }),
  });
}

export async function reminderPermission(): Promise<'granted' | 'denied' | 'undetermined'> {
  if (!supported) return 'denied';
  const { status } = await Notifications.getPermissionsAsync();
  return status;
}

/** Pede a permissão do sistema (só faz sentido depois de a pessoa dizer "quero"). */
export async function askReminderPermission(): Promise<boolean> {
  if (!supported) return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.status === 'granted') return true;
  if (!current.canAskAgain) return false;
  const { status } = await Notifications.requestPermissionsAsync({ ios: { allowAlert: true, allowSound: true, allowBadge: false } });
  return status === 'granted';
}

/** Cancela os lembretes antigos e agenda os próximos (se ligado e com permissão). */
export async function rescheduleReminders(enabled: boolean, now = Date.now()): Promise<number> {
  if (!supported) return 0;
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (!enabled || (await reminderPermission()) !== 'granted') return 0;
    const plan = planReminders(now);
    for (const r of plan) {
      await Notifications.scheduleNotificationAsync({
        content: { title: r.title, body: r.body, sound: true },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: r.at },
      });
    }
    return plan.length;
  } catch {
    return 0; // lembrete nunca quebra o app
  }
}
