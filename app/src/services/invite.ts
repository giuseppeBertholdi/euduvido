import * as Linking from 'expo-linking';
import { Share } from 'react-native';
import { links } from '@/config/links';
import { bidText, dailyNumber, dailyRounds, dailyShareUrl } from '@/game/daily';
import { analytics } from '@/services/analytics';
import { t } from '@/i18n';

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
  return Share.share({ message: t('🎯 bora jogar Eu Duvido? abri uma sala, entra aqui 👇\n{url}\n(ou abre o app e digita o PIN {pin})\n\nprimeira vez no app? termina a partida e ganha 24 h de Pro grátis 🎁', { url: inviteUrl(pin), pin }) });
}

/** Indicar o jogo (Ajustes e fim da partida): a isca é a 1ª pergunta do desafio de hoje, que dá pra jogar no link sem o app. */
export function shareApp(source: 'settings' | 'match_end' = 'settings') {
  analytics.track('invite_shared', { kind: 'app', source });
  const n = dailyNumber(new Date());
  const first = dailyRounds(n)[0];
  return Share.share({ message: t('duvido você acertar essa 😏\n{question}\na galera diz {bid}. acredita ou duvida? 👇\n{url}', { question: first.question.text, bid: bidText(first), url: dailyShareUrl(links.site, n) }) });
}
