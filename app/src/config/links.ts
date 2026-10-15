/**
 * Links públicos. A App Store exige Termos e Privacidade funcionando dentro do app quando há assinatura,
 * então eles têm endereço fixo; o .env só troca. As páginas moram no repositório do site idoubtit.fun (web/euduvido/).
 */
const SITE = 'https://idoubtit.fun/euduvido';
const APP_STORE = 'https://apps.apple.com/br/app/eu-duvido-jogo-de-festa/id6821700690';

export const links = {
  terms: process.env.EXPO_PUBLIC_TERMS_URL || `${SITE}/termos`,
  privacy: process.env.EXPO_PUBLIC_PRIVACY_URL || `${SITE}/privacidade`,
  supportEmail: process.env.EXPO_PUBLIC_SUPPORT_EMAIL || 'giuseppe.bertholdi@gmail.com',
  appStore: APP_STORE,
  /** Abre direto a tela de escrever avaliação (só por iniciativa da pessoa; o pedido automático é o nativo). */
  writeReview: `${APP_STORE}?action=write-review`,
  manageSubscriptions: 'https://apps.apple.com/account/subscriptions',
};
