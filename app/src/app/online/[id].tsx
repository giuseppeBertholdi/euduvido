import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { BangMark } from '@/components/brand';
import { Btn } from '@/components/ui';
import { MatchScreen } from '@/features/match/MatchScreen';
import { useRoom } from '@/features/online/useRoom';
import { useZoeira, ZoeiraBar, ZoeiraLayer } from '@/features/online/zoeira';
import type { Action } from '@/game/engine';
import { act, leaveRoom, RoomError, serverNow, type RoomAction } from '@/services/rooms';
import { useApp } from '@/state/app';
import { colors, fonts } from '@/theme';

/** Partida online: o estado vem do servidor (Realtime); jogadas vão pela Edge Function `room-action`. */
export default function OnlineMatch() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { premium, markPlayed } = useApp();
  const { room, me, error: watchError } = useRoom(id ?? null);
  const names = useMemo(() => Object.fromEntries((room?.players ?? []).map((p) => [p.userId, p.name])), [room?.players]);
  const { feed, send: sendZoeira } = useZoeira(room?.id ?? null, me, names);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // erro de jogada some sozinho
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 3500);
    return () => clearTimeout(t);
  }, [error]);

  if (!id) return <Redirect href="/" />;
  if (room === undefined || !me)
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.ink} />
        {watchError && <Text style={styles.text}>{watchError}</Text>}
      </View>
    );
  if (room === null || room.status === 'closed' || !room.players.some((p) => p.userId === me))
    return (
      <View style={styles.center}>
        <BangMark size={72} />
        <Text style={styles.text}>Essa sala fechou.</Text>
        <Btn label="Voltar pro início" variant="secondary" right={null} onPress={() => router.replace('/')} style={{ alignSelf: 'stretch' }} />
      </View>
    );
  if (!room.state) return <Redirect href="/" />;

  const send = async (action: RoomAction, quiet = false) => {
    if (busy && action.type !== 'TIMEOUT') return;
    setBusy(true);
    try {
      await act(room.id, room.version, action);
    } catch (e) {
      // timeout: vários celulares avisam ao mesmo tempo; só um vale, o resto é esperado
      const code = e instanceof RoomError ? e.code : '';
      if (!quiet && code !== 'stale_version') setError(e instanceof Error ? e.message : 'Deu ruim.');
    } finally {
      setBusy(false);
    }
  };

  const home = () => {
    void leaveRoom(room.id).catch(() => undefined);
    router.replace('/');
  };
  const quit = () =>
    Alert.alert('Sair da sala?', room.state?.phase === 'end' ? 'Você sai da sala.' : 'Quem sai no meio perde todos os “!”.', [
      { text: 'Ficar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: home },
    ]);

  return (
    <View style={{ flex: 1 }}>
      <MatchScreen
      m={room.state}
      me={me}
      hostId={room.hostId}
      busy={busy}
      error={error ?? watchError}
      now={serverNow}
      onAction={(a: Action) => void send(a, a.type === 'TIMEOUT')}
      onQuit={quit}
      onRematch={me === room.hostId ? () => void send({ type: 'PLAY_AGAIN' }) : null}
      onHome={home}
      showUpsell={!premium}
      onUpsell={() => router.push({ pathname: '/paywall', params: { source: 'pack' } })}
      onSeen={markPlayed}
        zoeira={<ZoeiraBar onSend={sendZoeira} />}
      />
      <ZoeiraLayer feed={feed} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: colors.paper, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  text: { fontFamily: fonts.ui700, fontSize: 16, color: colors.inkSoft, textAlign: 'center' },
});
