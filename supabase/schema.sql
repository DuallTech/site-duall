-- Rode este arquivo uma vez em: Supabase > SQL Editor > New query > Run.
-- Pressupostos: o cadastro público está DESATIVADO (Authentication > Sign In / Providers > "Allow new users to sign up" desligado)
-- e o único usuário do projeto é o admin criado manualmente. Por isso "authenticated" = admin.

-- ---------------------------------------------------------------------------
-- Tabela de artigos
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  summary      text not null default '',
  body         text not null default '',
  cover_url    text,
  linkedin_url text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx on public.posts (status, published_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Segurança (RLS): visitantes leem só o publicado; o admin faz tudo
-- ---------------------------------------------------------------------------
alter table public.posts enable row level security;

drop policy if exists "Publico le artigos publicados" on public.posts;
create policy "Publico le artigos publicados"
  on public.posts for select
  to anon, authenticated
  using (status = 'published' and published_at <= now());  -- published_at no futuro = agendado

drop policy if exists "Admin le tudo" on public.posts;
create policy "Admin le tudo"
  on public.posts for select
  to authenticated
  using (true);

drop policy if exists "Admin cria" on public.posts;
create policy "Admin cria"
  on public.posts for insert
  to authenticated
  with check (true);

drop policy if exists "Admin edita" on public.posts;
create policy "Admin edita"
  on public.posts for update
  to authenticated
  using (true) with check (true);

drop policy if exists "Admin exclui" on public.posts;
create policy "Admin exclui"
  on public.posts for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage: bucket "post-images" (leitura pública já vem do bucket público)
-- ---------------------------------------------------------------------------
drop policy if exists "Admin envia imagens" on storage.objects;
create policy "Admin envia imagens"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-images');

drop policy if exists "Admin altera imagens" on storage.objects;
create policy "Admin altera imagens"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'post-images') with check (bucket_id = 'post-images');

drop policy if exists "Admin apaga imagens" on storage.objects;
create policy "Admin apaga imagens"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-images');
