# Feature 008: Dashboard Control Room Redesign

## Purpose

Make the private admin dashboard easier to understand and use as the student's content-management workspace.

## User experience

- Persistent sidebar navigation separates Overview, Projects, and Comments.
- The sidebar shows the number of pending comments.
- A connected-status indicator makes the Supabase state visible.
- The overview explains the purpose of the control room.
- The Projects section explains that it controls the public portfolio.
- The Comments section explains the approval workflow.
- Project and comment sections can be reached directly with anchor navigation.
- The layout collapses into a mobile navigation strip on smaller screens.

## Implementation

- Updated `src/admin.ts` with the sidebar and clearer section structure.
- Updated `src/admin.css` with the control-room layout, navigation states, status indicator, helper text, and responsive behavior.
- Preserved existing CRUD, refresh, sign-out, project editor, and comment moderation selectors and behavior.

## Validation

- `npm run build` passes.
- Existing Supabase dashboard actions remain wired to the same controls.

## Follow-up

- Add a profile/content editor.
- Add project image upload using Supabase Storage.
- Add richer dashboard activity and audit history.
