# Feature 010: Public Profile and CV Page

## Purpose

Give visitors a clear view of Richmond Ayamga as a person and petroleum engineering student, separate from the project archive.

## User experience

- The homepage About links to a dedicated profile page at `/about.html`.
- The page introduces Richmond by name and explains his interests in good health, green energy, continuous learning, and collaboration.
- It shows his university, location, current study stage, skills, and contact details.
- Visitors can view the CV in a new browser tab before choosing whether to download it.
- Visitors can download a print-ready CV template directly.
- Visitors can email or call him directly.

## Implementation

- Added `about.html` and `src/about.ts` for the public profile page.
- Added `src/about.css` for the profile visual system and responsive layout.
- Added `public/richmond-ayamga-cv.html` as a downloadable, print-ready CV.
- Updated the homepage About navigation and hero link.

## Validation

- `npm run build` passes.
- The CV avoids invented grades, dates, certifications, or work experience.

## Follow-up

- Replace the HTML CV with a final PDF once Richmond supplies the official CV content.
- Add a real profile photo if he wants one displayed.
- Add LinkedIn or other professional links.
