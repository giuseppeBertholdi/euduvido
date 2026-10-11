import * as Sharing from 'expo-sharing';
import { forwardRef } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { formatValue } from '@/game/engine';
import { colors, fonts } from '@/theme';

/**
 * Cartão "NA MOSCA!" pra compartilhar (1080×1350 quando capturado em 3x). Fica fora da tela e só vira imagem ao compartilhar.
 */
export const ShareCard = forwardRef<View, { name: string; value: number; unit: string; question: string }>(function ShareCard({ name, value, unit, question }, ref) {
  return (
    <View ref={ref} collapsable={false} style={styles.card}>
      <View style={styles.mark}>
        <Text style={styles.markBang}>!</Text>
      </View>
      <View style={styles.stamp}>
        <Text style={styles.stampText}>NA MOSCA!</Text>
      </View>
      <Text style={styles.who}>{name} cravou</Text>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {formatValue(value, unit)}
      </Text>
      <Text style={styles.unit}>{unit}</Text>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.foot}>
        sem saber. no chute. <Text style={{ color: colors.pinkInk }}>eu duvido!</Text>
      </Text>
    </View>
  );
});

/** Captura o cartão e abre o compartilhar do sistema. */
export async function shareCard(ref: React.RefObject<View | null>): Promise<boolean> {
  if (Platform.OS === 'web' || !ref.current) return false;
  if (!(await Sharing.isAvailableAsync())) return false;
  const uri = await captureRef(ref, { format: 'png', quality: 1 });
  await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: 'Compartilhar o na mosca' });
  return true;
}

const styles = StyleSheet.create({
  card: { position: 'absolute', left: -2000, top: 0, width: 360, height: 450, backgroundColor: colors.yellow, borderRadius: 28, padding: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: colors.ink },
  mark: { position: 'absolute', top: 20, right: 20, width: 46, height: 46, borderRadius: 13, backgroundColor: colors.surface, borderWidth: 3, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  markBang: { fontFamily: fonts.display, fontSize: 32, lineHeight: 42, color: colors.ink },
  stamp: { backgroundColor: colors.pink, borderWidth: 4, borderColor: colors.ink, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 6, transform: [{ rotate: '-6deg' }] },
  stampText: { fontFamily: fonts.display, fontSize: 34, color: colors.ink, letterSpacing: -1 },
  who: { fontFamily: fonts.ui800, fontSize: 20, color: colors.ink, marginTop: 22 },
  value: { fontFamily: fonts.display, fontSize: 78, lineHeight: 86, letterSpacing: -3, color: colors.ink },
  unit: { fontFamily: fonts.ui800, fontSize: 18, color: colors.pinkInk },
  question: { fontFamily: fonts.ui700, fontSize: 15, lineHeight: 20, color: colors.ink, textAlign: 'center', marginTop: 16 },
  foot: { position: 'absolute', bottom: 20, fontFamily: fonts.display, fontSize: 15, color: colors.ink },
});
