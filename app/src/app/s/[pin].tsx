import { Redirect, useLocalSearchParams } from 'expo-router';

/** Universal Link do convite (https://idoubtit.fun/s/1234): o mesmo que euduvido://join/1234. */
export default function SiteInviteLink() {
  const { pin } = useLocalSearchParams<{ pin: string }>();
  const clean = /^\d{4}$/.test(pin ?? '') ? pin : undefined;
  return <Redirect href={clean ? { pathname: '/pin/join', params: { pin: clean } } : '/pin/join'} />;
}
