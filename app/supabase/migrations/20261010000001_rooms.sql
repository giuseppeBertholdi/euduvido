-- Eu Duvido! online: salas com PIN.
-- Regra: o app nunca escreve direto. Lê a própria sala (RLS) e escreve só via Edge Functions (service role).
-- A resposta da rodada vive em room_secrets.engine (sem policy nem grant: só o servidor lê).

create extension if not exists pgcrypto;

create table public.rooms (
  id         uuid primary key default gen_random_uuid(),
  pin        text not null check (pin ~ '^[0-9]{4}$'),
  host_id    uuid not null references auth.users (id) on delete cascade,
  status     text not null default 'lobby' check (status in ('lobby', 'playing', 'finished', 'closed')),
  -- { lives, turnSeconds, packs }
  config     jsonb not null,
  -- estado PÚBLICO do motor (publicState): sem baralho e sem resposta antes da revelação
  state      jsonb,
  version    int  not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '6 hours'
);
-- Um PIN é único entre as salas abertas.
create unique index rooms_open_pin on public.rooms (pin) where status <> 'closed';
create index rooms_host_idx on public.rooms (host_id);

create table public.room_players (
  room_id   uuid not null references public.rooms (id) on delete cascade,
  user_id   uuid not null references auth.users (id) on delete cascade,
  name      text not null check (char_length(name) between 1 and 12),
  seat      int  not null check (seat between 0 and 7),
  joined_at timestamptz not null default now(),
  left_at   timestamptz,
  primary key (room_id, user_id)
);
create unique index room_players_seat_idx on public.room_players (room_id, seat) where left_at is null;
create unique index room_players_name_idx on public.room_players (room_id, lower(name)) where left_at is null;

-- SEGREDO: estado completo do motor (baralho com as respostas). Só service role.
create table public.room_secrets (
  room_id uuid primary key references public.rooms (id) on delete cascade,
  engine  jsonb not null
);

alter table public.rooms        enable row level security;
alter table public.room_players enable row level security;
alter table public.room_secrets enable row level security;

-- O Supabase dá privilégios de tabela pra anon/authenticated por padrão: tira tudo.
revoke all on all tables    in schema public from anon, authenticated;
revoke all on all functions in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;

create or replace function public.is_room_member(p_room uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.room_players
    where room_id = p_room and user_id = auth.uid() and left_at is null
  );
$$;

-- Quem está na sala lê a sala e os jogadores. Mais nada é legível, nada é gravável.
create policy rooms_member_select on public.rooms
  for select to authenticated using (public.is_room_member(id));
create policy room_players_member_select on public.room_players
  for select to authenticated using (public.is_room_member(room_id));

grant select on public.rooms, public.room_players to authenticated;
grant execute on function public.is_room_member(uuid) to authenticated;

-- Realtime: o app ouve mudanças na própria sala (respeitando a RLS acima).
alter publication supabase_realtime add table public.rooms, public.room_players;
alter table public.rooms replica identity full;
alter table public.room_players replica identity full;
