import { useEffect, useRef } from 'react';
import type { PublicMatch } from '@/game/engine';
import { PACKS } from '@/game/content';
import { analytics } from '@/services/analytics';

const packOf = (questionId: string) => PACKS.find((p) => p.questions.some((q) => q.id === questionId))?.id ?? null;

/**
 * Uma `round_revealed` por rodada revelada (local e online): diz quais perguntas rendem, quanto a galera erra
 * (`bid_ratio`: lance contestado ÷ resposta) e como as rodadas terminam. No online, só quem é o host manda.
 */
export function useRoundAnalytics(m: PublicMatch, me: string | null, hostId?: string) {
  const sent = useRef<string | null>(null);
  useEffect(() => {
    const r = m.result;
    if (m.phase !== 'result' || !r) return;
    const key = `${m.round}:${m.question.id}`;
    if (sent.current === key) return;
    sent.current = key;
    const online = me !== null;
    if (online && me !== hostId) return;
    analytics.track('round_revealed', {
      mode: online ? 'online' : 'local',
      round: m.round,
      players: m.players.length,
      question_id: m.question.id,
      question: m.question.text,
      pack: packOf(m.question.id),
      answer: r.answer,
      unit: m.question.unit,
      outcome: r.outcome,
      exact: r.exact,
      eliminated: r.eliminated,
      bids: m.bids.length,
      bid: r.bid?.value ?? null,
      bid_ratio: r.bid && r.answer ? Math.round((r.bid.value / r.answer) * 1000) / 1000 : null,
      timer: m.turnSeconds,
    });
  }, [m, me, hostId]);
}
