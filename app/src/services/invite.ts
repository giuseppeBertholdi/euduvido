import * as Linking from 'expo-linking';
import { Share } from 'react-native';
import { links } from '@/config/links';
import { analytics } from '@/services/analytics';

/**
 * Link de convite pra uma sala. Em build: euduvido://join/1234. No Expo Go: exp://…/--/join/1234 (abre o app no Expo Go).
 * Apps de mensagem nem sempre deixam links euduvido:// clicáveis (WhatsApp não deixa): por isso o texto leva o PIN junto.
 * Pra um link https clicável em qualquer lugar, falta um domínio com Universal Links (veja o README).
 * Quem ainda não tem o app recebe o link da App Store: é o convite que traz gente nova.
 */
export function inviteUrl(pin: string): string {
  return Linking.createURL(`join/${pin}`);
}

export function shareInvite(pin: string) {
  const url = inviteUrl(pin);
  analytics.track('invite_shared', { kind: 'room' });
  return Share.share({ message: `bora jogar eu duvido!\nentra pelo link: ${url}\nou abre o app e digita o PIN ${pin}\n\nainda não tem? baixa aqui: ${links.appStore}`, url });
}

/** Indicar o jogo (Ajustes). */
export function shareApp() {
  analytics.track('invite_shared', { kind: 'app' });
  return Share.share({ message: `duvido você acertar quantos km de vasos sanguíneos tem no seu corpo. baixa o eu duvido! e bora jogar: ${links.appStore}` });
}
