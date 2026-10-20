import * as Linking from 'expo-linking';
import { Share } from 'react-native';
import { links } from '@/config/links';
import { analytics } from '@/services/analytics';

/**
 * Link de convite pra uma sala: https://idoubtit.fun/s/1234 (Universal Link). Com o app, abre direto a sala; sem, abre a
 * página com o PIN e o botão da loja. No desenvolvimento (Expo Go) o link é o exp://…/--/join/1234.
 * O texto vai sem o campo `url` do Share: no iOS, alguns apps (WhatsApp) mandam só a url e descartam o texto com o PIN.
 */
export function inviteUrl(pin: string): string {
  return __DEV__ ? Linking.createURL(`join/${pin}`) : links.roomInvite(pin);
}

export function shareInvite(pin: string) {
  analytics.track('invite_shared', { kind: 'room' });
  return Share.share({ message: `bora jogar eu duvido! entra na minha sala: ${inviteUrl(pin)}\n(ou abre o app e digita o PIN ${pin})\nprimeira vez no app? joga a partida até o fim e ganha 24 h de pro` });
}

/** Indicar o jogo (Ajustes e fim da partida). */
export function shareApp(source: 'settings' | 'match_end' = 'settings') {
  analytics.track('invite_shared', { kind: 'app', source });
  return Share.share({ message: `duvido você acertar quantos km de vasos sanguíneos tem no seu corpo. baixa o eu duvido! e bora jogar: ${links.appStore}` });
}
