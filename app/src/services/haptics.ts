import * as Haptics from 'expo-haptics';

/** Vibração atrás de um interruptor (Ajustes). Nunca quebra se o aparelho não vibra. */
let enabled = true;

export function setHapticsEnabled(v: boolean) {
  enabled = v;
}

const safe = (p: Promise<void>) => void p.catch(() => undefined);

export const haptic = {
  light: () => enabled && safe(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  medium: () => enabled && safe(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
  heavy: () => enabled && safe(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)),
  success: () => enabled && safe(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  warning: () => enabled && safe(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),
};
