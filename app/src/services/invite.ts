import * as Linking from 'expo-linking';
import { Share } from 'react-native';

/**
 * Link de convite pra uma sala. Em build: euduvido://join/1234. No Expo Go: exp://…/--/join/1234 (abre o app no Expo Go).
 * Apps de mensagem nem sempre deixam links euduvido:// clicáveis (WhatsApp não deixa): por isso o texto leva o PIN junto.
 * Pra um link https clicável em qualquer lugar, falta um domínio com Universal Links (veja o README).
 */
export function inviteUrl(pin: string): string {
  return Linking.createURL(`join/${pin}`);
}

export function shareInvite(pin: string) {
  const url = inviteUrl(pin);
  return Share.share({ message: `bora jogar eu duvido!\nentra pelo link: ${url}\nou abre o app e digita o PIN ${pin}`, url });
}
