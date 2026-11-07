# Project Guidelines

These instructions apply to all work in this workspace.

## Git Workflow

- Git is required for this project. If `.git` is missing, initialize the repository before making code changes.
- Keep two branches:
  - `dev`: default branch for implementation, testing, and review.
  - `main`: official, release-ready code only.
- Make changes and test them on `dev`.
- Commit completed, validated work to `dev` with a clear imperative message.
- Promote validated work to `main` only when it is ready to be the official version. Keep `main` stable and do not use it as the working branch.
- Never commit secrets, local environment files, `node_modules`, or generated build output.
- Before committing, inspect `git status`, review the diff, run the smallest relevant validation command, and confirm the commit succeeded.
- Do not rewrite history or force-push unless the user explicitly requests it.

## Documentation and Progress

- Every new feature must include or update a feature document in `docs/features/`.
- Every feature document should describe the purpose, user behavior, implementation surface, validation, and any follow-up work.
- Record meaningful work in `progress/` using a dated Markdown entry. Update `progress/README.md` when the tracking structure changes.
- Keep documentation accurate as behavior changes; do not create placeholder documentation that does not describe the implemented feature.

## Official Documentation

- When a task depends on a framework, library, platform, API, or tool behavior, read the current official documentation online before implementing or making a recommendation.
- Prefer primary sources: official product documentation, specifications, and repository documentation maintained by the project.
- Use the documentation to resolve version-sensitive questions, then record relevant links in the feature or progress document.
- Do not treat search snippets or unofficial examples as authoritative when an official source is available.

## Build and Test

- Install dependencies with `npm install` when the lockfile or dependency manifest changes.
- Run `npm run build` for TypeScript and production-build validation.
- Add focused tests when interactive behavior or data handling becomes substantial.
- Report validation results in the relevant progress entry.

## Project Conventions

- This is a Vite + TypeScript frontend.
- Keep application behavior in `src/main.ts` and styling in `src/style.css` unless a new module is justified.
- Prefer semantic HTML, accessible labels, keyboard-friendly controls, and responsive behavior.
- Keep visual changes consistent with the engineering workbench aesthetic: warm neutral surfaces, dark ink, teal system accents, and restrained technical details.
