import { Redirect, router } from 'expo-router';
import { Alert } from 'react-native';
import { RemindersAsk } from '@/features/engagement/RemindersAsk';
import { useMatchEnd } from '@/features/engagement/useMatchEnd';
import { MatchScreen } from '@/features/match/MatchScreen';
import { createMatch, publicState, reduce, type Action } from '@/game/engine';
import { freshPool } from '@/game/played';
import { PACKS } from '@/game/questions';
import { useApp } from '@/state/app';

const localNow = () => Date.now();

/** Partida local: um celular só, o motor roda aqui mesmo. */
export default function Game() {
  const { match, setMatch, premium, packs, played, avoidRepeats, markPlayed } = useApp();
  // partida local: a galera jogou junta até o fim, é sempre um momento bom
  useMatchEnd(match ? `${match.players.map((p) => p.id).join(',')}:${match.deck[0]?.id}` : null, match?.phase === 'end', true);
  if (!match) return <Redirect href="/" />;

  const onAction = (a: Action) => setMatch(reduce(match, a, { now: Date.now() }));
  const home = () => {
    setMatch(null);
    router.replace('/');
  };
  const quit = () =>
    Alert.alert('Largar a partida?', 'O placar dessa partida vai embora.', [
      { text: 'Continuar jogando', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: home },
    ]);
  const rematch = () => {
    const all = PACKS.filter((p) => packs.includes(p.id) && (premium || !p.premium)).flatMap((p) => p.questions);
    const { pool } = freshPool(all.length ? all : PACKS[0].questions, played, avoidRepeats);
    setMatch(createMatch({ players: match.players, pool, lives: match.startLives, turnSeconds: match.turnSeconds, rng: Math.random }));
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
      onUpsell={() => router.push({ pathname: '/paywall', params: { source: 'pack' } })}
      onSeen={markPlayed}
      endExtra={<RemindersAsk />}
    />
  );
}
