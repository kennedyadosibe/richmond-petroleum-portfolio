# Feature 003: Project Comments

## Purpose

Give visitors a clear way to comment on an individual petroleum engineering project instead of only opening a general collaboration message.

## User experience

- Every project card now has a visible `Comment` action beside `View project`.
- Selecting `Comment` opens the feedback dialog for that specific project.
- The dialog names the selected project and asks the visitor to share feedback or a question.
- The visitor can provide their name, email, and comment.

## Implementation

- Added project-specific comment buttons in `src/main.ts`.
- Added project action handling using the existing modal workflow.
- Added project action layout and muted comment styling in `src/style.css`.

## Validation

- `npm run build` passes TypeScript checking and the Vite production build.
- Browser validation should confirm each project card exposes `Comment` and opens the project-specific dialog.

## Follow-up

- Persist comments through a backend or hosted form endpoint.
- Add moderation before comments are publicly displayed.
- Show approved comments beneath each project.
