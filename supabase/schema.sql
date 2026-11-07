create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id text primary key,
  title text not null,
  description text not null,
  category text not null,
  status text not null default 'Draft study',
  metric text not null default '—',
  metric_label text not null default 'metric',
  tags text[] not null default '{}',
  accent text not null default 'teal',
  icon text not null default '◌',
  tools text not null default '',
  method text not null default '',
  outcome text not null default '',
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  project_id text references public.projects(id) on delete cascade,
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.profile (
  id integer primary key default 1 check (id = 1),
  name text not null default 'RICH',
  headline text not null default 'Petroleum engineering student',
  bio text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.comments enable row level security;
alter table public.profile enable row level security;

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
  on public.projects for select to anon, authenticated
  using (published = true);

drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects"
  on public.projects for all to authenticated
  using (true) with check (true);

drop policy if exists "Visitors submit comments" on public.comments;
create policy "Visitors submit comments"
  on public.comments for insert to anon, authenticated
  with check (status = 'pending');

drop policy if exists "Admins manage comments" on public.comments;
create policy "Admins manage comments"
  on public.comments for all to authenticated
  using (true) with check (true);

drop policy if exists "Approved comments are public" on public.comments;
create policy "Approved comments are public"
  on public.comments for select to anon, authenticated
  using (status = 'approved');

drop policy if exists "Profile is public" on public.profile;
create policy "Profile is public"
  on public.profile for select to anon, authenticated
  using (true);

drop policy if exists "Admins manage profile" on public.profile;
create policy "Admins manage profile"
  on public.profile for all to authenticated
  using (true) with check (true);

grant select on public.projects to anon, authenticated;
grant insert on public.comments to anon, authenticated;
grant select on public.comments to anon, authenticated;
grant all on public.projects, public.comments, public.profile to authenticated;

insert into public.projects (id, title, description, category, status, metric, metric_label, tags, accent, icon, tools, method, outcome, published, sort_order)
values
('gridwatch', 'WellLog Insight', 'A study of well-log data to identify lithology and estimate reservoir properties.', 'Reservoir', 'In progress', '12', 'wells reviewed', array['Petrophysics', 'Python', 'Excel'], 'teal', '⌁', 'Petrel concepts · Python · Excel', 'Compare gamma ray, resistivity, and density responses to interpret lithology across a small well set.', 'A repeatable interpretation workflow with clearer reservoir-property estimates.', true, 1),
('atlas', 'CoreLab Notes', 'A practical record of core analysis, porosity, permeability, and fluid-property studies.', 'Formation', 'Open for feedback', '08', 'lab studies', array['Core Analysis', 'PVT', 'Reports'], 'orange', '◈', 'Core reports · PVT tables · Spreadsheets', 'Organize measured porosity and permeability alongside fluid-property observations from lab studies.', 'A practical reference for connecting core measurements to production decisions.', true, 2),
('flowbench', 'Field Development Plan', 'A student field-development study connecting well placement, production forecasts, and recovery.', 'Production', 'Draft study', '3', 'scenarios compared', array['Reservoir Eng.', 'Eclipse', 'Mapping'], 'purple', '◌', 'Eclipse concepts · Mapping · Excel', 'Compare well-placement and recovery assumptions across three simplified development scenarios.', 'A transparent recommendation that shows the trade-offs behind the preferred plan.', true, 3)
on conflict (id) do nothing;

insert into public.profile (id, name, headline, bio)
values (1, 'RICH', 'Petroleum engineering student', 'A portfolio of coursework, field studies, and practical projects.')
on conflict (id) do nothing;
