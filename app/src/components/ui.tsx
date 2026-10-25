import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { haptic } from '@/services/haptics';
import { colors, depth, fonts, maxScale, radii } from '@/theme';
import { Icon, type IconName } from './Icon';
import { isEn, t } from '@/i18n';

export function tapLight() {
  haptic.light();
}

/**
 * Superfície com "sombra de adesivo": uma placa grafite deslocada por baixo. Se tiver `onPress`, afunda ao apertar.
 */
export function Raised({
  children,
  onPress,
  onLongPress,
  face = colors.surface,
  plate = colors.ink,
  border = colors.ink,
  radius = radii.card,
  lift = depth.lift,
  style,
  faceStyle,
  disabled,
  accessibilityLabel,
  accessibilityHint,
  accessibilityState,
}: {
  children: ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  face?: string;
  plate?: string;
  border?: string;
  radius?: number;
  lift?: number;
  style?: StyleProp<ViewStyle>;
  faceStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityState?: { selected?: boolean; checked?: boolean; disabled?: boolean };
}) {
  const content = (pressed: boolean) => (
    <>
      <View style={[StyleSheet.absoluteFill, { top: lift, bottom: -lift, borderRadius: radius, backgroundColor: plate }]} />
      <View style={[{ backgroundColor: face, borderRadius: radius, borderWidth: 2.5, borderColor: border, transform: [{ translateY: pressed ? depth.press : 0 }] }, faceStyle]}>{children}</View>
    </>
  );
  if (!onPress && !onLongPress) return <View style={[{ marginBottom: lift }, style]}>{content(false)}</View>;
  return (
    <Pressable
      onPress={
        onPress &&
        (() => {
          tapLight();
          onPress();
        })
      }
      onLongPress={onLongPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, ...accessibilityState }}
      style={[{ marginBottom: lift, opacity: disabled ? 0.45 : 1 }, style]}
    >
      {({ pressed }) => content(pressed && !disabled)}
    </Pressable>
  );
}

type BtnVariant = 'primary' | 'secondary' | 'dark' | 'pink';
const skins: Record<BtnVariant, { face: string; fg: string; plate: string }> = {
  primary: { face: colors.yellow, fg: colors.ink, plate: colors.ink },
  secondary: { face: colors.surface, fg: colors.ink, plate: colors.ink },
  dark: { face: colors.ink, fg: colors.yellow, plate: '#141414' },
  pink: { face: colors.pink, fg: colors.ink, plate: colors.ink },
};

export function Btn({
  label,
  onPress,
  variant = 'primary',
  icon,
  right = 'arrowRight',
  height = 60,
  disabled,
  style,
  busy,
}: {
  label: string;
  onPress?: () => void;
  variant?: BtnVariant;
  icon?: IconName;
  right?: IconName | ReactNode | null;
  height?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  busy?: ReactNode;
}) {
  const s = skins[variant];
  return (
    <Raised onPress={onPress} disabled={disabled} face={s.face} plate={s.plate} radius={radii.button} style={style} accessibilityLabel={label}>
      <View style={[styles.btn, { minHeight: height - 5 }]}>
        {icon && <Icon name={icon} size={24} color={s.fg} accent={variant === 'primary' ? colors.surface : colors.yellow} />}
        <Text style={[styles.btnText, { color: s.fg }]} maxFontSizeMultiplier={maxScale.ui} numberOfLines={2}>
          {label}
        </Text>
        {busy ?? (typeof right === 'string' ? <Icon name={right as IconName} size={22} color={s.fg} /> : right)}
      </View>
    </Raised>
  );
}

export function LinkBtn({ label, onPress, icon, color = colors.inkSoft }: { label: string; onPress: () => void; icon?: IconName; color?: string }) {
  return (
    <Pressable onPress={onPress} hitSlop={12} accessibilityRole="button" style={styles.link}>
      {icon && <Icon name={icon} size={18} color={color} accent="none" />}
      <Text style={[styles.linkText, { color }]}>{label}</Text>
    </Pressable>
  );
}

export function IconBtn({ name, onPress, label, bg = colors.surface }: { name: IconName; onPress: () => void; label: string; bg?: string }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} accessibilityRole="button" accessibilityLabel={label} style={({ pressed }) => [styles.iconBtn, { backgroundColor: bg, transform: [{ scale: pressed ? 0.92 : 1 }] }]}>
      <Icon name={name} size={20} accent="none" />
    </Pressable>
  );
}

export function Chip({ label, bg = colors.sunk, fg = colors.ink, border, icon, style }: { label: string; bg?: string; fg?: string; border?: string; icon?: IconName; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.chip, { backgroundColor: bg, borderColor: border ?? bg }, style]}>
      {icon && <Icon name={icon} size={15} color={fg} accent="none" strokeWidth={2.6} />}
      <Text style={[styles.chipText, { color: fg }]} maxFontSizeMultiplier={maxScale.ui}>
        {label}
      </Text>
    </View>
  );
}

/** "eu duvido!" ("i doubt it!") com o "!" rosa. */
export function Logo({ size = 40, color = colors.ink, oneLine = false, style }: { size?: number; color?: string; oneLine?: boolean; style?: StyleProp<TextStyle> }) {
  return (
    <Text
      accessibilityRole="header"
      maxFontSizeMultiplier={1}
      style={[{ fontFamily: fonts.display, fontSize: size, lineHeight: size * 0.92, letterSpacing: -size / 24, color }, style]}
    >
      {isEn ? 'i doubt' : 'eu'}
      {oneLine ? ' ' : '\n'}
      {isEn ? 'it' : 'duvido'}
      <Text style={{ color: colors.pinkInk }}>!</Text>
    </Text>
  );
}

export function TopBar({ onBack, backLabel = t('voltar'), right }: { onBack?: () => void; backLabel?: string; right?: ReactNode }) {
  return (
    <View style={styles.topbar}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12} accessibilityRole="button" accessibilityLabel={backLabel} style={({ pressed }) => [styles.back, pressed && { backgroundColor: colors.sunk }]}>
          <Icon name="arrowLeft" size={20} accent="none" />
          <Text style={styles.backText}>{backLabel}</Text>
        </Pressable>
      ) : (
        <View />
      )}
      {right}
    </View>
  );
}

export function Label({ children, color = colors.pinkInk, style }: { children: ReactNode; color?: string; style?: StyleProp<TextStyle> }) {
  return (
    <Text style={[styles.label, { color }, style]} maxFontSizeMultiplier={maxScale.ui}>
      {children}
    </Text>
  );
}

export function Title({ children, size = 40, color = colors.ink, style }: { children: ReactNode; size?: number; color?: string; style?: StyleProp<TextStyle> }) {
  return (
    <Text accessibilityRole="header" maxFontSizeMultiplier={maxScale.display} style={[{ fontFamily: fonts.display, fontSize: size, lineHeight: size * 1.02, letterSpacing: -size / 28, color }, style]}>
      {children}
    </Text>
  );
}

export function Body({ children, color = colors.inkSoft, size = 16, style }: { children: ReactNode; color?: string; size?: number; style?: StyleProp<TextStyle> }) {
  return <Text style={[{ fontFamily: fonts.ui600, fontSize: size, lineHeight: size * 1.4, color }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  btn: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 12 },
  btnText: { flex: 1, fontFamily: fonts.ui800, fontSize: 18 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 44, justifyContent: 'center' },
  linkText: { fontFamily: fonts.ui700, fontSize: 15, textDecorationLine: 'underline', textDecorationColor: colors.line },
  iconBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: radii.pill, borderWidth: 2, paddingHorizontal: 12, paddingVertical: 5 },
  chipText: { fontFamily: fonts.ui700, fontSize: 14 },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 44 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 8, marginLeft: -10, borderRadius: 999 },
  backText: { fontFamily: fonts.ui700, fontSize: 15, color: colors.ink },
  label: { fontFamily: fonts.ui800, fontSize: 13, letterSpacing: 1.4, textTransform: 'uppercase' },
});
