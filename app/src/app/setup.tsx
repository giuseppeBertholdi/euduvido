import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Lives } from '@/components/brand';
import { Icon } from '@/components/Icon';
import { Btn, Label, Raised, Title, TopBar, tapLight } from '@/components/ui';
import { createMatch, LIVES_OPTIONS, MAX_PLAYERS, MIN_PLAYERS, TIMER_OPTIONS, type Player } from '@/game/engine';
import { starterFirst } from '@/game/highlights';
import { freshPool } from '@/game/played';
import { offerIfExhausted } from '@/features/paywall/offerExhausted';
import { PACKS } from '@/game/content';
import { analytics } from '@/services/analytics';
import { useApp } from '@/state/app';
import { colors, fonts, radii } from '@/theme';
import { t } from '@/i18n';

const PRO_QUESTIONS = PACKS.filter((p) => p.premium).reduce((n, p) => n + p.questions.length, 0);
const SAMPLE = ['bia', 'léo', 'cacá', 'dudu', 'mari', 'jão', 'lua', 'nico'];
let seq = 0;
const newId = () => `p${Date.now().toString(36)}${(seq++).toString(36)}`;

export default function Setup() {
  const insets = useSafeAreaInsets();
  const app = useApp();
  const [players, setPlayers] = useState<Player[]>(() =>
    app.lastPlayers.length >= MIN_PLAYERS ? app.lastPlayers.map((p) => ({ id: p.id, name: p.name })) : [0, 1, 2].map((i) => ({ id: newId(), name: i === 0 ? app.name : '' })),
  );
  const [lives, setLives] = useState(app.lives);
  const [timer, setTimer] = useState<number | null>(app.timer);
  const [packs, setPacks] = useState<string[]>(() => app.packs.filter((id) => app.premium || !PACKS.find((p) => p.id === id)?.premium));

  const named = players.map((p) => ({ ...p, name: p.name.trim() })).filter((p) => p.name.length > 0);
  const pool = PACKS.filter((p) => packs.includes(p.id)).flatMap((p) => p.questions);
  const ready = named.length >= MIN_PLAYERS && pool.length > 0;
  const fresh = freshPool(pool, app.played, app.avoidRepeats);
  const playedHere = pool.length - fresh.fresh;

  const rename = (id: string, name: string) => setPlayers((ps) => ps.map((p) => (p.id === id ? { ...p, name } : p)));

  const togglePack = (id: string, premium: boolean) => {
    tapLight();
    if (premium && !app.premium) return router.push(`/pack/${id}`);
    setPacks((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  const start = () => {
    app.set({ lastPlayers: named, lives, timer, packs });
    const m = createMatch({ players: named, pool: fresh.pool, lives, turnSeconds: timer, rng: Math.random });
    const deck = starterFirst(m.deck, app.played);
    app.setMatch({ ...m, deck, question: deck[0] });
    analytics.track('match_started', { mode: 'local', rematch: false, players: named.length, lives, timer, packs, fresh: fresh.fresh, recycled: fresh.recycled });
    router.replace('/game');
    const offeredAt = offerIfExhausted({ premium: app.premium, pool, played: app.played, lastOfferAt: app.exhaustedOfferAt }, 'setup');
    if (offeredAt) app.set({ exhaustedOfferAt: offeredAt });
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insets.top + 6, paddingHorizontal: 20 }}>
        <TopBar onBack={() => router.back()} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Label>{t('um celular · passa de mão em mão')}</Label>
        <Title size={42} style={{ marginTop: 6 }}>
          {t('quem tá\nna roda?')}
        </Title>
        <Text style={styles.sub}>{t('Na ordem em que vocês tão sentados: o celular gira assim.')}</Text>

        <View style={{ gap: 10, marginTop: 16 }}>
          {players.map((p, i) => (
            <View key={p.id} style={styles.row}>
              <View style={styles.idx}>
                <Text style={styles.idxText}>{i + 1}</Text>
              </View>
              <TextInput
                value={p.name}
                onChangeText={(name) => rename(p.id, name.slice(0, 12))}
                placeholder={SAMPLE[i] ?? t('nome')}
                placeholderTextColor={colors.inkMuted}
                style={styles.input}
                autoCapitalize="words"
                returnKeyType="next"
                accessibilityLabel={t('nome do jogador {n}', { n: i + 1 })}
              />
              {players.length > MIN_PLAYERS && (
                <Pressable onPress={() => setPlayers((ps) => ps.filter((x) => x.id !== p.id))} hitSlop={8} style={styles.remove} accessibilityRole="button" accessibilityLabel={t('remover jogador {n}', { n: i + 1 })}>
                  <Icon name="close" size={18} color={colors.inkSoft} />
                </Pressable>
              )}
            </View>
          ))}
          {players.length < MAX_PLAYERS && (
            <Pressable onPress={() => setPlayers((ps) => [...ps, { id: newId(), name: '' }])} style={({ pressed }) => [styles.add, pressed && { backgroundColor: colors.sunk }]} accessibilityRole="button">
              <Icon name="users" size={22} accent={colors.yellow} />
              <Text style={styles.addText}>{t('mais gente')}</Text>
            </Pressable>
          )}
        </View>

        <Label color={colors.ink} style={{ marginTop: 28 }}>
          {t('vidas de cada um')}
        </Label>
        <View style={styles.seg}>
          {LIVES_OPTIONS.map((n) => (
            <Raised key={n} onPress={() => setLives(n)} face={lives === n ? colors.yellow : colors.surface} radius={radii.key} lift={3} style={{ flex: 1 }} accessibilityLabel={t('{n} vidas', { n })} accessibilityState={{ selected: lives === n }}>
              <View style={styles.segItem}>
                <Lives left={n} total={n} size={18} />
                <Text style={styles.segText}>{n === 2 ? t('rapidinho') : n === 3 ? t('normal') : t('longo')}</Text>
              </View>
            </Raised>
          ))}
        </View>

        <Label color={colors.ink} style={{ marginTop: 28 }}>
          {t('tempo por vez')}
        </Label>
        <View style={styles.seg}>
          {TIMER_OPTIONS.map((s) => (
            <Raised key={String(s)} onPress={() => setTimer(s)} face={timer === s ? colors.yellow : colors.surface} radius={radii.key} lift={3} style={{ flex: 1 }} accessibilityLabel={s ? t('{n} segundos por vez', { n: s }) : t('sem timer')} accessibilityState={{ selected: timer === s }}>
              <View style={styles.segItem}>
                <Icon name="timer" size={20} accent={timer === s ? colors.surface : s ? colors.yellow : 'none'} />
                <Text style={styles.segText}>{s ? `${s}s` : t('sem')}</Text>
              </View>
            </Raised>
          ))}
        </View>

        <Label color={colors.ink} style={{ marginTop: 28 }}>
          {t('pacotes')}
        </Label>
        <View style={styles.packs}>
          {PACKS.map((p) => {
            const on = packs.includes(p.id);
            const locked = p.premium && !app.premium;
            return (
              <Raised
                key={p.id}
                onPress={() => togglePack(p.id, p.premium)}
                face={on ? p.tint : colors.surface}
                plate={on ? colors.ink : colors.line}
                border={on ? colors.ink : colors.line}
                lift={3}
                accessibilityLabel={`${p.title}, ${t('{n} perguntas', { n: p.questions.length })}${locked ? t(', bloqueado, recurso do pro') : ''}`}
                accessibilityState={{ checked: on }}
              >
                <View style={styles.pack}>
                  <View style={styles.packIcon}>
                    <Icon name={p.icon} size={24} accent={on ? colors.surface : p.tint} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.packTitle}>{p.title}</Text>
                    <Text style={styles.packSub}>
                      {t('{n} perguntas', { n: p.questions.length })} · {p.tagline}
                    </Text>
                  </View>
                  {locked ? (
                    <Icon name="lock" size={22} accent={colors.yellow} />
                  ) : (
                    <View style={[styles.check, on && { backgroundColor: colors.ink }]}>{on && <Icon name="check" size={16} color={colors.yellow} strokeWidth={3} />}</View>
                  )}
                </View>
              </Raised>
            );
          })}
        </View>
        <View style={styles.repeat}>
          <View style={{ flex: 1 }}>
            <Text style={styles.repeatTitle}>{t('Pular perguntas que já saíram')}</Text>
            <Text style={[styles.repeatText, app.avoidRepeats && fresh.recycled && { color: colors.pinkInk }]}>
              {!app.avoidRepeats
                ? t('desligado: pode repetir pergunta')
                : fresh.recycled
                  ? t('as novas acabaram nesses pacotes: vai repetir')
                  : t('{fresh} novas de {total} nesses pacotes', { fresh: fresh.fresh, total: pool.length })}
            </Text>
            {!app.premium && app.avoidRepeats && fresh.recycled && (
              <Pressable onPress={() => router.push({ pathname: '/paywall', params: { source: 'exhausted' } })} hitSlop={8} accessibilityRole="button" style={{ marginTop: 4 }}>
                <Text style={styles.unlock}>{t('liberar +{n} perguntas novas', { n: PRO_QUESTIONS })}</Text>
              </Pressable>
            )}
          </View>
          <Switch
            value={app.avoidRepeats}
            onValueChange={(v) => app.set({ avoidRepeats: v })}
            trackColor={{ true: colors.ink, false: colors.line }}
            thumbColor={app.avoidRepeats ? colors.yellow : colors.surface}
            ios_backgroundColor={colors.line}
            accessibilityLabel={t('pular perguntas que já saíram')}
          />
        </View>
        {playedHere > 0 && (
          <Pressable
            onPress={() =>
              Alert.alert(t('Zerar perguntas jogadas?'), t('Todas voltam a contar como novas neste celular.'), [
                { text: t('Cancelar'), style: 'cancel' },
                { text: t('Zerar'), style: 'destructive', onPress: () => app.set({ played: [] }) },
              ])
            }
            hitSlop={8}
            style={styles.resetBtn}
            accessibilityRole="button"
          >
            <Text style={styles.reset}>{t('zerar as {n} já jogadas', { n: app.played.length })}</Text>
          </Pressable>
        )}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        <Btn label={ready ? t('Começar com {n}', { n: named.length }) : t('Bota pelo menos {n} nomes', { n: MIN_PLAYERS })} right={ready ? 'arrowRight' : null} disabled={!ready} onPress={start} height={62} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 8 },
  sub: { fontFamily: fonts.ui600, fontSize: 15, color: colors.inkSoft, marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 58, borderRadius: radii.button, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, paddingHorizontal: 10 },
  idx: { width: 32, height: 32, borderRadius: 11, backgroundColor: colors.sunk, alignItems: 'center', justifyContent: 'center' },
  idxText: { color: colors.ink, fontFamily: fonts.display, fontSize: 15 },
  input: { flex: 1, color: colors.ink, fontFamily: fonts.ui800, fontSize: 19, minHeight: 50 },
  remove: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  add: { flexDirection: 'row', gap: 8, minHeight: 54, borderRadius: radii.button, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.inkMuted, alignItems: 'center', justifyContent: 'center' },
  addText: { color: colors.ink, fontFamily: fonts.ui800, fontSize: 16 },
  seg: { flexDirection: 'row', gap: 10, marginTop: 10 },
  segItem: { alignItems: 'center', gap: 6, paddingVertical: 12 },
  segText: { color: colors.ink, fontFamily: fonts.ui800, fontSize: 13 },
  packs: { gap: 10, marginTop: 10 },
  pack: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  packIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  packTitle: { color: colors.ink, fontFamily: fonts.display, fontSize: 18, letterSpacing: -0.4 },
  packSub: { color: colors.inkSoft, fontFamily: fonts.ui600, fontSize: 13, marginTop: 1 },
  check: { width: 28, height: 28, borderRadius: 9, borderWidth: 2.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  repeat: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 18, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: radii.button, padding: 14 },
  repeatTitle: { fontFamily: fonts.ui800, fontSize: 16, color: colors.ink },
  repeatText: { fontFamily: fonts.ui600, fontSize: 13, color: colors.inkSoft, marginTop: 2 },
  unlock: { fontFamily: fonts.ui800, fontSize: 14, color: colors.ink, textDecorationLine: 'underline' },
  resetBtn: { alignSelf: 'center', minHeight: 40, justifyContent: 'center' },
  reset: { fontFamily: fonts.ui700, fontSize: 14, color: colors.ink, textDecorationLine: 'underline' },
  footer: { paddingHorizontal: 20, paddingTop: 10, backgroundColor: colors.paper, borderTopWidth: 2, borderColor: colors.line },
});
