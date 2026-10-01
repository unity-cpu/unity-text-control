-- UNITY TEXT CONTROL
-- Run this entire file in Supabase Dashboard -> SQL Editor.

create table if not exists public.unity_text (
  id integer primary key,
  text text not null default 'Hello from Unity!',
  updated_at timestamptz not null default now()
);

insert into public.unity_text (id, text)
values (1, 'Hello from Unity!')
on conflict (id) do nothing;

-- The Vercel API uses the Supabase service-role key.
-- Do NOT put the service-role key in Unity or in public browser code.
-- RLS can remain enabled/disabled according to your project setup because
-- the server-side service-role API is what accesses this table.

alter table public.unity_text enable row level security;

-- No public anon policies are created intentionally.
-- The Vercel server uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
