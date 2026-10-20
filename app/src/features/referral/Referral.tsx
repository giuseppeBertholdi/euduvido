import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '@/components/Icon';
import { Raised } from '@/components/ui';
import { analytics } from '@/services/analytics';
import { purchases } from '@/services/purchases';
import { REFERRAL_GOAL, referralStatus, type ReferralStatus } from '@/services/referral';
import { colors, fonts } from '@/theme';

/** Progresso do convite, relido toda vez que a tela volta ao foco. */
export function useReferral() {
  const [status, setStatus] = useState<ReferralStatus | null>(null);
  const refresh = useCallback(async () => {
    const next = await referralStatus();
    if (next) setStatus(next);
    return next;
  }, []);
  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );
  return { status, refresh };
}

/**
 * Fim da partida online: o servidor contou os novos ao terminar, então relê o convite.
 * Quem criou a sala pode ter fechado a semana (`week`); quem foi convidado, ganhado as 24 h (`day`).
 * Se saiu agora, busca o pro na loja na hora.
 */
export function useReferralAfterMatch(endKey: string | null, isHost: boolean, { status, refresh }: ReturnType<typeof useReferral>) {
  const [rewarded, setRewarded] = useState<'week' | 'day' | null>(null);
  // o que já se sabia antes desta partida (quem ganhou há tempos não vê a festa de novo)
  const before = useRef<Pick<ReferralStatus, 'reward' | 'guest'> | undefined>(undefined);
  useEffect(() => {
    if (before.current === undefined && status) before.current = { reward: status.reward, guest: status.guest };
  }, [status]);
  useEffect(() => {
    if (!endKey) return;
    // o servidor grava o convite logo depois de publicar o fim da partida
    const t = setTimeout(async () => {
      const next = await refresh();
      if (!next) return;
      const was = before.current;
      before.current = { reward: next.reward, guest: next.guest };
      const won = isHost && next.reward === 'granted' && was?.reward !== 'granted' ? 'week' : !isHost && next.guest === 'granted' && was?.guest !== 'granted' ? 'day' : null;
      if (!won) return;
      setRewarded(won);
      analytics.track('referral_rewarded', { reward: won, friends: next.friends });
      void purchases.refresh();
    }, 2000);
    return () => clearTimeout(t);
  }, [endKey, isHost, refresh]);
  return rewarded;
}

/**
 * Cartão do convite: a oferta sempre no título (quem vê pela 1ª vez entende), a regra numa linha e o progresso.
 * Some pra quem já é pro ou já usou a vez.
 */
export function ReferralCard({ status, premium, source, onPress }: { status: ReferralStatus | null; premium: boolean; source: 'home' | 'lobby' | 'match_end'; onPress: () => void }) {
  if (premium || !status || status.reward !== null) return null;
  const left = REFERRAL_GOAL - status.friends;
  const press = () => {
    analytics.track('referral_tapped', { source, friends: status.friends });
    onPress();
  };
  const cta = source === 'home' ? 'Convidar' : 'Mandar convite';
  return (
    <Raised onPress={press} face={colors.greenSoft} accessibilityLabel={`Ganhe 1 semana de pro grátis: convide ${REFERRAL_GOAL} amigos que ainda não têm o app. Eles ganham 24 horas de pro. ${status.friends} de ${REFERRAL_GOAL}. ${cta}.`}>
      <View style={styles.card}>
        <View style={styles.badge}>
          <Icon name="crown" size={16} accent={colors.yellow} />
          <Text style={styles.badgeText}>1 SEMANA DE PRO GRÁTIS</Text>
        </View>
        <Text style={styles.title}>Convide {REFERRAL_GOAL} amigos que ainda não têm o app</Text>
        <Text style={styles.sub}>Eles baixam, entram na sua sala e jogam uma partida até o fim. E ganham 24 h de pro.</Text>
        <View style={styles.foot}>
          <View style={{ gap: 6 }}>
            <View style={styles.dots}>
              {Array.from({ length: REFERRAL_GOAL }, (_, i) => (
                <View key={i} style={[styles.dot, i < status.friends && styles.dotOn]} />
              ))}
            </View>
            <Text style={styles.count}>{status.friends === 0 ? `0 de ${REFERRAL_GOAL} amigos` : `${status.friends} de ${REFERRAL_GOAL} · falta${left === 1 ? '' : 'm'} ${left}`}</Text>
          </View>
          <View style={styles.cta}>
            <Text style={styles.ctaText}>{cta}</Text>
            <Icon name="arrowRight" size={18} color={colors.yellow} />
          </View>
        </View>
      </View>
    </Raised>
  );
}

/** Ganhou o pro do convite (fim da partida): a semana de quem convidou ou as 24 h de quem foi convidado. */
export function ReferralReward({ kind }: { kind: 'week' | 'day' }) {
  return (
    <View style={styles.reward} accessibilityLiveRegion="polite">
      <Icon name="crown" size={30} accent={colors.surface} />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={styles.rewardTitle}>{kind === 'week' ? 'Você ganhou 1 semana de pro!' : 'Você ganhou 24 h de pro!'}</Text>
        <Text style={styles.sub}>
          {kind === 'week' ? `${REFERRAL_GOAL} amigos novos jogaram na sua sala.` : 'Presente de quem te chamou pra sala.'} Todos os pacotes estão liberados
          {kind === 'day' ? ': cria a sua sala e chama a sua galera.' : '.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, gap: 6 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: colors.ink, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontFamily: fonts.ui800, fontSize: 12, letterSpacing: 0.4, color: colors.yellow },
  title: { fontFamily: fonts.ui800, fontSize: 18, lineHeight: 22, color: colors.ink, marginTop: 4 },
  sub: { fontFamily: fonts.ui600, fontSize: 14, lineHeight: 18, color: colors.inkSoft },
  foot: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginTop: 8 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 34, height: 12, borderRadius: 6, borderWidth: 2, borderColor: colors.ink, backgroundColor: colors.surface },
  dotOn: { backgroundColor: colors.green },
  count: { fontFamily: fonts.ui800, fontSize: 13, color: colors.ink },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.ink, borderRadius: 999, paddingHorizontal: 14, minHeight: 40 },
  ctaText: { fontFamily: fonts.ui800, fontSize: 14, color: colors.yellow },
  reward: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, backgroundColor: colors.yellow, borderRadius: 20, borderWidth: 2, borderColor: colors.ink },
  rewardTitle: { fontFamily: fonts.ui800, fontSize: 17, lineHeight: 21, color: colors.ink },
});
