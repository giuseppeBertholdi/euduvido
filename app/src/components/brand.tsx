import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { haptic } from '@/services/haptics';
import { colors, fonts } from '@/theme';
import { formatValue } from '@/game/engine';
import { useReducedMotion } from './motion';

/**
 * A marca sem mascote: o "!".
 *  - BangMark: o selo (o mesmo do ícone do app), amarelo com "!" grafite e sombra rosa de adesivo.
 *  - Stamp: o carimbo "EU DUVIDO!" que bate na tela quando alguém duvida.
 *  - Lives: as vidas são "!" (perdeu, o "!" apaga).
 *  - CountUp: a resposta sobe contando até o número, pra criar suspense.
 */

export function BangMark({ size = 56, interactive = true, style }: { size?: number; interactive?: boolean; style?: StyleProp<ViewStyle> }) {
  const reduce = useReducedMotion();
  const [wob] = useState(() => new Animated.Value(0));
  const poke = () => {
    haptic.medium();
    if (reduce) return;
    wob.setValue(0);
    Animated.spring(wob, { toValue: 1, friction: 3, tension: 160, useNativeDriver: true }).start(() => wob.setValue(0));
  };
  const rotate = wob.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: ['0deg', '-14deg', '10deg', '-5deg', '0deg'] });
  const scale = wob.interpolate({ inputRange: [0, 0.3, 1], outputRange: [1, 1.15, 1] });
  return (
    <Pressable onPress={interactive ? poke : undefined} disabled={!interactive} accessibilityRole="image" accessibilityLabel="eu duvido!" style={style} hitSlop={8}>
      <Animated.View style={[styles.mark, { width: size, height: size, borderRadius: size * 0.28, transform: [{ rotate }, { scale }] }]}>
        <View style={[StyleSheet.absoluteFill, styles.center, { transform: [{ translateX: size * 0.04 }, { translateY: size * 0.04 }] }]}>
          <Text style={[styles.markBang, { fontSize: size * 0.78, lineHeight: size * 0.95, color: colors.pink }]} maxFontSizeMultiplier={1}>
            !
          </Text>
        </View>
        <Text style={[styles.markBang, { fontSize: size * 0.78, lineHeight: size * 0.95 }]} maxFontSizeMultiplier={1}>
          !
        </Text>
      </Animated.View>
    </Pressable>
  );
}

/** Carimbo que bate: entra grande e girado, assenta com mola e vibra forte. */
export function Stamp({ text = 'EU DUVIDO!', size = 40, style }: { text?: string; size?: number; style?: StyleProp<ViewStyle> }) {
  const reduce = useReducedMotion();
  const [t] = useState(() => new Animated.Value(reduce ? 1 : 0));
  useEffect(() => {
    haptic.heavy();
    if (reduce) return;
    Animated.spring(t, { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }).start();
  }, [t, reduce]);
  return (
    <Animated.View
      accessibilityRole="text"
      accessibilityLabel={text}
      style={[
        styles.stamp,
        style,
        {
          opacity: t.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1] }),
          transform: [{ scale: t.interpolate({ inputRange: [0, 1], outputRange: [2.6, 1] }) }, { rotate: t.interpolate({ inputRange: [0, 1], outputRange: ['-22deg', '-7deg'] }) }],
        },
      ]}
    >
      <Text style={[styles.stampText, { fontSize: size }]} maxFontSizeMultiplier={1} numberOfLines={1} adjustsFontSizeToFit>
        {text}
      </Text>
    </Animated.View>
  );
}

/** Vidas como "!": acesas (grafite no amarelo) e apagadas. `losing` faz a última acesa tremer e apagar. */
export function Lives({ left, total, size = 22, losing = false }: { left: number; total: number; size?: number; losing?: boolean }) {
  const reduce = useReducedMotion();
  const [shake] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (!losing || reduce) return;
    shake.setValue(0);
    Animated.timing(shake, { toValue: 1, duration: 700, easing: Easing.linear, useNativeDriver: true }).start();
  }, [losing, reduce, shake]);
  // durante `losing`, `left` já é o valor novo: a vida que está indo embora é a de índice `left`
  return (
    <View style={styles.lives} accessible accessibilityLabel={`${left} de ${total} vidas`}>
      {Array.from({ length: total }, (_, i) => {
        const on = i < left;
        const going = losing && i === left;
        const style = going
          ? {
              opacity: shake.interpolate({ inputRange: [0, 0.6, 1], outputRange: [1, 1, 0.25] }),
              transform: [
                { translateX: shake.interpolate({ inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], outputRange: [0, -4, 4, -4, 4, 0, 0] }) },
                { scale: shake.interpolate({ inputRange: [0, 0.6, 1], outputRange: [1, 1.2, 0.85] }) },
              ],
            }
          : null;
        return (
          <Animated.View key={i} style={[styles.life, { width: size * 0.72, height: size, borderRadius: size * 0.22 }, on || going ? styles.lifeOn : styles.lifeOff, style]}>
            <Text style={[styles.lifeBang, { fontSize: size * 0.72, lineHeight: size * 0.95 }, !(on || going) && { color: colors.inkMuted }]}>!</Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

/** Conta de 0 até `to` (ease-out). Com "reduzir movimento", mostra direto. */
export function CountUp({ to, unit, duration = 1300, style, onDone }: { to: number; unit: string; duration?: number; style?: StyleProp<TextStyle>; onDone?: () => void }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? to : 0);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  }, [onDone]);
  useEffect(() => {
    if (reduce) {
      done.current?.();
      return;
    }
    const v = new Animated.Value(0);
    const id = v.addListener(({ value }) => setShown(value));
    Animated.timing(v, { toValue: to, duration, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start(() => {
      setShown(to);
      haptic.success();
      done.current?.();
    });
    return () => {
      v.removeListener(id);
      v.stopAnimation();
    };
  }, [to, duration, reduce]);
  return (
    <Text style={style} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.4} maxFontSizeMultiplier={1} accessibilityLabel={`${to} ${unit}`}>
      {formatValue(shown, unit)}
    </Text>
  );
}

const styles = StyleSheet.create({
  mark: { backgroundColor: colors.yellow, borderWidth: 2.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  markBang: { fontFamily: fonts.display, color: colors.ink, textAlign: 'center' },
  center: { alignItems: 'center', justifyContent: 'center' },
  stamp: { alignSelf: 'center', backgroundColor: colors.pink, borderWidth: 4, borderColor: colors.ink, borderRadius: 18, paddingHorizontal: 18, paddingVertical: 8 },
  stampText: { fontFamily: fonts.display, color: colors.ink, letterSpacing: -1 },
  lives: { flexDirection: 'row', gap: 4 },
  life: { alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  lifeOn: { backgroundColor: colors.yellow, borderColor: colors.ink },
  lifeOff: { backgroundColor: 'transparent', borderColor: colors.line, borderStyle: 'dashed' },
  lifeBang: { fontFamily: fonts.display, color: colors.ink },
});
