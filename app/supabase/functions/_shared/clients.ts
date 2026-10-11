import { createClient, type SupabaseClient } from 'npm:@supabase/supabase-js@2';
import { HttpError } from './http.ts';

export type Db = SupabaseClient;

/** Cliente service role. A chave de serviço existe SÓ dentro das Edge Functions. */
export function adminClient(): Db {
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new HttpError(500, 'server_misconfigured');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** O gateway já validou a assinatura do JWT; aqui ele vira um usuário (identidade vem do token, nunca do corpo). */
export async function requireUser(req: Request, db: Db): Promise<{ id: string }> {
  const header = req.headers.get('Authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) throw new HttpError(401, 'unauthorized');
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user) throw new HttpError(401, 'unauthorized');
  return { id: data.user.id };
}
