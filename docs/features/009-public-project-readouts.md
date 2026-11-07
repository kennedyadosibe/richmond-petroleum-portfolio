# Feature 009: Public Project Readouts

## Purpose

Finish the visitor project journey so `View project` opens a proper technical readout instead of opening the comment form.

## User experience

- Selecting `View project` opens a project detail dialog.
- The dialog shows the project description, category, current status, tools, method, and outcome.
- Visitors can move from the readout directly into a project-specific comment form.
- The existing technical card flip remains available for a fast in-card readout.
- The page prevents accidental horizontal overflow from the large motion graphics.

## Implementation

- Added a reusable project detail view to the existing modal in `src/main.ts`.
- Added a direct `Comment on this project` action within the detail view.
- Added detail typography and layout in `src/style.css`.
- Added horizontal overflow protection for the modern visual system.

## Validation

- `npm run build` passes.
- Browser smoke testing should confirm:
  - `View project` opens the technical readout.
  - `Comment on this project` opens the correct comment form.
  - The page does not create a horizontal scrollbar at desktop widths.
