import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useReducedMotion } from '@/components/motion';
import { haptic } from '@/services/haptics';
import { playSound, type SoundName } from '@/services/sound';
import { supabase } from '@/services/supabase';
import { colors, fonts } from '@/theme';

/**
 * Zoeira: reações de provocação no online (cada um no seu celular).
 * Vão por Realtime Broadcast (não grava nada no banco): quem manda vê na hora, os outros recebem em ~100 ms.
 * Só reações desta lista e só de quem está na sala; no máximo 1 a cada 1,2 s por pessoa.
 */
export type Reaction = { id: string; emoji: string; label: string; sound?: SoundName };

export const REACTIONS: Reaction[] = [
  { id: 'buzina', emoji: '📣', label: 'buzina', sound: 'buzina' },
  { id: 'trombone', emoji: '🎺', label: 'chorou', sound: 'trombone' },
  { id: 'grilo', emoji: '🦗', label: 'cri cri', sound: 'grilo' },
  { id: 'tambor', emoji: '🥁', label: 'tensão', sound: 'tambor' },
  { id: 'palhaco', emoji: '🤡', label: 'palhaço', sound: 'boing' },
  { id: 'cap', emoji: '🧢', label: 'mentira' },
  { id: 'cobra', emoji: '🐍', label: 'traíra' },
  { id: 'kkk', emoji: '😂', label: 'kkkkk' },
  { id: 'fogo', emoji: '🔥', label: 'brabo' },
  { id: 'olho', emoji: '👀', label: 'sei não' },
];

const byId = Object.fromEntries(REACTIONS.map((r) => [r.id, r]));
const COOLDOWN_MS = 1200;

export type ZoeiraEvent = { key: string; from: string; name: string; reaction: Reaction };

export function useZoeira(roomId: string | null, me: string | null, names: Record<string, string>) {
  const [feed, setFeed] = useState<ZoeiraEvent[]>([]);
  const channel = useRef<ReturnType<NonNullable<typeof supabase>['channel']> | null>(null);
  const lastSent = useRef(0);
  const lastFrom = useRef<Record<string, number>>({});
  const namesRef = useRef(names);
  useEffect(() => {
    namesRef.current = names;
  }, [names]);

  const show = useCallback((from: string, reaction: Reaction) => {
    const key = `${from}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setFeed((f) => [...f.slice(-5), { key, from, name: namesRef.current[from] ?? '?', reaction }]);
    if (reaction.sound) playSound(reaction.sound);
    haptic.light();
    setTimeout(() => setFeed((f) => f.filter((e) => e.key !== key)), 2600);
  }, []);

  useEffect(() => {
    if (!supabase || !roomId) return;
    const db = supabase;
    const ch = db.channel(`zoeira:${roomId}`, { config: { broadcast: { self: false } } });
    ch.on('broadcast', { event: 'react' }, ({ payload }) => {
      const p = payload as { from?: unknown; id?: unknown };
      if (typeof p.from !== 'string' || typeof p.id !== 'string' || !byId[p.id] || !(p.from in namesRef.current)) return;
      const now = Date.now();
      if (now - (lastFrom.current[p.from] ?? 0) < COOLDOWN_MS * 0.8) return; // ignora spam
      lastFrom.current[p.from] = now;
      show(p.from, byId[p.id]);
    }).subscribe();
    channel.current = ch;
    return () => {
      channel.current = null;
      void db.removeChannel(ch);
    };
  }, [roomId, show]);

  const send = useCallback(
    (reaction: Reaction) => {
      if (!me) return;
      const now = Date.now();
      if (now - lastSent.current < COOLDOWN_MS) return;
      lastSent.current = now;
      show(me, reaction);
      void channel.current?.send({ type: 'broadcast', event: 'react', payload: { from: me, id: reaction.id } });
    },
    [me, show],
  );

  return { feed, send };
}

/** Barra de reações (rola na horizontal). */
export function ZoeiraBar({ onSend, title = 'zoeira' }: { onSend: (r: Reaction) => void; title?: string }) {
  return (
    <View style={styles.bar}>
      <Text style={styles.barTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.barRow} keyboardShouldPersistTaps="handled">
        {REACTIONS.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => onSend(r)}
            accessibilityRole="button"
            accessibilityLabel={`mandar ${r.label}`}
            style={({ pressed }) => [styles.react, pressed && { transform: [{ scale: 0.88 }], backgroundColor: colors.yellowSoft }]}
          >
            <Text style={styles.reactEmoji}>{r.emoji}</Text>
            {r.sound && <View style={styles.soundDot} />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

/** Reações subindo pela tela (por cima de tudo, sem pegar toque). */
export function ZoeiraLayer({ feed }: { feed: ZoeiraEvent[] }) {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {feed.map((e, i) => (
        <Floating key={e.key} event={e} lane={i % 3} />
      ))}
    </View>
  );
}

function Floating({ event, lane }: { event: ZoeiraEvent; lane: number }) {
  const reduce = useReducedMotion();
  const [t] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(t, { toValue: 1, duration: 2400, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [t]);
  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      accessibilityLabel={`${event.name}: ${event.reaction.label}`}
      style={[
        styles.float,
        { right: 16 + lane * 70, bottom: 150 + lane * 14 },
        {
          opacity: t.interpolate({ inputRange: [0, 0.1, 0.75, 1], outputRange: [0, 1, 1, 0] }),
          transform: reduce
            ? []
            : [
                { translateY: t.interpolate({ inputRange: [0, 1], outputRange: [0, -260] }) },
                { scale: t.interpolate({ inputRange: [0, 0.12, 0.25, 1], outputRange: [0.4, 1.25, 1, 1] }) },
                { rotate: t.interpolate({ inputRange: [0, 0.5, 1], outputRange: ['-8deg', '6deg', '-4deg'] }) },
              ],
        },
      ]}
    >
      <Text style={styles.floatEmoji}>{event.reaction.emoji}</Text>
      <Text style={styles.floatName} numberOfLines={1}>
        {event.name}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bar: { marginTop: 10, gap: 4 },
  barTitle: { fontFamily: fonts.ui800, fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', color: colors.inkSoft },
  barRow: { gap: 6, paddingRight: 8 },
  react: { width: 46, height: 46, borderRadius: 23, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  reactEmoji: { fontSize: 22 },
  soundDot: { position: 'absolute', right: 4, top: 4, width: 7, height: 7, borderRadius: 4, backgroundColor: colors.pinkInk },
  float: { position: 'absolute', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink, borderRadius: 18, paddingHorizontal: 10, paddingVertical: 6, maxWidth: 120 },
  floatEmoji: { fontSize: 34 },
  floatName: { fontFamily: fonts.ui800, fontSize: 12, color: colors.ink },
});
