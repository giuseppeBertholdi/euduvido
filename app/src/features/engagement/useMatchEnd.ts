import { useEffect, useRef } from 'react';
import { analytics } from '@/services/analytics';
import { maybeAskReview } from '@/services/engagement/review';
import { useApp } from '@/state/app';

/**
 * Quando uma partida chega ao fim (uma vez por partida): conta a partida e, se for um momento bom,
 * pede avaliação na App Store (regras em services/engagement/policy.ts). O pedido espera a tela de fim assentar.
 */
export function useMatchEnd(matchKey: string | null, ended: boolean, happy: boolean, info: { mode: 'local' | 'online'; players?: number } = { mode: 'local' }) {
  const app = useApp();
  const done = useRef<string | null>(null);
  const latest = useRef({ app, happy, info });
  useEffect(() => {
    latest.current = { app, happy, info };
  });

  useEffect(() => {
    if (!ended || !matchKey || done.current === matchKey) return;
    done.current = matchKey;
    const { app: a, happy: h, info: i } = latest.current;
    const finished = a.matchesFinished + 1;
    analytics.track('match_finished', { ...i, happy: h, matches_finished: finished });
    a.set({ matchesFinished: finished });
    const t = setTimeout(() => {
      void maybeAskReview({ matchesFinished: finished, reviewAsks: a.reviewAsks }, h).then((asked) => {
        if (asked) latest.current.app.set({ reviewAsks: [...latest.current.app.reviewAsks, Date.now()] });
      });
    }, 2500);
    return () => clearTimeout(t);
  }, [ended, matchKey]);
}
