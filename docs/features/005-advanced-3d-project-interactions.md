# Feature 005: Advanced 3D Project Interactions

## Purpose

Make the petroleum engineering portfolio feel like an interactive technical instrument rather than a static page.

## User experience

- The hero contains a moving wireframe mesh and scanline layer behind the engineering diagram.
- The hero camera tilts progressively as the visitor scrolls through the page.
- Each project card has a `Technical details` action.
- Selecting `Technical details` flips the project card in 3D.
- The reverse side presents the project's tools, method, and outcome.
- The existing project view and comment actions remain available.
- Reduced-motion users receive a stable layout without the animated camera, mesh, or card flip effects.

## Implementation

- Added project-specific `tools`, `method`, and `outcome` fields in `src/main.ts`.
- Added front/back project-card markup and flip event handling.
- Added wireframe mesh and scanline layers to the hero diagram.
- Added scroll-linked CSS variables:
  - `--scroll-camera`
  - `--scroll-depth`
- Added 3D card transforms, technical readout styling, mesh drift animation, and reduced-motion overrides in `src/style.css`.

## Validation

- `npm run build` passes TypeScript checking and the Vite production build.
- Browser smoke test confirmed:
  - Wireframe mesh is rendered.
  - Technical details flips the first project card.
  - Technical readout contains tools, method, and outcome.
  - Comment still opens the selected project's dialog.
  - Scrolling to the page bottom updates the camera variable to `18deg`.

## Follow-up

- Add project-specific images or interactive reservoir visualizations.
- Add touch-friendly tap guidance for flip cards on mobile.
- Connect comments to persistent storage and moderation.
