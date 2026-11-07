# Feature 011: Engineering Profile Visual

## Purpose

Replace the placeholder `R` profile graphic with a visual that communicates Richmond's petroleum engineering focus without pretending to be a photograph of him.

## User experience

- The About page now shows a generated subsurface engineering illustration.
- The illustration depicts:
  - A wellbore
  - Geological strata
  - Measurement nodes
  - A technical field-study grid
  - Depth and reservoir readout labels
- The illustration has descriptive alternative text for screen readers.

## Implementation

- Added `public/profile-engineering.svg`.
- Replaced the monogram identity core in `src/about.ts`.
- Added responsive image styling in `src/about.css`.

## Validation

- `npm run build` passes.
- The visual is original project artwork and does not represent a fabricated portrait.

## Follow-up

- Replace the illustration with Richmond's real profile photo if he provides one.
