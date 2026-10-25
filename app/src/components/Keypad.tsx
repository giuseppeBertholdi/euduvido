import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, space } from '@/theme';
import { Icon } from './Icon';
import { applyMagnitude, pressKey } from './keypadRules';
import { tapLight } from './ui';
import { t } from '@/i18n';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];
const MAGS: [string, number, string][] = [
  [t('× mil'), 3, t('vezes mil')],
  [t('× milhão'), 6, t('vezes um milhão')],
  [t('× bilhão'), 9, t('vezes um bilhão')],
];

/** Teclado claro com teclas em relevo (afundam ao apertar). */
export function Keypad({ value, onChange, compact }: { value: string; onChange: (v: string) => void; compact?: boolean }) {
  const h = compact ? 46 : 52;
  return (
    <View>
      <View style={styles.mags}>
        {MAGS.map(([l, z, a11y]) => (
          <Pressable
            key={l}
            accessibilityRole="button"
            accessibilityLabel={a11y}
            onPress={() => {
              tapLight();
              onChange(applyMagnitude(value, z));
            }}
            style={({ pressed }) => [styles.mag, pressed && { backgroundColor: colors.pinkSoft, borderColor: colors.pinkInk }]}
          >
            <Text style={styles.magText}>{l}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.grid}>
        {KEYS.map((k) => (
          <Pressable
            key={k}
            onPress={() => {
              tapLight();
              onChange(pressKey(value, k));
            }}
            accessibilityRole="button"
            accessibilityLabel={k === '⌫' ? t('apagar') : k === 'C' ? t('limpar') : k}
            style={styles.keyWrap}
          >
            {({ pressed }) => (
              <>
                <View style={[StyleSheet.absoluteFill, styles.plate]} />
                <View style={[styles.key, { height: h }, pressed && { backgroundColor: colors.yellow, transform: [{ translateY: 2 }] }]}>
                  {k === '⌫' ? <Icon name="backspace" size={26} accent={colors.pinkSoft} /> : <Text style={[styles.keyText, k === 'C' && { color: colors.pinkInk }]}>{k}</Text>}
                </View>
              </>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mags: { flexDirection: 'row', gap: 6 },
  mag: { flex: 1, height: 40, borderRadius: radii.magnitude, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.inkMuted, alignItems: 'center', justifyContent: 'center' },
  magText: { color: colors.ink, fontFamily: fonts.ui800, fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.keyGap, rowGap: space.keyGap + 3, marginTop: 12 },
  keyWrap: { width: '31.6%', flexGrow: 1, marginBottom: 3 },
  plate: { top: 3, bottom: -3, borderRadius: radii.key, backgroundColor: colors.line },
  key: { borderRadius: radii.key, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  keyText: { color: colors.ink, fontFamily: fonts.display, fontSize: 24 },
});
