# Feature 007: Supabase Admin Dashboard

## Purpose

Give the petroleum engineering student a private place to manage portfolio content without editing source code.

## Dashboard URL

Run the app locally and open `/admin.html`.

## Admin capabilities

- Sign in with one Supabase email/password account.
- Add projects.
- Edit existing projects.
- Publish or unpublish projects.
- Delete projects and their related comments.
- Review visitor comments.
- Approve pending comments.
- Delete comments.
- View project and comment counts.

## Supabase setup

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](../../supabase/schema.sql).
3. In Supabase Authentication, create the single admin user with email/password.
4. Copy `.env.example` to `.env.local`.
5. Add:

   ```text
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   ```

6. Restart the Vite server.
7. Open `/admin.html` and sign in.

The public anon key is intended for browser use. Never put the Supabase service-role key in `.env.local` or frontend code.

## Implementation

- `src/supabase.ts` initializes the Supabase browser client and defines shared records.
- `src/admin.ts` provides login, project CRUD, and comment moderation.
- `src/admin.css` styles the private control room.
- `admin.html` is the dashboard entry point.
- `supabase/schema.sql` creates the tables, seed projects, grants, and row-level security policies.
- `src/main.ts` loads published projects when Supabase is configured and submits project comments to the pending moderation queue.

## Security

- Row Level Security is enabled on all public tables.
- Public visitors can read published projects and approved comments.
- Public visitors can insert pending comments only.
- Authenticated users can manage projects and comments.
- The database policy currently treats any authenticated Supabase account as an admin. Keep only the intended single admin account enabled until role-specific policies are added.

## References

- [Supabase JavaScript initialization](https://supabase.com/docs/reference/javascript/initializing)
- [Supabase password sign-in](https://supabase.com/docs/reference/javascript/auth-signinwithpassword)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
