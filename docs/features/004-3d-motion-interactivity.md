# Feature 004: 3D Motion Interactivity

## Purpose

Upgrade the petroleum engineering portfolio from a mostly static presentation to a motion-driven interface with depth and interaction cues.

## User experience

- The hero diagram now reacts to pointer movement with subtle 3D tilt depth.
- Project cards now tilt and show dynamic highlight glow based on pointer position.
- Main content sections reveal smoothly as the user scrolls.
- Diagram nodes animate continuously to reinforce live system behavior.
- Users who prefer reduced motion get a stable, non-animated experience.

## Implementation

- Added reusable motion-surface behavior in `src/main.ts` using pointer-based tilt variables.
- Added motion binding for:
  - Hero diagram (`.motion-hero`)
  - Project cards (`.project-card.motion-surface`)
- Rebound card motion after filter/search re-renders so interactivity remains consistent.
- Added reveal-on-scroll behavior with `IntersectionObserver`.
- Added motion styles and 3D transform layers in `src/style.css`.
- Added reduced-motion fallback with `@media (prefers-reduced-motion: reduce)`.

## Validation

- `npm run build` passes TypeScript checking and Vite production build.
- Filtering and search still re-render cards correctly.
- Project comment/view actions continue to open the modal as before.

## Follow-up

- Add subtle page-level depth transitions tied to scroll progress.
- Tune per-device motion intensity (desktop vs touch devices).
- Replace placeholder glyphs with project-specific 3D model previews.

## References

- [PointerEvent API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)
- [prefers-reduced-motion (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [rotate3d() (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d)
