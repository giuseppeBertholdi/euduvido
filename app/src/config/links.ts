/**
 * Links públicos. A App Store exige Termos e Privacidade funcionando dentro do app quando há assinatura,
 * então eles têm endereço fixo; o .env só troca. As páginas moram no repositório do site idoubtit.fun (web/euduvido/),
 * em português e em inglês (web/euduvido/en/).
 */
import { isEn } from '@/i18n';

const SITE = 'https://idoubtit.fun/euduvido';
// sem país no caminho: a App Store abre na loja de quem toca
const APP_STORE = 'https://apps.apple.com/app/id6821700690';

export const links = {
  terms: process.env.EXPO_PUBLIC_TERMS_URL || (isEn ? `${SITE}/en/terms` : `${SITE}/termos`),
  privacy: process.env.EXPO_PUBLIC_PRIVACY_URL || (isEn ? `${SITE}/en/privacy` : `${SITE}/privacidade`),
  supportEmail: process.env.EXPO_PUBLIC_SUPPORT_EMAIL || 'giuseppe.bertholdi@gmail.com',
  appStore: APP_STORE,
  /** O site (sem barra no fim): o link do desafio do dia mora em /d/<número>. */
  site: 'https://idoubtit.fun',
  /** Abre direto a tela de escrever avaliação (só por iniciativa da pessoa; o pedido automático é o nativo). */
  writeReview: `${APP_STORE}?action=write-review`,
  manageSubscriptions: 'https://apps.apple.com/account/subscriptions',
  /** Convite de sala clicável em qualquer app: abre o Eu Duvido! (Universal Link) ou a página com o PIN e a loja. */
  roomInvite: (pin: string) => `https://idoubtit.fun/s/${pin}`,
};
