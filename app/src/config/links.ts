/** Links públicos (App Store exige Termos e Privacidade funcionando). Vêm do .env; sem valor, o item some. */
export const links = {
  terms: process.env.EXPO_PUBLIC_TERMS_URL || null,
  privacy: process.env.EXPO_PUBLIC_PRIVACY_URL || null,
  supportEmail: process.env.EXPO_PUBLIC_SUPPORT_EMAIL || null,
  manageSubscriptions: 'https://apps.apple.com/account/subscriptions',
};
