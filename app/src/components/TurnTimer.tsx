import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { haptic } from '@/services/haptics';
import { colors, fonts } from '@/theme';

/**
 * Barra do tempo da vez. Componente folha: o segundo atual não sobe pra estado global.
 * `now` é o relógio de referência (local: Date.now; online: relógio do servidor).
 * Quando zera, chama `onExpire` uma vez (e de novo a cada 1,5 s, caso o servidor ainda não tenha aceitado).
 */
export function TurnTimer({ deadline, seconds, now, onExpire }: { deadline: number; seconds: number; now: () => number; onExpire?: () => void }) {
  const [left, setLeft] = useState(() => Math.max(0, deadline - now()));
  const [bar] = useState(() => new Animated.Value(Math.max(0, deadline - now()) / (seconds * 1000)));
  const expire = useRef(onExpire);
  useEffect(() => {
    expire.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    const remaining = Math.max(0, deadline - now());
    bar.setValue(remaining / (seconds * 1000));
    const anim = Animated.timing(bar, { toValue: 0, duration: remaining, easing: Easing.linear, useNativeDriver: false });
    anim.start();
    let lastSec = -1;
    let fired = 0;
    const id = setInterval(() => {
      const ms = Math.max(0, deadline - now());
      setLeft(ms);
      const sec = Math.ceil(ms / 1000);
      if (sec !== lastSec && sec > 0 && sec <= 3) haptic.light();
      lastSec = sec;
      if (ms === 0 && Date.now() - fired > 1500) {
        if (fired === 0) haptic.warning();
        fired = Date.now();
        expire.current?.();
      }
    }, 200);
    return () => {
      anim.stop();
      clearInterval(id);
    };
  }, [deadline, seconds, now, bar]);

  const sec = Math.ceil(left / 1000);
  const late = sec <= 5;
  return (
    <View style={styles.wrap} accessible accessibilityRole="timer" accessibilityLabel={sec > 0 ? `${sec} segundos` : 'tempo esgotado'}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { backgroundColor: late ? colors.pink : colors.ink, width: bar.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
      </View>
      <Text style={[styles.sec, late && { color: colors.pinkInk }]} maxFontSizeMultiplier={1.2}>
        {sec > 0 ? `${sec}s` : 'já!'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  track: { flex: 1, height: 12, borderRadius: 6, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.surface, overflow: 'hidden' },
  fill: { height: '100%' },
  sec: { minWidth: 52, textAlign: 'right', fontFamily: fonts.display, fontSize: 18, color: colors.ink },
});
