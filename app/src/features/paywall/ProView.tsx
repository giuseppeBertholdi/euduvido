import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BangMark } from '@/components/brand';
import { Icon } from '@/components/Icon';
import { Enter } from '@/components/motion';
import { Body, Btn, IconBtn, Label, Title } from '@/components/ui';
import { links } from '@/config/links';
import { PACKS } from '@/game/content';
import { colors, fonts, radii } from '@/theme';
import { t } from '@/i18n';

/** "Paywall" de quem já assina: nada de oferta; mostra o que está liberado e como gerenciar. */
export function ProView({ onClose, onRestore, busy }: { onClose: () => void; onRestore: () => void; busy: boolean }) {
  const insets = useSafeAreaInsets();
  const premiumPacks = PACKS.filter((p) => p.premium);
  const total = PACKS.reduce((n, p) => n + p.questions.length, 0);
  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <StatusBar style="dark" />
      <View style={styles.top}>
        <IconBtn name="close" label={t('fechar')} onPress={onClose} />
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Enter>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <BangMark size={96} />
            <Label style={{ marginTop: 18 }}>{t('eu duvido! pro')}</Label>
            <Title size={40} style={{ textAlign: 'center', marginTop: 4 }}>
              {t('você é pro')}<Text style={{ color: colors.pinkInk }}>!</Text>
            </Title>
            <Body style={{ textAlign: 'center', marginTop: 6 }}>{t('Valeu por apoiar o jogo. Tá tudo liberado.')}</Body>
          </View>
        </Enter>
        <Enter delay={120}>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{PACKS.length}</Text>
              <Text style={styles.statLabel}>{t('pacotes')}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{total}</Text>
              <Text style={styles.statLabel}>{t('perguntas')}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>∞</Text>
              <Text style={styles.statLabel}>{t('salas com PIN')}</Text>
            </View>
          </View>
        </Enter>
        <Enter delay={200}>
          <View style={styles.packs}>
            {premiumPacks.map((p) => (
              <Pressable key={p.id} onPress={() => router.push(`/pack/${p.id}`)} style={[styles.pack, { backgroundColor: p.tint }]} accessibilityRole="button" accessibilityLabel={`${p.title}, ${t('liberado')}`}>
                <Icon name={p.icon} size={18} accent={colors.surface} />
                <Text style={styles.packText}>{p.title}</Text>
                <Icon name="check" size={14} strokeWidth={3} />
              </Pressable>
            ))}
          </View>
        </Enter>
        <View style={{ gap: 4, marginTop: 18 }}>
          <Pressable onPress={() => void Linking.openURL(links.manageSubscriptions)} style={styles.row} accessibilityRole="button">
            <Icon name="timer" size={22} accent={colors.yellow} />
            <Text style={styles.rowText}>{t('Gerenciar assinatura')}</Text>
            <Icon name="arrowRight" size={18} accent="none" />
          </Pressable>
          <Pressable onPress={onRestore} style={styles.row} accessibilityRole="button">
            <Icon name="refresh" size={22} accent={colors.yellow} />
            <Text style={styles.rowText}>{t('Restaurar compras')}</Text>
            {busy ? <ActivityIndicator color={colors.ink} /> : <Icon name="arrowRight" size={18} accent="none" />}
          </Pressable>
        </View>
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom + 10, 24) }]}>
        <Btn label={t('Bora jogar')} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  top: { flexDirection: 'row', paddingHorizontal: 20 },
  stats: { flexDirection: 'row', gap: 8, marginTop: 20 },
  stat: { flex: 1, alignItems: 'center', backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: radii.button, paddingVertical: 12 },
  statNum: { fontFamily: fonts.display, fontSize: 28, color: colors.ink, letterSpacing: -1 },
  statLabel: { fontFamily: fonts.ui700, fontSize: 12, color: colors.inkSoft },
  packs: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 16 },
  pack: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 999, borderWidth: 2, borderColor: colors.ink, paddingHorizontal: 10, paddingVertical: 5 },
  packText: { fontFamily: fonts.ui800, fontSize: 13, color: colors.ink },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 54, paddingHorizontal: 14, borderRadius: radii.button, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line },
  rowText: { flex: 1, fontFamily: fonts.ui800, fontSize: 16, color: colors.ink },
  footer: { paddingHorizontal: 20, paddingTop: 10, borderTopWidth: 2, borderColor: colors.line },
});
