# Feature 006: Modern Visual System

## Purpose

Refresh the portfolio presentation so the petroleum engineering work feels contemporary, cinematic, and intentional without removing the existing technical interactions.

## User experience

- Dark charcoal and deep-green surfaces create a more focused engineering atmosphere.
- A lime signal color improves calls to action and system status visibility.
- The header becomes a floating glass navigation bar.
- The hero becomes a rounded, high-contrast feature panel with a technical field-study label.
- Project cards use glass surfaces, rounded geometry, stronger hierarchy, and brighter technical tags.
- The approach and field-notes sections now feel like distinct editorial panels.
- Existing 3D tilt, wireframe mesh, scroll camera, card flips, filters, search, and comments remain available.

## Implementation

- Added the modern visual system as a focused CSS layer in `src/style.css`.
- Reused the existing DOM and interaction logic in `src/main.ts`.
- Added responsive overrides for the floating navigation, hero panel, sections, and footer.

## Validation

- `npm run build` passes TypeScript and Vite production validation.
- Existing motion and project interactions remain wired to the same selectors.
