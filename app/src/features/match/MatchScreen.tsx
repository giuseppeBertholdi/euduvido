import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BangMark, CountUp, Lives, Stamp } from '@/components/brand';
import { Icon } from '@/components/Icon';
import { Keypad } from '@/components/Keypad';
import { MAX_DIGITS } from '@/components/keypadRules';
import { Enter } from '@/components/motion';
import { ShareCard, shareCard } from '@/components/ShareCard';
import { TurnTimer } from '@/components/TurnTimer';
import { Body, Btn, Chip, Label, Raised, Title } from '@/components/ui';
import { formatDigits, formatValue, isActive, lastBid, minBid, playerById, standings, type Action, type PublicMatch } from '@/game/engine';
import { PACKS, packTitleOf } from '@/game/content';
import { haptic } from '@/services/haptics';
import { shareApp } from '@/services/invite';
import { useRoundAnalytics } from '@/features/match/useRoundAnalytics';
import { playSound } from '@/services/sound';
import { colors, fonts, radii } from '@/theme';
import { t } from '@/i18n';

/**
 * A partida, igual no modo local e no online.
 *  - `me = null`: partida local, um celular só, todo mundo joga por aqui.
 *  - `me = id`: online; só quem tem a vez vê os botões, os outros acompanham ao vivo.
 */
export type MatchScreenProps = {
  m: PublicMatch;
  me: string | null;
  hostId?: string;
  busy?: boolean;
  error?: string | null;
  now: () => number;
  onAction: (a: Action) => void;
  onQuit: () => void;
  /** null: revanche nas mãos de outra pessoa (online, só o host chama). */
  onRematch: (() => void) | null;
  onHome: () => void;
  showUpsell?: boolean;
  onUpsell?: () => void;
  /** Conteúdo extra no fim da partida (ex.: convite pros lembretes). */
  endExtra?: ReactNode;
  /** Barra de zoeira (só no online), mostrada na vez, no resultado e no fim. */
  zoeira?: ReactNode;
  /** Chamado quando uma pergunta aparece (pra lembrar que já saiu). */
  onSeen?: (questionId: string) => void;
};

export function MatchScreen(props: MatchScreenProps) {
  const { m } = props;
  useRoundAnalytics(m, props.me, props.hostId);
  switch (m.phase) {
    case 'intro':
      return <Intro key={m.round} {...props} />;
    case 'turn':
      return <Turn {...props} />;
    case 'result':
      return <Result key={m.round} {...props} />;
    case 'end':
      return <End {...props} />;
  }
}

const nameOf = (m: PublicMatch, id: string | null | undefined) => (id ? playerById(m, id).name : '');

function Quit({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('sair da partida')} style={({ pressed }) => [styles.quit, pressed && { backgroundColor: colors.sunk }]}>
      <Icon name="close" size={16} accent="none" strokeWidth={2.6} />
      <Text style={styles.quitText}>{t('sair')}</Text>
    </Pressable>
  );
}

function ErrorLine({ error }: { error?: string | null }) {
  if (!error) return null;
  return (
    <Text style={styles.error} accessibilityLiveRegion="polite">
      {error}
    </Text>
  );
}

/** Placar de vidas da roda: quem joga agora em destaque, quem saiu apagado, "você" marcado no online. */
function Board({ m, current, losingId, me }: { m: PublicMatch; current?: string; losingId?: string; me: string | null }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.board} style={{ flexGrow: 0, marginHorizontal: -20 }}>
      {m.players.map((p) => {
        const alive = isActive(m, p.id) || p.id === losingId;
        const now = p.id === current;
        return (
          <View key={p.id} style={[styles.seat, now && styles.seatNow, !alive && { opacity: 0.4 }]}>
            <Text style={[styles.seatName, !alive && { textDecorationLine: 'line-through' }]} numberOfLines={1}>
              {p.name}
              {me === p.id ? t(' (você)') : ''}
            </Text>
            <Lives left={m.lives[p.id]} total={m.startLives} size={16} losing={p.id === losingId} />
          </View>
        );
      })}
    </ScrollView>
  );
}

function Waiting({ text }: { text: string }) {
  return (
    <View style={styles.waiting} accessibilityLiveRegion="polite">
      <ActivityIndicator color={colors.ink} />
      <Text style={styles.waitingText}>{text}</Text>
    </View>
  );
}

/* ---------- abertura da rodada: todo mundo lê a pergunta ---------- */
function Intro({ m, me, hostId, busy, error, onAction, onQuit, onSeen }: MatchScreenProps) {
  const insets = useSafeAreaInsets();
  useEffect(() => {
    onSeen?.(m.question.id);
  }, [m.question.id, onSeen]);
  const opener = nameOf(m, m.openerId);
  const canStart = me === null || me === m.openerId || me === hostId;
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 14 }]}>
      <StatusBar style="dark" />
      <View style={styles.rowBetween}>
        <Label color={colors.ink}>{t('rodada {n}', { n: m.round })}</Label>
        <Quit onPress={onQuit} />
      </View>
      <Board m={m} current={m.openerId} me={me} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Enter>
          <Chip label={packTitleOf(m.question.id)} bg={colors.pink} style={{ alignSelf: 'flex-start', marginBottom: 14 }} />
        </Enter>
        <Enter delay={90}>
          <Text style={styles.bigQuestion} maxFontSizeMultiplier={1.2} accessibilityRole="header">
            {m.question.text}
          </Text>
        </Enter>
        <Enter delay={200}>
          <Text style={styles.unitHint}>
            {t('responde em')} <Text style={{ color: colors.pinkInk }}>{m.question.unit}</Text>
            {m.turnSeconds ? ` · ${t('{n}s por vez', { n: m.turnSeconds })}` : ''}
          </Text>
        </Enter>
      </View>
      <Enter delay={320}>
        <View style={styles.tip}>
          <Icon name="megaphone" size={22} accent={colors.yellow} />
          <Text style={styles.tipText}>{t('Cada lance diz “é isso ou mais”. Aumenta ou duvida. Errou, perde um “!”.')}</Text>
        </View>
        <ErrorLine error={error} />
        {canStart ? (
          <Btn label={me === m.openerId ? t('Você começa') : t('{name} começa', { name: opener })} disabled={busy} onPress={() => onAction({ type: 'START_TURN' })} />
        ) : (
          <Waiting text={t('esperando {name} começar…', { name: opener })} />
        )}
      </Enter>
    </View>
  );
}

/* ---------- a vez: aumenta ou duvida ---------- */
function Turn({ m, me, hostId, busy, error, now, onAction, onQuit, zoeira }: MatchScreenProps) {
  const insets = useSafeAreaInsets();
  const [bidding, setBidding] = useState(false);
  const mine = me === null || me === m.turnId;
  const bid = lastBid(m);
  const q = m.question;
  // online: quem tem a vez (ou o host, se a pessoa sumiu) avisa o servidor quando o tempo acaba
  const canExpire = me === null || me === m.turnId || me === hostId;
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 14 }]}>
      <StatusBar style="dark" />
      <View style={styles.rowBetween}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Chip label={t('rodada {n}', { n: m.round })} bg={colors.ink} fg={colors.yellow} />
          <Chip label={packTitleOf(q.id)} bg={colors.pink} />
        </View>
        <Quit onPress={onQuit} />
      </View>
      <Text style={styles.question} maxFontSizeMultiplier={1.25}>
        {q.text}
      </Text>

      <View style={{ marginTop: 16 }}>
        <Raised face={bid ? colors.yellow : colors.surface}>
          <View style={styles.table}>
            <Label color={colors.ink}>{t('lance na mesa')}</Label>
            {bid ? (
              <Enter key={m.bids.length} from={10}>
                <View style={styles.bidRow}>
                  <Text style={styles.bidValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.4} maxFontSizeMultiplier={1}>
                    {formatValue(bid.value, q.unit)}
                  </Text>
                  <Text style={styles.bidUnit}>{q.unit}</Text>
                </View>
                <Text style={styles.bidWho}>
                  {t('{name} diz:', { name: nameOf(m, bid.playerId) })} <Text style={{ fontFamily: fonts.ui800 }}>{t('isso ou mais')}</Text>
                </Text>
              </Enter>
            ) : (
              <Text style={styles.empty}>{t('ninguém chutou ainda. abre o jogo!')}</Text>
            )}
          </View>
        </Raised>
      </View>

      {m.bids.length > 1 && (
        <View style={styles.ladder} accessibilityLabel={t('lances anteriores')}>
          {m.bids
            .slice(-5, -1)
            .reverse()
            .map((b, i) => (
              <Text key={m.bids.length - i} style={[styles.ladderItem, { opacity: 1 - i * 0.2 }]} numberOfLines={1}>
                {nameOf(m, b.playerId)} {formatValue(b.value, q.unit)}
              </Text>
            ))}
        </View>
      )}

      <View style={{ marginTop: 14 }}>
        <Board m={m} current={m.turnId} me={me} />
      </View>

      <View style={{ flex: 1 }} />
      <Enter key={m.turnId} from={10}>
        <Text style={styles.vezLabel}>{me !== null && mine ? t('é a') : t('vez de')}</Text>
        <Text style={styles.vezName} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.5} maxFontSizeMultiplier={1} accessibilityRole="header">
          {me !== null && mine ? t('sua vez!') : nameOf(m, m.turnId)}
        </Text>
      </Enter>
      {m.deadline !== null && m.turnSeconds && (
        <View style={{ marginTop: 8 }}>
          <TurnTimer key={`${m.deadline}`} deadline={m.deadline} seconds={m.turnSeconds} now={now} onExpire={canExpire ? () => onAction({ type: 'TIMEOUT' }) : undefined} />
        </View>
      )}
      {zoeira}
      <ErrorLine error={error} />
      {mine ? (
        <View style={styles.actions}>
          <Btn label={t('EU DUVIDO!')} variant="pink" right={null} disabled={!bid || busy} onPress={() => onAction({ type: 'DOUBT' })} style={{ flex: 1 }} />
          <Btn label={bid ? t('Aumentar') : t('Dar lance')} right="arrowRight" disabled={busy} onPress={() => setBidding(true)} style={{ flex: 1 }} />
        </View>
      ) : (
        <Waiting text={t('{name} tá pensando…', { name: nameOf(m, m.turnId) })} />
      )}
      {bidding && mine && (
        <BidSheet
          m={m}
          onClose={() => setBidding(false)}
          onBid={(value) => {
            setBidding(false);
            onAction({ type: 'BID', value });
          }}
        />
      )}
    </View>
  );
}

/** Folha do lance: teclado, mínimo e atalhos. */
function BidSheet({ m, onClose, onBid }: { m: PublicMatch; onClose: () => void; onBid: (v: number) => void }) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const min = minBid(m);
  const bid = lastBid(m);
  const [value, setValue] = useState('');
  const n = value === '' ? 0 : Number(value);
  const ok = value !== '' && n >= min;
  const unit = m.question.unit;
  const quick: [string, number][] = bid
    ? [
        [t('mínimo'), min],
        ['+10%', Math.max(min, Math.ceil(bid.value * 1.1))],
        ['×2', Math.max(min, bid.value * 2)],
      ]
    : [];
  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.scrim} onPress={onClose} accessibilityLabel={t('fechar')} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 12 }]} accessibilityViewIsModal>
        <View style={styles.rowBetween}>
          <Label color={colors.ink}>{t('teu lance, {name}', { name: nameOf(m, m.turnId) })}</Label>
          <Pressable onPress={onClose} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('cancelar')} style={styles.closeBtn}>
            <Icon name="close" size={18} accent="none" />
          </Pressable>
        </View>
        <View style={styles.display} accessible accessibilityLabel={t('lance: {value} {unit}', { value: value || t('vazio'), unit })}>
          <Text style={[styles.displayNum, !value && { color: colors.inkMuted }]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.5} maxFontSizeMultiplier={1}>
            {formatDigits(value, unit)}
          </Text>
          <Text style={styles.displayUnit}>{unit}</Text>
        </View>
        <Text style={[styles.minHint, value !== '' && !ok && { color: colors.pinkInk }]}>{bid ? t('tem que ser {n} ou mais', { n: formatValue(min, unit) }) : t('qualquer número a partir de 1')}</Text>
        {quick.length > 0 && (
          <View style={styles.quick}>
            {quick.map(([l, v]) => (
              <Pressable key={l} onPress={() => setValue(String(v).slice(0, MAX_DIGITS))} style={({ pressed }) => [styles.quickBtn, pressed && { backgroundColor: colors.yellow }]} accessibilityRole="button" accessibilityLabel={`${l}: ${v}`}>
                <Text style={styles.quickLabel}>{l}</Text>
                <Text style={styles.quickVal} numberOfLines={1}>
                  {formatValue(v, unit)}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
        <View style={{ marginTop: 10 }}>
          <Keypad value={value} onChange={setValue} compact={height < 800} />
        </View>
        <Btn label={ok ? t('Lançar {n}', { n: formatValue(n, unit) }) : t('Lançar')} icon="check" right={null} disabled={!ok} onPress={() => onBid(n)} style={{ marginTop: 12 }} />
      </View>
    </Modal>
  );
}

/* ---------- duvidou (ou estourou o tempo): carimbo, resposta contando e veredito ---------- */
function Result({ m, me, busy, error, onAction, zoeira }: MatchScreenProps) {
  const insets = useSafeAreaInsets();
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const cardRef = useRef<View>(null);
  const r = m.result;
  useEffect(() => {
    playSound(r?.outcome === 'timeout' ? 'buzina' : 'duvido');
    const timer = setTimeout(() => setStage(1), 1100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (stage !== 2 || !r) return;
    if (r.exact) {
      playSound('mosca');
      haptic.success();
    } else playSound('perdeu');
  }, [stage, r]);
  if (!r) return null;
  const q = m.question;
  const timeout = r.outcome === 'timeout';
  const over = r.outcome === 'over';
  const loser = nameOf(m, r.loserId);
  const bidder = nameOf(m, r.bid?.playerId);
  const title = r.exact ? t('{name} cravou na mosca!', { name: bidder }) : timeout ? t('Estourou o tempo!') : over ? t('{name} blefou!', { name: bidder }) : t('O lance tava certo!');
  const why = r.exact
    ? r.bonusId
      ? me === r.bonusId
        ? t('Lance exato: você recupera um “!”.')
        : t('Lance exato: {name} recupera um “!”.', { name: bidder })
      : t('Lance exato! {name} já tava com todos os “!”.', { name: bidder })
    : timeout
      ? t('{name} enrolou demais.', { name: loser })
      : over
        ? t('{n} passou da resposta.', { n: formatValue(r.bid?.value ?? 0, q.unit) })
        : t('{name} duvidou à toa.', { name: nameOf(m, r.doubterId) });
  const lost = me === r.loserId ? (r.eliminated ? t('Você perdeu o último “!” e tá fora.') : t('Você perde um “!”.')) : r.eliminated ? t('{name} perdeu o último “!” e tá fora.', { name: loser }) : t('{name} perde um “!”.', { name: loser });
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 14 }]}>
      <StatusBar style="dark" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 34 }}>
          <Stamp size={34} text={timeout ? t('TEMPO!') : t('EU DUVIDO!')} />
          <Enter delay={250}>
            <Body color={colors.ink} style={{ textAlign: 'center', marginTop: 14 }}>
              {timeout ? (
                <>
                  <Text style={{ fontFamily: fonts.ui800 }}>{loser}</Text> {t('não jogou a tempo.')}
                </>
              ) : (
                <>
                  <Text style={{ fontFamily: fonts.ui800 }}>{nameOf(m, r.doubterId)}</Text> {t('duvidou de')} <Text style={{ fontFamily: fonts.ui800 }}>{bidder}</Text>:{' '}
                  {t('{value} {unit} ou mais?', { value: formatValue(r.bid?.value ?? 0, q.unit), unit: q.unit })}
                </>
              )}
            </Body>
          </Enter>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 12 }}>
          {stage >= 1 && (
            <Enter>
              <Raised face={r.exact && stage === 2 ? colors.yellow : colors.surface}>
                <View style={{ padding: 18 }}>
                  <Label color={colors.ink}>{t('a resposta é')}</Label>
                  <View style={styles.bidRow}>
                    <CountUp to={r.answer} unit={q.unit} style={styles.answer} onDone={() => setStage(2)} />
                    <Text style={styles.bidUnit}>{q.unit}</Text>
                  </View>
                  {stage === 2 && q.fact && <Body size={15}>{q.fact}</Body>}
                  {stage === 2 && q.source && <Text style={styles.source}>{t('fonte: {source}', { source: q.source })}</Text>}
                </View>
              </Raised>
              {r.exact && stage === 2 && <Stamp size={24} text={t('NA MOSCA!')} style={styles.moscaStamp} />}
            </Enter>
          )}
          {stage === 2 && (
            <Enter delay={120}>
              <View style={[styles.verdict, { backgroundColor: r.exact ? colors.yellowSoft : over || timeout ? colors.pinkSoft : colors.greenSoft }]} accessibilityLiveRegion="polite">
                <Text style={styles.verdictTitle}>{title}</Text>
                <Text style={styles.verdictText}>
                  {why} {lost}
                </Text>
                {r.exact && r.bid && (
                  <Pressable
                    onPress={() => void shareCard(cardRef)}
                    style={({ pressed }) => [styles.shareBtn, pressed && { backgroundColor: colors.yellow }]}
                    accessibilityRole="button"
                    accessibilityLabel={t('compartilhar o na mosca')}
                  >
                    <Icon name="share" size={18} accent="none" />
                    <Text style={styles.shareText}>{t('compartilhar o print')}</Text>
                  </Pressable>
                )}
              </View>
            </Enter>
          )}
        </View>
      </ScrollView>

      {stage === 2 && (
        <Enter delay={250}>
          <Board m={m} losingId={r.loserId} me={me} />
          {zoeira}
          <ErrorLine error={error} />
          <Btn label={m.winnerId ? t('Ver quem ganhou') : t('Próxima rodada')} icon={m.winnerId ? 'trophy' : undefined} variant="dark" disabled={busy} onPress={() => onAction({ type: 'NEXT_ROUND' })} style={{ marginTop: 12 }} />
        </Enter>
      )}
      {r.exact && r.bid && <ShareCard ref={cardRef} name={bidder} value={r.bid.value} unit={q.unit} question={q.text} />}
    </View>
  );
}

/* ---------- fim ---------- */
function End({ m, me, hostId, busy, onRematch, onHome, showUpsell, onUpsell, zoeira, endExtra }: MatchScreenProps) {
  const insets = useSafeAreaInsets();
  const table = standings(m);
  const winner = table[0];
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 14 }]}>
      <StatusBar style="dark" />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <BangMark size={84} />
        <Enter delay={150}>
          <Title size={44} style={{ textAlign: 'center', marginTop: 18 }}>
            {me === winner?.id ? t('você\nganhou') : t('{name}\nlevou', { name: winner?.name ?? '' })}
            <Text style={{ color: colors.pinkInk }}>!</Text>
          </Title>
        </Enter>
        <Enter delay={300}>
          <Body style={{ textAlign: 'center', marginTop: 6 }}>
            {m.round === 1 ? t('1 rodada') : t('{n} rodadas', { n: m.round })} · {t('sobrou com {n} “!”', { n: winner ? m.lives[winner.id] : 0 })}
          </Body>
        </Enter>
      </View>
      <ScrollView style={{ flex: 1, marginTop: 18 }} contentContainerStyle={{ gap: 10, paddingBottom: 4 }} showsVerticalScrollIndicator={false}>
        {table.map((p, i) => (
          <Enter key={p.id} delay={380 + i * 70}>
            <View style={[styles.rankRow, i === 0 && { backgroundColor: colors.yellow, borderColor: colors.ink }]}>
              {i === 0 ? <Icon name="trophy" size={24} accent={colors.surface} /> : <Text style={styles.rank}>{i + 1}</Text>}
              <Text style={styles.rankName}>
                {p.name}
                {me === p.id ? t(' (você)') : ''}
              </Text>
              <Lives left={m.lives[p.id]} total={m.startLives} size={16} />
            </View>
          </Enter>
        ))}
        <Pressable onPress={() => void shareApp('match_end')} style={({ pressed }) => [styles.shareBtn, styles.shareApp, pressed && { backgroundColor: colors.sunk }]} accessibilityRole="button" accessibilityHint={t('Manda o link do jogo pra quem não tem')}>
          <Icon name="share" size={18} accent="none" strokeWidth={2.4} />
          <Text style={styles.shareText}>{t('chamar mais gente pra próxima')}</Text>
        </Pressable>
        {endExtra}
        {showUpsell && onUpsell && (
          <Raised onPress={onUpsell} face={colors.pinkSoft} style={{ marginTop: 6 }} accessibilityLabel={t('Conhecer os pacotes pro')}>
            <View style={styles.upsell}>
              <Icon name="sparkle" size={28} accent={colors.yellow} />
              <View style={{ flex: 1 }}>
                <Text style={styles.upsellTitle}>{t('curtiu? tem mais {n} pacotes', { n: PACKS.filter((p) => p.premium).length })}</Text>
                <Text style={styles.upsellText}>{t('{n} perguntas novas te esperando no pro.', { n: PACKS.filter((p) => p.premium).reduce((n, p) => n + p.questions.length, 0) })}</Text>
              </View>
            </View>
          </Raised>
        )}
      </ScrollView>
      {zoeira}
      <View style={{ gap: 8, marginTop: 12 }}>
        {onRematch ? <Btn label={t('Revanche')} icon="refresh" right={null} disabled={busy} onPress={onRematch} /> : <Waiting text={t('esperando {name} chamar a revanche…', { name: nameOf(m, hostId) })} />}
        <Btn label={t('Voltar pro início')} variant="secondary" right={null} height={54} onPress={onHome} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: 20 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 44 },
  quit: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, minHeight: 36, borderRadius: 999, borderWidth: 2, borderColor: colors.ink },
  quitText: { fontFamily: fonts.ui800, fontSize: 14, color: colors.ink },
  error: { fontFamily: fonts.ui700, fontSize: 14, color: colors.pinkInk, marginBottom: 8, textAlign: 'center' },
  board: { gap: 8, paddingHorizontal: 20, paddingVertical: 6 },
  seat: { borderRadius: 16, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 8, gap: 6, minWidth: 84 },
  seatNow: { borderColor: colors.ink, backgroundColor: colors.yellowSoft },
  seatName: { fontFamily: fonts.ui800, fontSize: 14, color: colors.ink, maxWidth: 130 },
  waiting: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 60, borderRadius: radii.button, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.inkMuted, marginTop: 10 },
  waitingText: { fontFamily: fonts.ui700, fontSize: 15, color: colors.inkSoft },
  bigQuestion: { fontFamily: fonts.display, fontSize: 32, lineHeight: 36, letterSpacing: -1, color: colors.ink },
  unitHint: { fontFamily: fonts.ui700, fontSize: 16, color: colors.inkSoft, marginTop: 14 },
  tip: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.sunk, borderRadius: 16, padding: 12, marginBottom: 12 },
  tipText: { flex: 1, color: colors.inkSoft, fontFamily: fonts.ui600, fontSize: 14, lineHeight: 19 },
  question: { color: colors.ink, fontFamily: fonts.display, fontSize: 22, lineHeight: 26, letterSpacing: -0.5, marginTop: 12 },
  table: { padding: 16, minHeight: 128, justifyContent: 'center' },
  bidRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  bidValue: { flexShrink: 1, color: colors.ink, fontFamily: fonts.display, fontSize: 56, lineHeight: 64, letterSpacing: -2.5 },
  bidUnit: { color: colors.pinkInk, fontFamily: fonts.ui800, fontSize: 16 },
  bidWho: { color: colors.ink, fontFamily: fonts.ui600, fontSize: 15 },
  empty: { color: colors.inkSoft, fontFamily: fonts.ui700, fontSize: 17, marginTop: 10 },
  ladder: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  ladderItem: { fontFamily: fonts.ui700, fontSize: 13, color: colors.inkSoft, backgroundColor: colors.sunk, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3, overflow: 'hidden' },
  vezLabel: { fontFamily: fonts.ui700, fontSize: 16, color: colors.inkSoft },
  vezName: { fontFamily: fonts.display, fontSize: 52, lineHeight: 58, letterSpacing: -2.5, color: colors.ink },
  actions: { flexDirection: 'row', gap: 10, marginTop: 10 },
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.scrim },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: colors.paper, borderTopLeftRadius: radii.sheet, borderTopRightRadius: radii.sheet, borderWidth: 2.5, borderBottomWidth: 0, borderColor: colors.ink, paddingHorizontal: 18, paddingTop: 12 },
  closeBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  display: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: 18, paddingHorizontal: 16, paddingVertical: 2, marginTop: 6 },
  displayNum: { flex: 1, color: colors.ink, fontFamily: fonts.display, fontSize: 46, lineHeight: 56, letterSpacing: -2 },
  displayUnit: { color: colors.pinkInk, fontFamily: fonts.ui800, fontSize: 16 },
  minHint: { color: colors.inkSoft, fontFamily: fonts.ui700, fontSize: 14, marginTop: 6 },
  quick: { flexDirection: 'row', gap: 6, marginTop: 10 },
  quickBtn: { flex: 1, borderRadius: radii.magnitude, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.surface, paddingVertical: 6, alignItems: 'center' },
  quickLabel: { fontFamily: fonts.ui700, fontSize: 12, color: colors.inkSoft },
  quickVal: { fontFamily: fonts.display, fontSize: 15, color: colors.ink },
  answer: { flexShrink: 1, color: colors.ink, fontFamily: fonts.display, fontSize: 64, lineHeight: 72, letterSpacing: -3 },
  source: { fontFamily: fonts.ui600, fontSize: 12, color: colors.inkMuted, marginTop: 6 },
  moscaStamp: { position: 'absolute', right: -8, top: -30 },
  shareBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', marginTop: 10, borderRadius: 999, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.surface, paddingHorizontal: 12, minHeight: 36 },
  shareText: { fontFamily: fonts.ui800, fontSize: 14, color: colors.ink },
  shareApp: { alignSelf: 'center', marginTop: 4, minHeight: 44, paddingHorizontal: 16 },
  verdict: { borderRadius: radii.card, borderWidth: 2.5, borderColor: colors.ink, padding: 16, marginTop: 14 },
  verdictTitle: { fontFamily: fonts.display, fontSize: 24, letterSpacing: -0.6, color: colors.ink },
  verdictText: { fontFamily: fonts.ui600, fontSize: 15, lineHeight: 21, color: colors.ink, marginTop: 4 },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.line, borderRadius: radii.button, paddingHorizontal: 14, minHeight: 58 },
  rank: { width: 24, textAlign: 'center', color: colors.inkMuted, fontFamily: fonts.display, fontSize: 16 },
  rankName: { flex: 1, color: colors.ink, fontFamily: fonts.ui800, fontSize: 17 },
  upsell: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  upsellTitle: { color: colors.ink, fontFamily: fonts.ui800, fontSize: 16 },
  upsellText: { color: colors.inkSoft, fontFamily: fonts.ui600, fontSize: 14, marginTop: 2 },
});
