# Feature 001: Engineering Showcase

## Purpose

Create a public-facing petroleum engineering student portfolio where visitors can explore coursework and field studies, understand the approach behind the work, and start a feedback or knowledge-sharing thread.

## User experience

- The homepage introduces the petroleum engineering student and the purpose of the portfolio.
- Visitors can browse project cards for WellLog Insight, CoreLab Notes, and Field Development Plan.
- Visitors can filter projects by Reservoir, Formation, or Production.
- Visitors can search project titles, descriptions, and technology tags.
- Visitors can open a collaboration dialog from the header, project cards, or notes section.
- Visitors can submit their name, email, and message through the dialog.
- Visitors can read the field-notes section and navigate between major page sections.
- The layout adapts for smaller screens.

## Implementation

- `src/main.ts` contains the project data, page markup, filtering/search state, modal behavior, and contact form success state.
- `src/style.css` contains the responsive visual system, project-card layouts, engineering diagram, modal, and mobile breakpoints.
- `index.html` provides the page metadata and application entry point.

## Validation

- `npm run build` passes TypeScript checking and the Vite production build.
- Browser smoke testing confirmed:
  - The homepage renders.
  - Category filtering returns the matching petroleum project.
  - The collaboration dialog opens and focuses the first field.

## Follow-up

- Add a backend or hosted form endpoint so messages persist.
- Replace sample project data with an upload/admin workflow.
- Add persistent comments and moderation.
- Add project detail routes and media uploads.

## References

- [VS Code custom instructions](https://code.visualstudio.com/docs/agent-customization/custom-instructions)
