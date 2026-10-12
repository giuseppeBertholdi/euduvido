import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { PIN_LENGTH, PinBoxes, PinPad } from '@/components/PinBoxes';
import { Btn, Label, Title, TopBar } from '@/components/ui';
import { Lobby, OnlineNotice } from '@/features/online/Lobby';
import { useRoom } from '@/features/online/useRoom';
import { joinRoom, leaveRoom, onlineEnabled, RoomError } from '@/services/rooms';
import { analytics } from '@/services/analytics';
import { useApp } from '@/state/app';
import { colors, fonts, radii } from '@/theme';

/** Entrar com PIN: nome + 4 números → lobby ao vivo → partida quando o host começar. */
export default function JoinPin() {
  const insets = useSafeAreaInsets();
  const app = useApp();
  const params = useLocalSearchParams<{ pin?: string }>();
  const invited = /^\d{4}$/.test(params.pin ?? '') ? (params.pin as string) : '';
  const [pin, setPin] = useState(invited);
  const [name, setName] = useState(app.name);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const { room, me } = useRoom(roomId);

  useEffect(() => {
    if (room && room.status === 'playing') router.replace(`/online/${room.id}`);
  }, [room]);

  const onPin = (v: string) => {
    if (busy) return;
    setPin(v);
    if (v.length !== PIN_LENGTH) return;
    const clean = name.trim();
    if (!clean) {
      setError('Bota teu nome primeiro.');
      setPin('');
      return;
    }
    setBusy(true);
    setError(null);
    app.set({ name: clean });
    joinRoom(v, clean)
      .then((id) => {
        setRoomId(id);
        analytics.track('room_joined', { invited: !!invited });
      })
      .catch((e: unknown) => {
        setError(e instanceof RoomError ? e.message : 'Sem conexão. Tenta de novo.');
        setPin('');
      })
      .finally(() => setBusy(false));
  };

  // veio de um link de convite e já sabemos o nome: entra direto
  const autoJoined = useRef(false);
  useEffect(() => {
    if (!invited || autoJoined.current || !app.name.trim() || !onlineEnabled) return;
    autoJoined.current = true;
    const t = setTimeout(() => onPin(invited), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invited]);
  if (!onlineEnabled) return <OnlineNotice title="Online fora do ar" text="As salas com PIN não estão disponíveis agora. Dá pra jogar no mesmo celular enquanto isso." onBack={() => router.back()} />;


  if (roomId && room && me)
    return (
      <Lobby
        room={room}
        me={me}
        onStart={() => undefined}
        onLeave={() => {
          void leaveRoom(roomId).catch(() => undefined);
          setRoomId(null);
          setPin('');
        }}
      />
    );

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 18 }]}>
      <StatusBar style="dark" />
      <TopBar onBack={() => router.back()} />
      <Label style={{ marginTop: 10 }}>cada um no seu celular</Label>
      <Title size={invited ? 36 : 44} style={{ marginTop: 6 }}>
        {invited ? 'te chamaram' : 'manda'}
        {'\n'}
        {invited ? 'pra sala' : 'o PIN'}<Text style={{ color: colors.pinkInk }}>.</Text>
      </Title>
      <View style={styles.nameRow}>
        <Icon name="users" size={22} accent={colors.yellow} />
        <TextInput value={name} onChangeText={(t) => setName(t.slice(0, 12))} placeholder="teu nome" placeholderTextColor={colors.inkMuted} style={styles.name} autoCapitalize="words" accessibilityLabel="teu nome" />
      </View>
      <View style={{ marginTop: 14 }}>
        <PinBoxes value={pin} error={!!error} />
      </View>
      <View style={styles.status} accessibilityLiveRegion="polite">
        {busy || (roomId && !room) ? <ActivityIndicator color={colors.ink} /> : <Text style={[styles.statusText, error ? { color: colors.pinkInk } : null]}>{error ?? 'Quem criou a sala vê o PIN na tela.'}</Text>}
      </View>
      <View style={{ flex: 1 }} />
      {pin.length === PIN_LENGTH && !busy && !roomId ? (
        <Btn label="Entrar na sala" disabled={!name.trim()} onPress={() => onPin(pin)} />
      ) : (
        <PinPad value={pin} onChange={onPin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: 20 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18, minHeight: 54, borderRadius: radii.button, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, paddingHorizontal: 14 },
  name: { flex: 1, color: colors.ink, fontFamily: fonts.ui800, fontSize: 18, minHeight: 50 },
  status: { minHeight: 40, justifyContent: 'center' },
  statusText: { color: colors.inkSoft, fontFamily: fonts.ui600, fontSize: 14 },
});
