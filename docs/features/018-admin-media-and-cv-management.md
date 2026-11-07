# Admin Media and CV Management

## What changed

The admin dashboard can now upload project or field pictures and replace Richmond's public CV.

## User experience

- Project editors accept an optional image up to 10 MB.
- Uploaded project images appear as the public project's visual.
- The dashboard accepts PDF CV files up to 10 MB.
- Uploading a CV replaces the managed current CV at a stable public URL.
- The built-in CV page remains the fallback before the first managed upload.

## Supabase setup

Run the updated [`supabase/schema.sql`](../../supabase/schema.sql) in the Supabase SQL Editor. It creates the `portfolio-media` public bucket and authenticated admin storage policies.

## Validation

- TypeScript and Vite production build pass with `npm run build`.
