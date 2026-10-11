import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';
import { Icon } from './Icon';
import { useReducedMotion } from './motion';

/**
 * O ✕ dos paywalls: invisível (e sem toque) durante `delayMs`, depois aparece com um fade discreto.
 * Ocupa o espaço desde o início, pra nada pular de lugar quando ele surge.
 */
export function DelayedClose({ delayMs, onClose }: { delayMs: number; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [t] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(true);
      Animated.timing(t, { toValue: 1, duration: reduce ? 0 : 450, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
    }, delayMs);
    return () => clearTimeout(id);
  }, [delayMs, reduce, t]);
  if (!visible) return <View style={styles.box} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" />;
  return (
    <Animated.View style={{ opacity: t, transform: [{ scale: t.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }] }}>
      <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel="fechar" style={({ pressed }) => [styles.box, styles.btn, pressed && { backgroundColor: colors.sunk }]}>
        <Icon name="close" size={18} color={colors.inkSoft} accent="none" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: { width: 40, height: 40 },
  btn: { borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line },
});
