import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CountUp } from '@/components/brand';
import { Icon } from '@/components/Icon';
import { Enter } from '@/components/motion';
import { Btn, Label, Raised, Title, TopBar } from '@/components/ui';
import { links } from '@/config/links';
import { bidText, DAILY_SIZE, dailyFinished, dailyNumber, dailyRounds, dailyShareText, dailyStreak, type DailyPick } from '@/game/daily';
import { packById } from '@/game/questions';
import { analytics } from '@/services/analytics';
import { askReminderPermission, rescheduleReminders } from '@/services/engagement/reminders';
import { haptic } from '@/services/haptics';
import { playSound } from '@/services/sound';
import { useApp } from '@/state/app';
import { colors, fonts, maxScale, radii } from '@/theme';

/**
 * Desafio do dia: 5 perguntas, um lance da galera em cada, e a pessoa decide ACREDITO ou EU DUVIDO!
 * Cada resposta fica salva na hora (sair no meio não deixa refazer), e o resultado vira uma grade pra compartilhar.
 */
export default function Daily() {
  const insets = useSafeAreaInsets();
  const app = useApp();
  // o número fica fixo enquanto a tela está aberta (virar meia-noite no meio não troca as perguntas)
  const [n] = useState(() => dailyNumber(new Date()));
  const rounds = useMemo(() => dailyRounds(n), [n]);
  const results = app.daily[String(n)] ?? [];
  const [revealing, setRevealing] = useState<DailyPick | null>(null);
  const index = revealing ? results.length - 1 : results.length;
  const done = results.length >= DAILY_SIZE && !revealing;
  const streak = dailyStreak(dailyFinished(app.daily), n);

  const answer = (pick: DailyPick) => {
    const r = rounds[index];
    const ok = pick === r.correct;
    const next = [...results, ok];
    // guarda só os últimos 120 desafios
    const kept = Object.fromEntries(Object.entries({ ...app.daily, [String(n)]: next }).sort(([a], [b]) => Number(b) - Number(a)).slice(0, 120));
    app.set({ daily: kept });
    app.markPlayed(r.question.id);
    if (pick === 'doubt') playSound('duvido');
    if (ok) haptic.success();
    else {
      haptic.warning();
      playSound('trombone');
    }
    if (index === 0) analytics.track('daily_started', { day: n });
    if (next.length === DAILY_SIZE) {
      const finished = dailyStreak([...dailyFinished(app.daily), n], n);
      analytics.track('daily_finished', { day: n, score: next.filter(Boolean).length, streak: finished });
    }
    setRevealing(pick);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 6, paddingBottom: insets.bottom + 14 }]}>
      <StatusBar style="dark" />
      <TopBar onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
      <View style={styles.head}>
        <Label color={colors.ink}>desafio do dia #{n}</Label>
        <Dots results={results} current={done ? -1 : index} />
      </View>
      {done ? (
        <Result n={n} results={results} streak={streak} rounds={rounds} />
      ) : revealing ? (
        <Reveal key={index} round={rounds[index]} pick={revealing} last={index === DAILY_SIZE - 1} onNext={() => setRevealing(null)} />
      ) : (
        <Ask key={index} round={rounds[index]} onPick={answer} />
      )}
    </View>
  );
}

function Dots({ results, current }: { results: boolean[]; current: number }) {
  return (
    <View style={styles.dots} accessibilityLabel={`${results.length} de ${DAILY_SIZE} respondidas`}>
      {Array.from({ length: DAILY_SIZE }, (_, i) => (
        <View key={i} style={[styles.dot, i === current && i >= results.length && styles.dotNow, i < results.length && { backgroundColor: results[i] ? colors.yellow : colors.pink }]} />
      ))}
    </View>
  );
}

type Round = ReturnType<typeof dailyRounds>[number];

function QuestionCard({ round }: { round: Round }) {
  return (
    <View style={styles.card}>
      <Text style={styles.pack}>{packById(round.packId)?.title ?? ''}</Text>
      <Text style={styles.question} maxFontSizeMultiplier={maxScale.ui}>
        {round.question.text}
      </Text>
    </View>
  );
}

function Ask({ round, onPick }: { round: Round; onPick: (p: DailyPick) => void }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 14, paddingTop: 12 }} showsVerticalScrollIndicator={false}>
      <Enter>
        <QuestionCard round={round} />
      </Enter>
      <Enter delay={120}>
        <View style={styles.bid}>
          <Text style={styles.bidLabel}>a galera diz</Text>
          <Text style={styles.bidValue} maxFontSizeMultiplier={maxScale.display} adjustsFontSizeToFit numberOfLines={2}>
            {bidText(round)}
          </Text>
        </View>
      </Enter>
      <View style={{ flex: 1 }} />
      <Text style={styles.hint}>A resposta é isso ou mais? Se acha que é menos, duvida.</Text>
      <View style={{ gap: 10 }}>
        <Btn label="Acredito" right="check" onPress={() => onPick('believe')} />
        <Btn label="EU DUVIDO!" variant="pink" right={null} onPress={() => onPick('doubt')} />
      </View>
    </ScrollView>
  );
}

function Reveal({ round, pick, last, onNext }: { round: Round; pick: DailyPick; last: boolean; onNext: () => void }) {
  const ok = pick === round.correct;
  const [counted, setCounted] = useState(false);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, gap: 14, paddingTop: 12 }} showsVerticalScrollIndicator={false}>
      <QuestionCard round={round} />
      <View style={[styles.verdict, { backgroundColor: ok ? colors.greenSoft : colors.pinkSoft }]} accessibilityLiveRegion="polite">
        <Text style={styles.verdictTitle}>{ok ? (pick === 'doubt' ? 'Duvidou e acertou!' : 'Acreditou e acertou!') : pick === 'doubt' ? 'Duvidou à toa.' : 'Caiu no lance.'}</Text>
        <Text style={styles.verdictSub}>a galera disse {bidText(round)}</Text>
      </View>
      <View style={styles.answer}>
        <Text style={styles.bidLabel}>a resposta é</Text>
        <View style={styles.answerRow}>
          <CountUp to={round.question.answer} unit={round.question.unit} style={styles.answerValue} onDone={() => setCounted(true)} />
          {round.question.unit !== 'ano' && <Text style={styles.answerUnit}>{round.question.unit}</Text>}
        </View>
        {counted && round.question.fact && (
          <Enter>
            <Text style={styles.fact}>{round.question.fact}</Text>
          </Enter>
        )}
      </View>
      <View style={{ flex: 1 }} />
      <Btn label={last ? 'Ver resultado' : 'Próxima'} onPress={onNext} />
    </ScrollView>
  );
}

/** Tempo até a meia-noite (o próximo desafio). */
function untilTomorrow(now = new Date()): string {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  const min = Math.max(0, Math.round((next.getTime() - now.getTime()) / 60000));
  const h = Math.floor(min / 60);
  return h > 0 ? `${h} h ${min % 60} min` : `${min} min`;
}

function Result({ n, results, streak, rounds }: { n: number; results: boolean[]; streak: number; rounds: Round[] }) {
  const app = useApp();
  const hits = results.filter(Boolean).length;
  const [left, setLeft] = useState(untilTomorrow);
  useEffect(() => {
    const t = setInterval(() => setLeft(untilTomorrow()), 30_000);
    return () => clearInterval(t);
  }, []);
  const share = () => {
    analytics.track('daily_shared', { day: n, score: hits, streak });
    void Share.share({ message: dailyShareText(n, results, streak, links.appStore) });
  };
  const packs = [...new Set(rounds.map((r) => r.packId))].filter((id) => packById(id)?.premium).map((id) => packById(id)?.title);

  return (
    <ScrollView contentContainerStyle={{ gap: 14, paddingTop: 12, paddingBottom: 8 }} showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Enter>
          <Title size={64} style={{ textAlign: 'center' }}>
            {hits}/{DAILY_SIZE}
          </Title>
        </Enter>
        <Text style={styles.resultLine}>{hits === DAILY_SIZE ? 'Ninguém te engana.' : hits >= 3 ? 'Faro bom pra blefe.' : 'A galera te enrolou hoje.'}</Text>
        <View style={styles.grid}>
          {results.map((ok, i) => (
            <View key={i} style={[styles.square, { backgroundColor: ok ? colors.yellow : colors.pink }]} />
          ))}
        </View>
        {streak >= 1 && <Text style={styles.streak}>🔥 {streak} {streak === 1 ? 'dia' : 'dias seguidos'}</Text>}
        <Text style={styles.next}>próximo desafio em {left}</Text>
      </View>

      <Btn label="Compartilhar resultado" icon="share" right={null} onPress={share} />
      {!app.remindersOn && <TomorrowAsk />}

      {!app.premium && packs.length > 0 ? (
        <Raised onPress={() => router.push({ pathname: '/paywall', params: { source: 'daily' } })} face={colors.pinkSoft} accessibilityLabel="Conhecer os pacotes pro">
          <View style={styles.upsell}>
            <Icon name="sparkle" size={28} accent={colors.yellow} />
            <View style={{ flex: 1 }}>
              <Text style={styles.upsellTitle}>Curtiu? Hoje caiu {packs.join(', ')}.</Text>
              <Text style={styles.upsellText}>São pacotes do pro: centenas de perguntas assim pra jogar com a galera.</Text>
            </View>
          </View>
        </Raised>
      ) : (
        <Btn label="Jogar com a galera" variant="secondary" onPress={() => router.replace('/setup')} />
      )}
      <Btn label="Voltar pro início" variant="secondary" right={null} height={54} onPress={() => router.replace('/')} />
    </ScrollView>
  );
}

/** O melhor momento pra pedir notificação: acabou de jogar e quer o de amanhã. */
function TomorrowAsk() {
  const app = useApp();
  const [busy, setBusy] = useState(false);
  const yes = async () => {
    setBusy(true);
    const granted = await askReminderPermission();
    app.set({ remindersAsked: true, remindersOn: granted });
    analytics.track('reminders_answered', { wanted: true, granted, source: 'daily' });
    await rescheduleReminders(granted, true);
    setBusy(false);
  };
  return (
    <View style={styles.ask}>
      <Icon name="timer" size={28} accent={colors.yellow} />
      <View style={{ flex: 1, gap: 8 }}>
        <Text style={styles.upsellTitle}>Te aviso quando sair o de amanhã?</Text>
        <Text style={styles.upsellText}>Um aviso ao meio-dia, com a primeira pergunta. Para sozinho se você parar de jogar.</Text>
        <Pressable onPress={yes} disabled={busy} style={({ pressed }) => [styles.askBtn, pressed && { opacity: 0.8 }]} accessibilityRole="button">
          {busy ? <ActivityIndicator color={colors.ink} /> : <Text style={styles.askText}>me avisa</Text>}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: 20 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 22, height: 10, borderRadius: 5, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.surface },
  dotNow: { backgroundColor: colors.sunk, transform: [{ scaleY: 1.3 }] },
  card: { backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink, borderRadius: radii.card, padding: 18, gap: 8 },
  pack: { fontFamily: fonts.ui800, fontSize: 12, letterSpacing: 0.5, color: colors.pinkInk, textTransform: 'uppercase' },
  question: { fontFamily: fonts.ui800, fontSize: 22, lineHeight: 28, color: colors.ink },
  bid: { backgroundColor: colors.yellow, borderWidth: 2, borderColor: colors.ink, borderRadius: radii.card, padding: 18, gap: 4 },
  bidLabel: { fontFamily: fonts.ui800, fontSize: 13, letterSpacing: 0.5, color: colors.ink, textTransform: 'uppercase' },
  bidValue: { fontFamily: fonts.display, fontSize: 34, lineHeight: 38, letterSpacing: -1, color: colors.ink },
  hint: { fontFamily: fonts.ui600, fontSize: 14, color: colors.inkMuted, textAlign: 'center' },
  verdict: { borderWidth: 2, borderColor: colors.ink, borderRadius: radii.card, padding: 14, gap: 2 },
  verdictTitle: { fontFamily: fonts.ui800, fontSize: 20, color: colors.ink },
  verdictSub: { fontFamily: fonts.ui600, fontSize: 14, color: colors.inkSoft },
  answer: { gap: 6, paddingHorizontal: 4 },
  answerRow: { flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', columnGap: 8 },
  answerValue: { fontFamily: fonts.display, fontSize: 44, lineHeight: 48, letterSpacing: -1.5, color: colors.ink },
  answerUnit: { fontFamily: fonts.ui800, fontSize: 20, color: colors.ink },
  fact: { fontFamily: fonts.ui600, fontSize: 16, lineHeight: 22, color: colors.inkSoft },
  resultLine: { fontFamily: fonts.ui800, fontSize: 18, color: colors.ink },
  grid: { flexDirection: 'row', gap: 8, marginTop: 4 },
  square: { width: 40, height: 40, borderRadius: 10, borderWidth: 2, borderColor: colors.ink },
  streak: { fontFamily: fonts.ui800, fontSize: 17, color: colors.ink, marginTop: 4 },
  next: { fontFamily: fonts.ui600, fontSize: 14, color: colors.inkMuted },
  upsell: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  upsellTitle: { fontFamily: fonts.ui800, fontSize: 16, lineHeight: 20, color: colors.ink },
  upsellText: { fontFamily: fonts.ui600, fontSize: 14, lineHeight: 18, color: colors.inkSoft },
  ask: { flexDirection: 'row', gap: 12, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.ink, borderRadius: radii.card, padding: 14 },
  askBtn: { alignSelf: 'flex-start', minHeight: 40, paddingHorizontal: 16, borderRadius: 999, justifyContent: 'center', backgroundColor: colors.yellow, borderWidth: 2, borderColor: colors.ink },
  askText: { fontFamily: fonts.ui800, fontSize: 14, color: colors.ink },
});
