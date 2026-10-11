import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EasyPaywall } from '@/components/EasyPaywall';
import { Icon } from '@/components/Icon';
import { Body, Label, Logo, Raised } from '@/components/ui';
import { PACKS } from '@/game/questions';
import { useApp } from '@/state/app';
import { visits } from '@/state/visits';
import { colors, fonts, maxScale, radii } from '@/theme';

export default function Home() {
  const { onboarded, premium, set } = useApp();
  const insets = useSafeAreaInsets();
  const [easy, setEasy] = useState(false);

  // easy paywall a cada visita, pra quem não assina
  useEffect(() => {
    if (!onboarded || premium) return;
    if (!visits.take()) return;
    const t = setTimeout(() => setEasy(true), 650);
    return () => clearTimeout(t);
  }, [onboarded, premium]);

  if (!onboarded) return <Redirect href="/onboarding" />;

  const paywall = (source: string) => router.push({ pathname: '/paywall', params: { source } });
  const createRoom = () => (premium ? router.push('/pin/create') : paywall('pin'));

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 28 }} showsVerticalScrollIndicator={false}>
        <View style={styles.pad}>
          <View style={styles.header}>
            <Logo size={44} />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Raised onPress={() => paywall('home')} face={premium ? colors.yellow : colors.surface} radius={radii.pill} lift={3} accessibilityLabel={premium ? 'você é pro' : 'conhecer o pro'}>
                <View style={styles.gear}>
                  <Icon name="crown" size={22} accent={premium ? colors.surface : colors.yellow} />
                </View>
              </Raised>
              <Raised onPress={() => router.push('/settings')} radius={radii.pill} lift={3} accessibilityLabel="ajustes">
                <View style={styles.gear}>
                  <Icon name="gear" size={22} accent={colors.pinkSoft} />
                </View>
              </Raised>
            </View>
          </View>
          <Body style={{ marginTop: 10, maxWidth: 260 }}>Ninguém sabe. Todo mundo jura que sabe.</Body>

          {/* cartão principal; o "!" gigante ao fundo é a marca */}
          <View style={{ marginTop: 22 }}>
            <Raised onPress={() => router.push('/setup')} face={colors.yellow} faceStyle={{ overflow: 'hidden' }} accessibilityLabel="Jogar no mesmo celular" accessibilityHint="Um celular só, passando de mão em mão">
              <Text style={styles.watermark} accessible={false}>
                !
              </Text>
              <View style={styles.hero}>
                <View style={styles.heroIcon}>
                  <Icon name="passPhones" size={30} accent={colors.pink} />
                </View>
                <Text style={styles.heroTitle} maxFontSizeMultiplier={maxScale.display}>
                  Jogar no{'\n'}mesmo celular
                </Text>
                <View style={styles.heroFoot}>
                  <Text style={styles.heroSub}>passa de mão em mão · 2 a 8 pessoas</Text>
                  <View style={styles.go}>
                    <Icon name="arrowRight" size={22} color={colors.yellow} />
                  </View>
                </View>
              </View>
            </Raised>
          </View>

          <View style={styles.row}>
            <Raised onPress={() => router.push('/pin/join')} style={{ flex: 1 }} accessibilityLabel="Entrar com PIN" accessibilityHint="Cada um no seu celular">
              <View style={styles.tile}>
                <Icon name="pin" size={30} accent={colors.pink} />
                <Text style={styles.tileTitle}>Entrar com PIN</Text>
                <Text style={styles.tileSub}>cada um no seu celular</Text>
              </View>
            </Raised>
            <Raised onPress={createRoom} style={{ flex: 1 }} accessibilityLabel="Criar sala" accessibilityHint={premium ? undefined : 'Recurso do pro'}>
              <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Icon name="room" size={30} accent={colors.yellow} />
                  {!premium && (
                    <View style={styles.proTag}>
                      <Icon name="crown" size={13} color={colors.yellow} accent="none" strokeWidth={2.6} />
                      <Text style={styles.proTagText}>pro</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.tileTitle}>Criar sala</Text>
                <Text style={styles.tileSub}>a galera entra com o PIN</Text>
              </View>
            </Raised>
          </View>

          <View style={styles.sectionHead}>
            <Label color={colors.ink}>pacotes</Label>
            <Text style={styles.sectionHint}>{PACKS.reduce((n, p) => n + p.questions.length, 0)} perguntas</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.packs}>
          {PACKS.map((p) => {
            const locked = p.premium && !premium;
            return (
              <Raised key={p.id} onPress={() => router.push(`/pack/${p.id}`)} lift={3} radius={radii.tile} face={p.tint} style={{ width: 150 }} accessibilityLabel={`${p.title}, ${p.questions.length} perguntas${locked ? ', bloqueado' : ''}`}
                accessibilityHint="Ver as perguntas">
                <View style={styles.pack}>
                  <View style={styles.packIcon}>
                    <Icon name={p.icon} size={26} accent={p.tint} />
                  </View>
                  <Text style={styles.packTitle} numberOfLines={2} maxFontSizeMultiplier={1.1}>
                    {p.title}
                  </Text>
                  <View style={styles.packFoot}>
                    <Text style={styles.packCount}>{p.questions.length} perguntas</Text>
                    {locked && <Icon name="lock" size={16} accent="none" strokeWidth={2.4} />}
                  </View>
                  {p.isNew && (
                    <View style={styles.newTag}>
                      <Text style={styles.newText}>novo</Text>
                    </View>
                  )}
                </View>
              </Raised>
            );
          })}
        </ScrollView>

        <View style={styles.pad}>
          <Raised onPress={() => router.push('/how-to-play')} style={{ marginTop: 18 }} accessibilityLabel="Como joga">
            <View style={styles.how}>
              <Icon name="help" size={28} accent={colors.pinkSoft} />
              <View style={{ flex: 1 }}>
                <Text style={styles.tileTitle}>Como joga?</Text>
                <Text style={styles.tileSub}>4 passos, 1 minuto, zero calculadora</Text>
              </View>
              <Icon name="arrowRight" size={22} />
            </View>
          </Raised>
          {!premium && (
            <Pressable onPress={() => paywall('home')} style={styles.footBtn} hitSlop={8} accessibilityRole="button">
              <Text style={styles.footLink}>✦ 3 dias grátis de pro</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      <EasyPaywall
        key={easy ? 'on' : 'off'}
        visible={easy}
        onClose={() => setEasy(false)}
        onSeeAll={() => {
          setEasy(false);
          paywall('launch');
        }}
        onPurchased={() => {
          set({ premium: true });
          setEasy(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  pad: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  gear: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  watermark: { position: 'absolute', right: 6, top: -30, fontFamily: fonts.display, fontSize: 210, lineHeight: 250, color: colors.pink, transform: [{ rotate: '12deg' }] },
  hero: { padding: 20, gap: 12 },
  heroIcon: { width: 56, height: 56, borderRadius: 18, backgroundColor: colors.surface, borderWidth: 2.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  heroTitle: { fontFamily: fonts.display, fontSize: 30, lineHeight: 32, letterSpacing: -1, color: colors.ink },
  heroFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  heroSub: { flex: 1, fontFamily: fonts.ui700, fontSize: 15, color: colors.ink },
  go: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', gap: 12, marginTop: 14 },
  tile: { padding: 16, gap: 6, minHeight: 132 },
  tileTitle: { fontFamily: fonts.ui800, fontSize: 17, color: colors.ink, marginTop: 4 },
  tileSub: { fontFamily: fonts.ui600, fontSize: 14, lineHeight: 18, color: colors.inkMuted },
  proTag: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.ink, borderRadius: 999, paddingHorizontal: 8, height: 24 },
  proTagText: { color: colors.yellow, fontFamily: fonts.ui800, fontSize: 12 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 26 },
  sectionHint: { fontFamily: fonts.ui600, fontSize: 14, color: colors.inkMuted },
  packs: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4, gap: 10 },
  pack: { padding: 14, height: 150, justifyContent: 'space-between' },
  packIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  packTitle: { fontFamily: fonts.display, fontSize: 15, lineHeight: 17, letterSpacing: -0.5, color: colors.ink },
  packFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  packCount: { fontFamily: fonts.ui700, fontSize: 13, color: colors.ink },
  newTag: { position: 'absolute', right: 10, top: 12, backgroundColor: colors.ink, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, transform: [{ rotate: '6deg' }] },
  newText: { color: colors.yellow, fontFamily: fonts.ui800, fontSize: 11 },
  how: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  footBtn: { marginTop: 10, alignSelf: 'center', minHeight: 44, justifyContent: 'center' },
  footLink: { fontFamily: fonts.ui800, fontSize: 15, color: colors.pinkInk },
});
