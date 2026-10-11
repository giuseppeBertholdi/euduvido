import { HttpError } from './http.ts';

/**
 * O usuário tem o entitlement `pro` ativo no RevenueCat? (o app usa o id do Supabase como app user id)
 * Sem REVENUECAT_SECRET_KEY nos segredos da função, a checagem fica desligada (desenvolvimento).
 * A chave secreta (sk_…) só existe aqui: `supabase secrets set REVENUECAT_SECRET_KEY=sk_…`.
 */
export async function hasPro(userId: string): Promise<boolean> {
  const key = Deno.env.get('REVENUECAT_SECRET_KEY');
  if (!key) return true;
  const res = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(userId)}`, {
    headers: { Authorization: `Bearer ${key}`, Accept: 'application/json' },
  });
  if (!res.ok) throw new HttpError(503, 'store_unavailable');
  const body = (await res.json()) as { subscriber?: { entitlements?: Record<string, { expires_date: string | null; grace_period_expires_date?: string | null }> } };
  const pro = body.subscriber?.entitlements?.pro;
  if (!pro) return false;
  const until = [pro.expires_date, pro.grace_period_expires_date ?? null];
  // expires_date null = vitalício
  return pro.expires_date === null || until.some((d) => d !== null && Date.parse(d) > Date.now());
}
