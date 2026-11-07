# Supabase Admin Dashboard

- **Date:** 2026-11-07
- **Branch:** `dev`
- **Goal:** Provide a private dashboard for managing projects and reviewing visitor comments.

## Changes made

- Added the Supabase browser client and shared database types.
- Added `.env.example` for browser-safe Supabase configuration.
- Added `supabase/schema.sql` with projects, comments, profile, seed data, grants, and RLS policies.
- Added `/admin.html` with Supabase email/password login.
- Added project create, edit, publish/unpublish, and delete controls.
- Added comment approval and deletion controls.
- Connected public project loading to Supabase when configured.
- Connected project comment submission to the pending moderation queue.
- Added setup and security documentation.

## Validation

- `npm run build` passes.
- `/admin.html` loads a clear configuration message when Supabase environment variables are not present.

## Documentation updated

- `docs/features/007-supabase-admin-dashboard.md`

## Required setup

- Create a Supabase project.
- Run `supabase/schema.sql`.
- Create the admin auth user.
- Configure `.env.local` from `.env.example`.
