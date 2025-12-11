-- Waitlist table for landing signups
create table if not exists public.waitlist (
  email text primary key,
  source text default 'landing',
  created_at timestamptz default now()
);

-- Optional: keep a last_updated column for auditing (uncomment if needed)
-- alter table public.waitlist add column if not exists last_updated timestamptz default now();
-- create or replace function public.set_waitlist_updated_at()
-- returns trigger as $$
-- begin
--   new.last_updated = now();
--   return new;
-- end;
-- $$ language plpgsql;
-- drop trigger if exists trg_waitlist_updated_at on public.waitlist;
-- create trigger trg_waitlist_updated_at
-- before update on public.waitlist
-- for each row execute procedure public.set_waitlist_updated_at();

-- Enable RLS if you plan to expose the table to the client;
-- service role calls bypass RLS automatically.
-- alter table public.waitlist enable row level security;
