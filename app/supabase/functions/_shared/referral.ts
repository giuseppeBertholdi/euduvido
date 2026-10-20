import type { Db } from './clients.ts';
import { grantPro } from './entitlement.ts';

/** Quantas pessoas novas, e quão nova é "nova" (a conta anônima nasce quando o app abre pela 1ª vez). */
export const REFERRAL_GOAL = 3;
const NEW_ACCOUNT_MS = 48 * 3600 * 1000;

/**
 * Partida terminou: quem tem conta nova e chegou ao fim na sala conta como convidado de quem criou a sala, e ganha
 * 24 h de Pro na hora. Na 3ª pessoa, quem criou ganha 1 semana de Pro (uma vez na vida, e só se nunca assinou).
 * Nunca derruba a partida: quem chama trata o erro.
 */
export async function creditReferrals(db: Db, room: { id: string; host_id: string; created_by?: string | null }, playerIds: string[]): Promise<void> {
  const inviter = room.created_by ?? room.host_id;
  if (!playerIds.includes(inviter)) return;
  const fresh: string[] = [];
  for (const id of playerIds) {
    if (id === inviter) continue;
    const { data } = await db.auth.admin.getUserById(id);
    const createdAt = Date.parse(data.user?.created_at ?? '');
    if (createdAt && Date.now() - createdAt < NEW_ACCOUNT_MS) fresh.push(id);
  }
  if (fresh.length) {
    // `select` com ignoreDuplicates devolve só quem entrou agora: quem já foi contado não ganha de novo
    const { data: added, error } = await db
      .from('referrals')
      .upsert(fresh.map((invitee_id) => ({ invitee_id, inviter_id: inviter })), { onConflict: 'invitee_id', ignoreDuplicates: true })
      .select('invitee_id');
    if (error) throw error;
    for (const { invitee_id } of (added ?? []) as { invitee_id: string }[]) {
      try {
        const result = await grantPro(invitee_id, 'daily');
        if (result !== 'disabled') await db.from('referrals').update({ invitee_reward: result }).eq('invitee_id', invitee_id);
      } catch (e) {
        console.error('referral invitee', e); // a semana de quem convidou não depende disso
      }
    }
  }

  const { count, error: countError } = await db.from('referrals').select('invitee_id', { count: 'exact', head: true }).eq('inviter_id', inviter);
  if (countError) throw countError;
  if ((count ?? 0) < REFERRAL_GOAL) return;

  // a linha `pending` é a trava: duas partidas terminando juntas não dão duas semanas
  const { error: lockError } = await db.from('referral_rewards').insert({ user_id: inviter, status: 'pending' });
  if (lockError) {
    if (lockError.code === '23505') return;
    throw lockError;
  }
  try {
    const result = await grantPro(inviter, 'weekly');
    if (result === 'disabled') {
      await db.from('referral_rewards').delete().eq('user_id', inviter);
      return;
    }
    await db.from('referral_rewards').update({ status: result }).eq('user_id', inviter);
  } catch (e) {
    // loja fora do ar: solta a trava pra tentar de novo no fim da próxima partida
    await db.from('referral_rewards').delete().eq('user_id', inviter);
    throw e;
  }
}
