import { Redirect, useLocalSearchParams } from 'expo-router';

/** Link de convite (euduvido://join/1234): abre a tela de PIN já preenchida, que entra sozinha se já souber o nome. */
export default function InviteLink() {
  const { pin } = useLocalSearchParams<{ pin: string }>();
  const clean = /^\d{4}$/.test(pin ?? '') ? pin : undefined;
  return <Redirect href={clean ? { pathname: '/pin/join', params: { pin: clean } } : '/pin/join'} />;
}
