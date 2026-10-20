import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { planReminders } from './policy';

/**
 * Lembretes LOCAIS (sem servidor de push): o desafio do dia ao meio-dia por uma semana e, se a pessoa sumir, 2 chamados
 * pra resenha à noite. O plano é refeito a cada abertura do app. Só depois de um "sim" da pessoa.
 * Tocar no aviso do desafio abre o desafio (`data.url`, tratado no _layout).
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
export async function rescheduleReminders(enabled: boolean, playedToday = false, now = Date.now()): Promise<number> {
  if (!supported) return 0;
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    if (!enabled || (await reminderPermission()) !== 'granted') return 0;
    const plan = planReminders(now, playedToday);
    for (const r of plan) {
      await Notifications.scheduleNotificationAsync({
        content: { title: r.title, body: r.body, sound: true, data: r.url ? { url: r.url } : {} },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: r.at },
      });
    }
    return plan.length;
  } catch {
    return 0; // lembrete nunca quebra o app
  }
}

/**
 * Toque num lembrete: chama `open` com a rota do aviso (ex. `/daily`). Vale também pro toque que abriu o app do zero.
 * Devolve a função pra parar de ouvir.
 */
export function onReminderOpened(open: (url: string) => void): () => void {
  if (!supported) return () => undefined;
  const handle = (r: Notifications.NotificationResponse | null) => {
    const url = r?.notification.request.content.data?.url;
    if (typeof url === 'string' && url.startsWith('/')) open(url);
  };
  void Notifications.getLastNotificationResponseAsync()
    .then((r) => {
      handle(r);
      // não abrir de novo na próxima vez que o app voltar ao foco
      if (r) void Notifications.clearLastNotificationResponseAsync();
    })
    .catch(() => undefined);
  const sub = Notifications.addNotificationResponseReceivedListener(handle);
  return () => sub.remove();
}
