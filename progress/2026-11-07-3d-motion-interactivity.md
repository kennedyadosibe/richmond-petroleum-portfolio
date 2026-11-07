# 3D Motion Interactivity

- **Date:** 2026-11-07
- **Branch:** `dev`
- **Goal:** Introduce 3D motion and richer interactivity so the engineering portfolio feels dynamic rather than static.

## Changes made

- Implemented pointer-reactive 3D tilt for the hero diagram.
- Implemented pointer-reactive 3D tilt and lighting effect for project cards.
- Added section reveal animations using `IntersectionObserver`.
- Added animated diagram node pulse effects.
- Added reduced-motion support to respect accessibility settings.
- Ensured card motion rebinds after filter/search re-renders.

## Validation

- `npm run build` passes.

## Documentation updated

- `docs/features/004-3d-motion-interactivity.md`

## Follow-up work

- Add persistent backend for comments.
- Introduce per-project media/3D assets for stronger visual storytelling.
