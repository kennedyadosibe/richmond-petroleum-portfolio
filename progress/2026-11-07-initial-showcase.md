# Initial Engineering Showcase

- **Date:** 2026-11-07
- **Branch:** `dev`
- **Goal:** Replace the Vite starter screen with a responsive engineering portfolio/workbench.

## Changes made

- Added the RICH Engineering / Lab visual identity.
- Added hero, selected work, approach, field notes, and footer sections.
- Added project cards for GridWatch, Atlas Rover, and FlowBench.
- Added category filtering, project search, and a reset-to-all-projects control.
- Added collaboration and feedback modal flows with accessible form fields.
- Added responsive mobile styles.
- Added workspace Git and documentation rules in `.github/copilot-instructions.md`.

## Validation

- `npm install` completed successfully.
- `npm run build` completed successfully.
- Browser smoke test confirmed page rendering, project filtering, and dialog opening.

## Documentation updated

- `docs/features/001-engineering-showcase.md`
- `.github/copilot-instructions.md`
- `progress/README.md`

## Follow-up work

- Connect the contact form to a persistent backend.
- Build project upload and administration.
- Add persistent comments, moderation, and project detail routes.
