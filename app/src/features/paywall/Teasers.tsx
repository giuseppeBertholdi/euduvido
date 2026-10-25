import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { tapLight } from '@/components/ui';
import { formatValue } from '@/game/engine';
import { teasers } from '@/game/highlights';
import { colors, fonts, radii } from '@/theme';
import { t, unitAfter } from '@/i18n';

const ITEMS = teasers();
const CARD = 236;
const GAP = 10;

/** Perguntas de pacotes pro no paywall: a pessoa chuta de cabeça e toca pra ver a resposta (o "como assim?!"). */
export function Teasers() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.head}>{t('chuta de cabeça. depois toca.')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row} style={{ marginHorizontal: -20 }} decelerationRate="fast" snapToInterval={CARD + GAP}>
        {ITEMS.map((q) => {
          const on = !!open[q.id];
          return (
            <Pressable
              key={q.id}
              onPress={() => {
                tapLight();
                setOpen((o) => ({ ...o, [q.id]: !o[q.id] }));
              }}
              style={[styles.card, on && styles.cardOn]}
              accessibilityRole="button"
              accessibilityLabel={on ? `${q.text} ${t('Resposta:')} ${formatValue(q.answer, q.unit)} ${unitAfter(q.unit)}` : `${q.text} ${t('Toque pra ver a resposta')}`}
            >
              <Text style={styles.text}>{q.text}</Text>
              {on ? (
                <View>
                  <Text style={styles.answer} adjustsFontSizeToFit numberOfLines={1} minimumFontScale={0.6}>
                    {formatValue(q.answer, q.unit)}
                  </Text>
                  <Text style={styles.unit}>{unitAfter(q.unit)}</Text>
                  <Text style={styles.more}>{t('tem centenas assim no pro')}</Text>
                </View>
              ) : (
                <View style={styles.reveal}>
                  <Text style={styles.revealText}>{t('ver resposta')}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { fontFamily: fonts.ui800, fontSize: 13, letterSpacing: 1.2, textTransform: 'uppercase', color: colors.pinkInk },
  row: { gap: GAP, paddingHorizontal: 20, paddingTop: 10 },
  card: { width: CARD, minHeight: 168, justifyContent: 'space-between', gap: 12, padding: 16, borderRadius: radii.card, borderWidth: 2.5, borderColor: colors.ink, backgroundColor: colors.surface },
  cardOn: { backgroundColor: colors.yellow },
  text: { fontFamily: fonts.ui800, fontSize: 16, lineHeight: 21, color: colors.ink },
  answer: { fontFamily: fonts.display, fontSize: 26, letterSpacing: -1, color: colors.ink },
  unit: { fontFamily: fonts.ui800, fontSize: 15, color: colors.ink },
  more: { fontFamily: fonts.ui700, fontSize: 13, color: colors.inkSoft, marginTop: 2 },
  reveal: { alignSelf: 'flex-start', borderRadius: 999, backgroundColor: colors.ink, paddingHorizontal: 14, minHeight: 36, justifyContent: 'center' },
  revealText: { fontFamily: fonts.ui800, fontSize: 14, color: colors.yellow },
});
