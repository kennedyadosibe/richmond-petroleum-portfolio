# Vercel Multi-Page Deployment

## What changed

Configured Vite to emit all public HTML entry points during production builds:

- `index.html`
- `about.html`
- `admin.html`

## User experience

The public profile and private admin dashboard now work on the deployed Vercel site, not only in the local Vite development server.

## Validation

- Production build output includes all three HTML routes.
- TypeScript and Vite production build pass with `npm run build`.
