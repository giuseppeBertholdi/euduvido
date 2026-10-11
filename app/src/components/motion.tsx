import { useEffect, useState, type ReactNode } from 'react';
import { AccessibilityInfo, Animated, Easing, type StyleProp, type ViewStyle } from 'react-native';

/**
 * Animações só com a API `Animated` do React Native (sem Reanimated/worklets): roda em qualquer versão do Expo Go,
 * sem depender de a versão nativa do app bater com a do projeto.
 */

/** "Reduzir movimento" do sistema (Acessibilidade). */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    let alive = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((v) => alive && setReduce(v))
      .catch(() => undefined);
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduce);
    return () => {
      alive = false;
      sub.remove();
    };
  }, []);
  return reduce;
}

/** Entra subindo e aparecendo (com atraso opcional). Com "reduzir movimento", só aparece. */
export function Enter({ children, delay = 0, from = 16, style }: { children: ReactNode; delay?: number; from?: number; style?: StyleProp<ViewStyle> }) {
  const reduce = useReducedMotion();
  const [t] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const anim = Animated.timing(t, { toValue: 1, duration: 420, delay, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true });
    anim.start();
    return () => anim.stop();
  }, [t, delay]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: t.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 1, 1] }),
          transform: reduce ? [] : [{ translateY: t.interpolate({ inputRange: [0, 1], outputRange: [from, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
