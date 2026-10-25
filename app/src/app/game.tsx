import { Redirect, router } from 'expo-router';
import { Alert } from 'react-native';
import { RemindersAsk } from '@/features/engagement/RemindersAsk';
import { ReviewAsk } from '@/features/engagement/ReviewAsk';
import { useMatchEnd } from '@/features/engagement/useMatchEnd';
import { MatchScreen } from '@/features/match/MatchScreen';
import { createMatch, publicState, reduce, type Action } from '@/game/engine';
import { offerIfExhausted } from '@/features/paywall/offerExhausted';
import { starterFirst } from '@/game/highlights';
import { freshPool } from '@/game/played';
import { PACKS } from '@/game/content';
import { analytics } from '@/services/analytics';
import { useApp } from '@/state/app';
import { t } from '@/i18n';

const localNow = () => Date.now();

/** Partida local: um celular só, o motor roda aqui mesmo. */
export default function Game() {
  const { match, setMatch, premium, packs, played, avoidRepeats, markPlayed, exhaustedOfferAt, set } = useApp();
  // partida local: a galera jogou junta até o fim, é sempre um momento bom
  useMatchEnd(match ? `${match.players.map((p) => p.id).join(',')}:${match.deck[0]?.id}` : null, match?.phase === 'end', true, { mode: 'local', players: match?.players.length });
  if (!match) return <Redirect href="/" />;

  const onAction = (a: Action) => setMatch(reduce(match, a, { now: Date.now() }));
  const home = () => {
    setMatch(null);
    router.replace('/');
  };
  const quit = () =>
    Alert.alert(t('Largar a partida?'), t('O placar dessa partida vai embora.'), [
      { text: t('Continuar jogando'), style: 'cancel' },
      { text: t('Sair'), style: 'destructive', onPress: home },
    ]);
  const rematch = () => {
    const all = PACKS.filter((p) => packs.includes(p.id) && (premium || !p.premium)).flatMap((p) => p.questions);
    const base = all.length ? all : PACKS[0].questions;
    const { pool, fresh, recycled } = freshPool(base, played, avoidRepeats);
    const m = createMatch({ players: match.players, pool, lives: match.startLives, turnSeconds: match.turnSeconds, rng: Math.random });
    const deck = starterFirst(m.deck, played);
    setMatch({ ...m, deck, question: deck[0] });
    analytics.track('match_started', { mode: 'local', rematch: true, players: match.players.length, lives: match.startLives, timer: match.turnSeconds, packs, fresh, recycled });
    const offeredAt = offerIfExhausted({ premium, pool: base, played, lastOfferAt: exhaustedOfferAt }, 'rematch');
    if (offeredAt) set({ exhaustedOfferAt: offeredAt });
  };

  return (
    <MatchScreen
      m={publicState(match)}
      me={null}
      now={localNow}
      onAction={onAction}
      onQuit={quit}
      onRematch={rematch}
      onHome={home}
      showUpsell={!premium}
      onUpsell={() => router.push({ pathname: '/paywall', params: { source: 'match_end' } })}
      onSeen={markPlayed}
      endExtra={
        <>
          <RemindersAsk />
          <ReviewAsk />
        </>
      }
    />
  );
}
