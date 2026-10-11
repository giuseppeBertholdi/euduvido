import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Enter } from '@/components/motion';
import { Btn, Chip, Raised, Title, TopBar, tapLight } from '@/components/ui';
import { formatValue } from '@/game/engine';
import { packById } from '@/game/questions';
import { useApp } from '@/state/app';
import { colors, fonts, radii } from '@/theme';

/** Quantas perguntas de um pacote bloqueado dá pra espiar antes de assinar. */
const PREVIEW = 3;

export default function PackDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pack = packById(id ?? '');
  const app = useApp();
  const insets = useSafeAreaInsets();
  const [answers, setAnswers] = useState(false);
  if (!pack) return <Redirect href="/" />;
  if (pack.adult && !app.adultOk)
    return (
      <View style={[styles.root, { paddingTop: insets.top + 6, paddingHorizontal: 20, paddingBottom: insets.bottom + 14 }]}>
        <TopBar onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <Icon name={pack.icon} size={64} accent={pack.tint} />
          <Title size={34} style={{ textAlign: 'center' }}>
            {pack.title}
          </Title>
          <Text style={[styles.tagline, { textAlign: 'center' }]}>Perguntas picantes, com humor de adulto. Só pra maiores de 18.</Text>
        </View>
        <Btn label="Tenho 18 anos ou mais" right={null} onPress={() => app.set({ adultOk: true })} />
      </View>
    );

  const locked = pack.premium && !app.premium;
  const visible = locked ? pack.questions.slice(0, PREVIEW) : pack.questions;
  const hidden = locked ? pack.questions.length - PREVIEW : 0;

  const play = () => {
    app.set({ packs: [pack.id] });
    router.push('/setup');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6 }]}>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: 20 }}>
        <TopBar
          onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          right={
            !locked ? (
              <Pressable
                onPress={() => {
                  tapLight();
                  if (answers) return setAnswers(false);
                  // spoiler: confirma antes, e oferece tirar essas perguntas das próximas partidas
                  Alert.alert('Ver as respostas?', `Spoiler das ${pack.questions.length} perguntas de “${pack.title}”. Quem vê a resposta não consegue blefar direito depois.`, [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                      text: 'Ver e não sortear mais',
                      onPress: () => {
                        pack.questions.forEach((q) => app.markPlayed(q.id));
                        if (!app.avoidRepeats) app.set({ avoidRepeats: true });
                        setAnswers(true);
                      },
                    },
                    { text: 'Só ver', style: 'destructive', onPress: () => setAnswers(true) },
                  ]);
                }}
                style={[styles.toggle, answers && { backgroundColor: colors.ink }]}
                accessibilityRole="switch"
                accessibilityState={{ checked: answers }}
                accessibilityLabel="mostrar respostas"
              >
                <Icon name="eye" size={18} color={answers ? colors.yellow : colors.ink} accent="none" />
                <Text style={[styles.toggleText, answers && { color: colors.yellow }]}>{answers ? 'esconder respostas' : 'mostrar respostas'}</Text>
              </Pressable>
            ) : undefined
          }
        />
      </View>
      <FlatList
        data={visible}
        keyExtractor={(q) => q.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 130, gap: 10 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Enter>
            <View style={styles.head}>
              <Raised face={pack.tint} radius={22} lift={3}>
                <View style={styles.headIcon}>
                  <Icon name={pack.icon} size={40} accent={colors.surface} />
                </View>
              </Raised>
              <View style={{ flex: 1 }}>
                <Title size={32}>{pack.title}</Title>
                <Text style={styles.tagline}>{pack.tagline}</Text>
                <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
                  <Chip label={`${pack.questions.length} perguntas`} bg={colors.sunk} />
                  {pack.premium ? <Chip label="pro" icon="crown" bg={colors.ink} fg={colors.yellow} /> : <Chip label="grátis" bg={colors.greenSoft} />}
                </View>
              </View>
            </View>
          </Enter>
        }
        renderItem={({ item, index }) => (
          <Enter delay={Math.min(index, 8) * 40} from={10}>
            <View style={styles.q}>
              <Text style={styles.qNum}>{String(index + 1).padStart(2, '0')}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.qText}>{item.text}</Text>
                {answers && !locked ? (
                  <>
                    <Text style={styles.qAnswer}>
                      {formatValue(item.answer, item.unit)} {item.unit}
                    </Text>
                    {item.source && <Text style={styles.qUnit}>fonte: {item.source}</Text>}
                  </>
                ) : (
                  <Text style={styles.qUnit}>resposta em {item.unit}</Text>
                )}
              </View>
            </View>
          </Enter>
        )}
        ListFooterComponent={
          locked ? (
            <View style={{ marginTop: 4, gap: 10 }} accessible accessibilityLabel={`mais ${hidden} perguntas bloqueadas`}>
              {Array.from({ length: Math.min(hidden, 4) }, (_, i) => (
                <View key={i} style={[styles.q, { opacity: 1 - i * 0.2 }]}>
                  <Text style={styles.qNum}>{String(PREVIEW + i + 1).padStart(2, '0')}</Text>
                  <View style={{ flex: 1, gap: 6 }}>
                    <View style={[styles.bar, { width: `${88 - i * 9}%` }]} />
                    <View style={[styles.bar, { width: `${52 + i * 6}%` }]} />
                  </View>
                  <Icon name="lock" size={20} accent={colors.yellow} />
                </View>
              ))}
              <Text style={styles.more}>+ {hidden} perguntas no pro</Text>
            </View>
          ) : null
        }
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        {locked ? (
          <Btn label="Liberar com o pro" icon="crown" right={null} onPress={() => router.push({ pathname: '/paywall', params: { source: pack.id === 'absurdos-br' ? 'pack' : 'browse' } })} />
        ) : (
          <Btn label="Jogar com esse pacote" icon="passPhones" right={null} variant="dark" onPress={play} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 38, paddingHorizontal: 12, borderRadius: 999, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.surface },
  toggleText: { fontFamily: fonts.ui800, fontSize: 13, color: colors.ink },
  head: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 10, marginBottom: 14 },
  headIcon: { width: 82, height: 82, alignItems: 'center', justifyContent: 'center' },
  tagline: { fontFamily: fonts.ui600, fontSize: 15, color: colors.inkSoft, marginTop: 2 },
  q: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: radii.button, padding: 14 },
  qNum: { fontFamily: fonts.display, fontSize: 14, color: colors.pinkInk, width: 32 },
  qText: { fontFamily: fonts.ui700, fontSize: 16, lineHeight: 21, color: colors.ink },
  qUnit: { fontFamily: fonts.ui600, fontSize: 13, color: colors.inkMuted, marginTop: 3 },
  qAnswer: { alignSelf: 'flex-start', fontFamily: fonts.display, fontSize: 15, color: colors.ink, backgroundColor: colors.yellow, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginTop: 5, overflow: 'hidden' },
  bar: { height: 12, borderRadius: 6, backgroundColor: colors.sunk },
  more: { fontFamily: fonts.ui800, fontSize: 15, color: colors.inkSoft, textAlign: 'center', marginTop: 6 },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 12, backgroundColor: colors.paper, borderTopWidth: 2, borderColor: colors.line },
});
