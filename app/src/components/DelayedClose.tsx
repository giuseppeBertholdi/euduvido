import { useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/theme';
import { Icon } from './Icon';
import { useReducedMotion } from './motion';
import { t } from '@/i18n';

/** Se o preço nunca chegar (loja fora do ar), o ✕ aparece mesmo assim depois disso: ninguém fica preso. */
const MAX_WAIT_MS = 8000;

/**
 * O ✕ dos paywalls: invisível (e sem toque) durante `delayMs`, depois aparece com um fade discreto.
 * A contagem só começa quando `ready` (o preço na tela), pra o ✕ nunca chegar antes da oferta. Com `delayMs` 0, já nasce visível.
 * Ocupa o espaço desde o início, pra nada pular de lugar quando ele surge.
 */
export function DelayedClose({ delayMs, onClose, ready = true }: { delayMs: number; onClose: () => void; ready?: boolean }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(delayMs === 0);
  const [anim] = useState(() => new Animated.Value(delayMs === 0 ? 1 : 0));
  useEffect(() => {
    if (delayMs === 0) return;
    const show = () => {
      setVisible(true);
      Animated.timing(anim, { toValue: 1, duration: reduce ? 0 : 450, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
    };
    const id = setTimeout(show, ready ? delayMs : MAX_WAIT_MS);
    return () => clearTimeout(id);
  }, [delayMs, ready, reduce, anim]);
  if (!visible) return <View style={styles.box} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" />;
  return (
    <Animated.View style={{ opacity: anim, transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }] }}>
      <Pressable onPress={onClose} hitSlop={12} accessibilityRole="button" accessibilityLabel={t('fechar')} style={({ pressed }) => [styles.box, styles.btn, pressed && { backgroundColor: colors.sunk }]}>
        <Icon name="close" size={18} color={colors.inkSoft} accent="none" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: { width: 40, height: 40 },
  btn: { borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line },
});
