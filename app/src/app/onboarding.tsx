import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BangMark, Lives, Stamp } from '@/components/brand';
import { Icon } from '@/components/Icon';
import { Enter } from '@/components/motion';
import { Body, Btn, Label, Logo, Raised, Title } from '@/components/ui';
import { useApp } from '@/state/app';
import { visits } from '@/state/visits';
import { colors, fonts } from '@/theme';

const LAST = 2;
const DEMO_BIDS: [string, string][] = [
  ['bia', '30'],
  ['léo', '42'],
  ['cacá', '55'],
];

/** Mostra o filho depois de `ms` (pra encenar a demo). */
function After({ ms, children }: { ms: number; children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return on ? <>{children}</> : null;
}

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 740;
  // folga do botão: nunca colado na borda nem na barrinha de gesto do iPhone
  const bottom = Math.max(insets.bottom + 10, 24);
  const [i, setI] = useState(0);
  const app = useApp();
  const [name, setName] = useState(app.name);

  const finish = () => {
    if (name.trim()) app.set({ name: name.trim() });
    visits.take(); // a primeira visita já termina no paywall; o easy paywall fica pra próxima
    router.replace({ pathname: '/paywall', params: { source: 'onboarding' } });
  };
  const next = () => (i < LAST ? setI(i + 1) : finish());

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <StatusBar style="dark" />
      <View style={styles.top}>
        <View style={styles.dots} accessible accessibilityLabel={`passo ${i + 1} de ${LAST + 1}`}>
          {[0, 1, 2].map((k) => (
            <View key={k} style={[styles.dot, { opacity: k <= i ? 1 : 0.2, width: k === i ? 24 : 8 }]} />
          ))}
        </View>
        <Pressable onPress={finish} hitSlop={12} accessibilityRole="button" style={styles.skip}>
          <Text style={styles.skipText}>pular</Text>
        </Pressable>
      </View>

      <ScrollView key={i} style={{ flex: 1 }} contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {i === 0 && (
          <>
            <View style={styles.center}>
              <Enter from={30}>
                <BangMark size={132} />
              </Enter>
              <Enter delay={150}>
                <Logo size={56} style={{ textAlign: 'center', marginTop: 28 }} />
              </Enter>
              <Enter delay={280}>
                <Body size={18} style={{ textAlign: 'center', marginTop: 14, maxWidth: 300 }}>
                  O jogo de chutar números com a cara mais lavada do mundo.
                </Body>
              </Enter>
            </View>
            <Text style={styles.hint}>(pode cutucar o “!”)</Text>
          </>
        )}

        {i === 1 && (
          <>
            <Enter>
              <Label>como funciona</Label>
              <Title size={40} style={{ marginTop: 6 }}>
                aumenta{'\n'}ou duvida<Text style={{ color: colors.pinkInk }}>!</Text>
              </Title>
            </Enter>
            <Enter delay={100}>
              <Body style={{ marginTop: 10 }}>Chega a pergunta. Cada um, na sua vez, diz um número maior, ou grita “eu duvido!” do último lance.</Body>
            </Enter>
            <View style={styles.demo}>
              <Enter delay={200}>
                <Raised>
                  <View style={{ padding: 16 }}>
                    <Text style={styles.qText}>Quantos dentes tem um gambá?</Text>
                  </View>
                </Raised>
              </Enter>
              <View style={{ gap: 8, marginTop: 6 }}>
                {DEMO_BIDS.map(([who, n], k) => (
                  <After key={who} ms={500 + k * 450}>
                    <Enter from={12}>
                      <View style={[styles.bid, compact && { paddingVertical: 4 }, { alignSelf: k % 2 ? 'flex-end' : 'flex-start' }]}>
                        <Text style={styles.bidWho}>{who}</Text>
                        <Text style={[styles.bidVal, compact && { fontSize: 18 }]}>{n} ou mais</Text>
                      </View>
                    </Enter>
                  </After>
                ))}
                <After ms={500 + 3 * 450 + 200}>
                  <Stamp size={compact ? 24 : 30} style={{ marginTop: 6 }} />
                </After>
              </View>
            </View>
          </>
        )}

        {i === 2 && (
          <>
            <Enter>
              <Label>e aí</Label>
              <Title size={36} style={{ marginTop: 6 }}>
                errou?{'\n'}perde um “!”
              </Title>
            </Enter>
            <Enter delay={100}>
              <Body style={{ marginTop: 10 }}>Revela a resposta. Se o lance passou, quem lançou perde. Se não, perde quem duvidou. O último com “!” ganha.</Body>
            </Enter>
            <Enter delay={200}>
              <View style={styles.livesDemo}>
                <Lives left={2} total={3} size={34} losing />
                <Text style={styles.livesText}>léo blefou: 55 dentes? é 50.</Text>
              </View>
            </Enter>
            <Enter delay={300}>
              <Label color={colors.ink} style={{ marginTop: 26 }}>
                e você, como te chamam?
              </Label>
              <View style={styles.nameRow}>
                <Icon name="users" size={22} accent={colors.yellow} />
                <TextInput
                  value={name}
                  onChangeText={(t) => setName(t.slice(0, 12))}
                  placeholder="teu nome"
                  placeholderTextColor={colors.inkMuted}
                  style={styles.name}
                  autoCapitalize="words"
                  returnKeyType="done"
                  onSubmitEditing={next}
                  accessibilityLabel="teu nome"
                />
              </View>
              <Text style={styles.nameHint}>Vai na roda e nas salas com PIN. Dá pra trocar em Ajustes.</Text>
            </Enter>
          </>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: bottom }]}>
        <Btn label={i === 0 ? 'Bora' : i === LAST ? 'Começar' : 'Saquei'} variant={i === 0 ? 'primary' : 'dark'} disabled={i === LAST && !name.trim()} onPress={next} height={62} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 20, backgroundColor: colors.paper },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 44 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { height: 8, borderRadius: 4, backgroundColor: colors.ink },
  skip: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 4 },
  skipText: { fontFamily: fonts.ui700, fontSize: 15, color: colors.inkSoft },
  body: { flexGrow: 1, paddingTop: 18, paddingBottom: 12 },
  footer: { paddingTop: 10 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hint: { textAlign: 'center', fontFamily: fonts.ui600, fontSize: 14, color: colors.inkMuted, marginBottom: 14 },
  demo: { flex: 1, justifyContent: 'center', gap: 8 },
  qText: { color: colors.ink, fontFamily: fonts.display, fontSize: 21, lineHeight: 25, letterSpacing: -0.5 },
  bid: { flexDirection: 'row', alignItems: 'baseline', gap: 8, backgroundColor: colors.yellow, borderWidth: 2.5, borderColor: colors.ink, borderRadius: 18, paddingHorizontal: 14, paddingVertical: 8 },
  bidWho: { fontFamily: fonts.ui800, fontSize: 13, color: colors.inkSoft, textTransform: 'uppercase', letterSpacing: 1 },
  bidVal: { fontFamily: fonts.display, fontSize: 22, color: colors.ink, letterSpacing: -0.6 },
  livesDemo: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: 20, padding: 14, marginTop: 18 },
  livesText: { flex: 1, fontFamily: fonts.ui700, fontSize: 15, color: colors.ink },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, minHeight: 58, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 2.5, borderColor: colors.ink, paddingHorizontal: 14 },
  name: { flex: 1, color: colors.ink, fontFamily: fonts.ui800, fontSize: 20, minHeight: 54 },
  nameHint: { fontFamily: fonts.ui600, fontSize: 13, color: colors.inkMuted, marginTop: 8 },
});
