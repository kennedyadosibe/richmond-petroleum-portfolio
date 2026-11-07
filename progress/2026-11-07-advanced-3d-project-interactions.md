# Advanced 3D Project Interactions

- **Date:** 2026-11-07
- **Branch:** `dev`
- **Goal:** Add a wireframe background, scroll-linked camera movement, and technical project-card flips.

## Changes made

- Added an animated wireframe mesh and scanline layer behind the hero diagram.
- Added scroll-linked hero camera rotation and depth movement.
- Added technical detail fields to all petroleum projects.
- Added 3D front/back card faces with tools, methods, and outcomes.
- Added accessible reduced-motion fallbacks.
- Preserved project filtering, search, comments, and modal interactions.

## Validation

- `npm run build` passes.
- Browser smoke test passed for mesh rendering, card flipping, technical readouts, project comments, and scroll-linked camera movement.

## Documentation updated

- `docs/features/005-advanced-3d-project-interactions.md`

## Follow-up work

- Add authentic project media and richer petroleum engineering visualizations.
- Persist comments with a backend and moderation workflow.
