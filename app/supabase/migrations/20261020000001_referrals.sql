-- Convite: jogue uma partida até o fim com 3 pessoas novas na sua sala e ganhe 1 semana de Pro.
-- Quem foi convidado ganha 24 h de Pro ao terminar essa primeira partida.
-- Quem conta: conta criada há menos de 48 h que terminou a partida na sala de quem criou. Cada pessoa conta uma vez só.
-- O servidor (Edge Functions, service role) escreve; o app só lê o próprio progresso.

-- Quem criou a sala (o host pode mudar quando alguém sai; o convite é de quem abriu a sala).
alter table public.rooms add column created_by uuid references auth.users (id) on delete set null;

create table public.referrals (
  invitee_id uuid primary key references auth.users (id) on delete cascade,
  inviter_id uuid not null references auth.users (id) on delete cascade,
  -- as 24 h de Pro de quem foi convidado (null = não deu: loja fora do ar ou sem chave)
  invitee_reward text check (invitee_reward in ('granted', 'ineligible')),
  created_at timestamptz not null default now()
);
create index referrals_inviter_idx on public.referrals (inviter_id);

-- Uma recompensa por pessoa. `pending` enquanto fala com o RevenueCat; `ineligible` = já assinou alguma vez.
create table public.referral_rewards (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  status     text not null check (status in ('pending', 'granted', 'ineligible')),
  created_at timestamptz not null default now()
);

alter table public.referrals        enable row level security;
alter table public.referral_rewards enable row level security;
revoke all on public.referrals, public.referral_rewards from anon, authenticated;

create policy referrals_member_select on public.referrals
  for select to authenticated using (inviter_id = auth.uid() or invitee_id = auth.uid());
create policy referral_rewards_own_select on public.referral_rewards
  for select to authenticated using (user_id = auth.uid());

grant select on public.referrals, public.referral_rewards to authenticated;
