/**
 * Convite: termine uma partida na sua sala com 3 pessoas novas (que instalaram há pouco) e ganhe 1 semana de Pro.
 * Quem foi convidado ganha 24 h de Pro ao terminar essa partida.
 * Quem conta e quem ganha decide o servidor (supabase/functions/_shared/referral.ts); aqui o app só lê o progresso.
 */
import { ensureUserId, supabase } from './supabase';

export const REFERRAL_GOAL = 3;

/**
 * `reward`: a semana de quem convida (null = ainda não completou; `ineligible` = já tinha assinado antes).
 * `guest`: as 24 h de quem foi convidado (null = não foi convidado, ou a loja não respondeu).
 */
export type ReferralStatus = { friends: number; reward: 'pending' | 'granted' | 'ineligible' | null; guest: 'granted' | 'ineligible' | null };

export async function referralStatus(): Promise<ReferralStatus | null> {
  if (!supabase) return null;
  try {
    const me = await ensureUserId();
    const [count, reward, guest] = await Promise.all([
      supabase.from('referrals').select('invitee_id', { count: 'exact', head: true }).eq('inviter_id', me),
      supabase.from('referral_rewards').select('status').eq('user_id', me).maybeSingle<{ status: ReferralStatus['reward'] }>(),
      supabase.from('referrals').select('invitee_reward').eq('invitee_id', me).maybeSingle<{ invitee_reward: ReferralStatus['guest'] }>(),
    ]);
    if (count.error || reward.error || guest.error) return null;
    return { friends: Math.min(count.count ?? 0, REFERRAL_GOAL), reward: reward.data?.status ?? null, guest: guest.data?.invitee_reward ?? null };
  } catch {
    return null;
  }
}
