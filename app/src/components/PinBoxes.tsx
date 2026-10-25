import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii } from '@/theme';
import { Icon } from './Icon';
import { tapLight } from './ui';
import { t } from '@/i18n';

export const PIN_LENGTH = 4;

export function PinBoxes({ value, error }: { value: string; error?: boolean }) {
  return (
    <View style={styles.boxes} accessible accessibilityLabel={`PIN: ${value.split('').join(' ') || t('vazio')}`}>
      {Array.from({ length: PIN_LENGTH }, (_, i) => {
        const ch = value[i];
        const focus = i === value.length;
        return (
          <View key={i} style={[styles.box, ch ? styles.boxFilled : null, focus && styles.boxFocus, error && styles.boxError]}>
            <Text style={[styles.digit, ch ? { color: colors.ink } : null]}>{ch ?? '·'}</Text>
          </View>
        );
      })}
    </View>
  );
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

export function PinPad({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <View style={styles.grid}>
      {KEYS.map((k, i) =>
        k === '' ? (
          <View key={i} style={styles.keyWrap} />
        ) : (
          <Pressable
            key={i}
            onPress={() => {
              tapLight();
              onChange(k === '⌫' ? value.slice(0, -1) : (value + k).slice(0, PIN_LENGTH));
            }}
            accessibilityRole="button"
            accessibilityLabel={k === '⌫' ? t('apagar') : k}
            style={styles.keyWrap}
          >
            {({ pressed }) => (
              <>
                <View style={[StyleSheet.absoluteFill, styles.plate]} />
                <View style={[styles.key, pressed && { backgroundColor: colors.yellow, transform: [{ translateY: 2 }] }]}>
                  {k === '⌫' ? <Icon name="backspace" size={26} accent={colors.pinkSoft} /> : <Text style={styles.keyText}>{k}</Text>}
                </View>
              </>
            )}
          </Pressable>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxes: { flexDirection: 'row', gap: 10 },
  box: { flex: 1, height: 84, borderRadius: radii.card, borderWidth: 2.5, borderColor: colors.line, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  boxFilled: { backgroundColor: colors.yellow, borderColor: colors.ink },
  boxFocus: { borderColor: colors.ink, borderStyle: 'dashed' },
  boxError: { borderColor: colors.pinkInk, backgroundColor: colors.pinkSoft },
  digit: { color: colors.inkMuted, fontFamily: fonts.display, fontSize: 40, letterSpacing: -1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, rowGap: 11 },
  keyWrap: { width: '31.6%', flexGrow: 1, marginBottom: 3 },
  plate: { top: 3, bottom: -3, borderRadius: radii.key, backgroundColor: colors.line },
  key: { height: 56, borderRadius: radii.key, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  keyText: { color: colors.ink, fontFamily: fonts.display, fontSize: 24 },
});
