import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Match, Player } from '@/game/engine';
import { setHapticsEnabled } from '@/services/haptics';
import { setSoundEnabled } from '@/services/sound';

const KEY = 'euduvido:v1';
const MAX_PLAYED = 2000;

type Saved = {
  onboarded: boolean;
  premium: boolean;
  lastPlayers: Player[];
  lives: number;
  /** Segundos por vez, ou null (sem timer). */
  timer: number | null;
  packs: string[];
  /** Nome no online (salas com PIN). */
  name: string;
  haptics: boolean;
  sounds: boolean;
  /** Lembretes locais ligados (a pessoa disse "quero" e deu permissão). */
  remindersOn: boolean;
  /** Já perguntamos sobre lembretes (só uma vez, depois da primeira partida). */
  remindersAsked: boolean;
  /** Partidas que chegaram ao fim neste celular. */
  matchesFinished: number;
  firstOpenAt: number | null;
  /** Quando pedimos avaliação na App Store. */
  reviewAsks: number[];
  /** Pular perguntas que já saíram neste celular. */
  avoidRepeats: boolean;
  /** Ids das perguntas que já saíram (mais recentes no fim). */
  played: string[];
  /** Quando mostramos o paywall "vocês zeraram as grátis" (no máximo 1 vez a cada 20 h). */
  exhaustedOfferAt: number | null;
};
const DEFAULTS: Saved = { onboarded: false, premium: false, lastPlayers: [], lives: 3, timer: null, packs: ['classico'], name: '', haptics: true, sounds: true, remindersOn: false, remindersAsked: false, matchesFinished: 0, firstOpenAt: null, reviewAsks: [], avoidRepeats: true, played: [], exhaustedOfferAt: null };

type Ctx = Saved & {
  ready: boolean;
  set: (patch: Partial<Saved>) => void;
  /** Marca uma pergunta como já jogada. */
  markPlayed: (questionId: string) => void;
  /** Partida em andamento (só em memória). */
  match: Match | null;
  setMatch: (m: Match | null) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Saved>(DEFAULTS);
  const [ready, setReady] = useState(false);
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (!raw) return;
        const loaded = { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Saved>) };
        if (loaded.firstOpenAt === null) loaded.firstOpenAt = Date.now();
        setHapticsEnabled(loaded.haptics);
        setSoundEnabled(loaded.sounds);
        setSaved(loaded);
      })
      .catch(() => undefined)
      .finally(() => {
        setSaved((prev) => (prev.firstOpenAt === null ? { ...prev, firstOpenAt: Date.now() } : prev));
        setReady(true);
      });
  }, []);

  const set = useCallback((patch: Partial<Saved>) => {
    setSaved((prev) => {
      const next = { ...prev, ...patch };
      setHapticsEnabled(next.haptics);
      setSoundEnabled(next.sounds);
      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => undefined);
      return next;
    });
  }, []);

  const markPlayed = useCallback((questionId: string) => {
    setSaved((prev) => {
      if (prev.played.includes(questionId)) return prev;
      const next = { ...prev, played: [...prev.played, questionId].slice(-MAX_PLAYED) };
      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => undefined);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ ...saved, ready, set, markPlayed, match, setMatch }), [saved, ready, set, markPlayed, match]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp fora do AppProvider');
  return ctx;
}
