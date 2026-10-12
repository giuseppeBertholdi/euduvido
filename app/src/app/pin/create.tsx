import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Body, Btn, Label, Title, TopBar } from '@/components/ui';
import { Lobby, OnlineNotice } from '@/features/online/Lobby';
import { useRoom } from '@/features/online/useRoom';
import { PACKS } from '@/game/questions';
import { act, createRoom, leaveRoom, onlineEnabled, RoomError } from '@/services/rooms';
import { analytics } from '@/services/analytics';
import { useApp } from '@/state/app';
import { colors, fonts, radii } from '@/theme';

/** Criar sala (pro): pede o nome se faltar, cria no servidor e mostra o lobby ao vivo. */
export default function CreateRoom() {
  const insets = useSafeAreaInsets();
  const app = useApp();
  const [name, setName] = useState(app.name);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { room, me } = useRoom(roomId);
  const creating = useRef(false);

  // começou: todo mundo vai pra partida
  useEffect(() => {
    if (room && room.status === 'playing') router.replace(`/online/${room.id}`);
  }, [room]);

  if (!app.premium) return <Redirect href="/" />;
  if (!onlineEnabled) return <OnlineNotice title="Online fora do ar" text="As salas com PIN não estão disponíveis agora. Dá pra jogar no mesmo celular enquanto isso." onBack={() => router.back()} />;

  const create = async () => {
    const clean = name.trim();
    if (!clean || creating.current) return;
    creating.current = true;
    setBusy(true);
    setError(null);
    app.set({ name: clean });
    try {
      const packs = app.packs.filter((id) => PACKS.some((p) => p.id === id));
      const created = await createRoom(clean, {
        lives: app.lives,
        turnSeconds: app.timer,
        packs: packs.length ? packs : ['classico'],
        skip: app.avoidRepeats ? app.played.slice(-1000) : [],
      });
      setRoomId(created.roomId);
      analytics.track('room_created', { packs: packs.length ? packs : ['classico'], lives: app.lives, timer: app.timer });
    } catch (e) {
      if (e instanceof RoomError && e.code === 'pro_required') {
        // o servidor não achou a assinatura (ex.: venceu): manda pro paywall
        app.set({ premium: false });
        router.replace({ pathname: '/paywall', params: { source: 'pin' } });
        return;
      }
      setError(e instanceof RoomError ? e.message : 'Sem conexão. Tenta de novo.');
      creating.current = false;
    } finally {
      setBusy(false);
    }
  };

  const leave = () => {
    if (roomId) void leaveRoom(roomId).catch(() => undefined);
    router.back();
  };

  if (roomId && room && me)
    return (
      <Lobby
        room={room}
        me={me}
        busy={busy}
        error={error}
        onLeave={leave}
        onStart={async () => {
          setBusy(true);
          setError(null);
          try {
            await act(room.id, room.version, { type: 'START' });
          } catch (e) {
            setError(e instanceof RoomError ? e.message : 'Deu ruim. Tenta de novo.');
          } finally {
            setBusy(false);
          }
        }}
      />
    );

  return (
    <KeyboardAvoidingView style={[styles.root, { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 14 }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <TopBar onBack={() => router.back()} />
      <Label style={{ marginTop: 12 }}>criar sala · cada um no seu celular</Label>
      <Title size={42} style={{ marginTop: 6 }}>
        como te{'\n'}chamam?
      </Title>
      <Body style={{ marginTop: 8 }}>É o nome que a galera vê na sala.</Body>
      <View style={styles.nameRow}>
        <Icon name="users" size={22} accent={colors.yellow} />
        <TextInput value={name} onChangeText={(t) => setName(t.slice(0, 12))} placeholder="teu nome" placeholderTextColor={colors.inkMuted} style={styles.name} autoCapitalize="words" autoFocus returnKeyType="go" onSubmitEditing={create} accessibilityLabel="teu nome" />
      </View>
      <Text style={styles.hint}>
        {app.lives} vidas · {app.timer ? `${app.timer}s por vez` : 'sem timer'} · muda em Ajustes
      </Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={{ flex: 1 }} />
      <Btn label={busy || (roomId && !room) ? 'Abrindo a sala…' : 'Abrir sala'} right={busy ? <ActivityIndicator color={colors.ink} /> : 'arrowRight'} disabled={!name.trim() || busy || !!roomId} onPress={create} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: 20 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18, minHeight: 58, borderRadius: radii.button, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink, paddingHorizontal: 14 },
  name: { flex: 1, color: colors.ink, fontFamily: fonts.ui800, fontSize: 20, minHeight: 54 },
  hint: { fontFamily: fonts.ui600, fontSize: 14, color: colors.inkMuted, marginTop: 10 },
  error: { fontFamily: fonts.ui700, fontSize: 14, color: colors.pinkInk, marginTop: 12 },
});
