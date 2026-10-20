import { Redirect } from 'expo-router';

/** Universal Link do resultado do desafio (https://idoubtit.fun/d/12?r=11011): quem tem o app cai direto no desafio de hoje. */
export default function SiteDailyLink() {
  return <Redirect href="/daily" />;
}
