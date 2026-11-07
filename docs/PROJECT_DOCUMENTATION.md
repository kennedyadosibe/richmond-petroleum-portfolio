# Richmond Ayamga Petroleum Engineering Portfolio

## 1. Project overview

This project is a public portfolio and personal profile website for Richmond Ayamga, a petroleum engineering student at the University of Energy and Natural Resources in Sunyani, Ghana.

The site is designed to help Richmond:

- Present his petroleum engineering learning journey.
- Explain coursework, field studies, and technical projects.
- Share project methods, tools, and outcomes.
- Receive thoughtful feedback from visitors.
- Present his profile and CV to academic, professional, and collaborative audiences.
- Manage projects, comments, images, and his CV without editing source code.

The project is intentionally more than a static page. It combines a public portfolio experience with an authenticated content-management dashboard.

---

## 2. Why this project was created

Richmond is a petroleum engineering student rather than a software professional. The site therefore focuses on the way an engineering student learns, investigates, documents, and communicates technical work.

The portfolio is intended to:

1. Make early academic work look clear and credible.
2. Show the reasoning behind projects, not only their final titles.
3. Give visitors enough context to understand technical work.
4. Encourage constructive comments and professional conversations.
5. Provide an online profile and CV destination for opportunities.
6. Allow Richmond to update the content as his education and experience grow.

The site is described as a study desk rather than a finished showroom. This communicates that Richmond is actively learning, testing ideas, and improving his technical understanding.

---

## 3. Audience

The primary audiences are:

- Petroleum engineering lecturers and academic reviewers.
- Other engineering students.
- Internship and graduate recruiters.
- Energy-sector professionals.
- Potential collaborators and mentors.
- Visitors interested in petroleum engineering and green energy.

Because some visitors may not be software developers, the interface avoids unnecessary technical jargon and explains projects through familiar engineering concepts such as reservoirs, wells, core analysis, petrophysics, production, and field development.

---

## 4. Design direction

### 4.1 Why the visual style was chosen

The visual system uses a dark technical interface with green, teal, lime, orange, and violet accents. This was chosen because it connects the website to:

- Subsurface maps and geological interpretation.
- Technical control rooms and engineering dashboards.
- Measurement instruments and field data.
- Energy, earth, and environmental themes.

The dark background gives technical diagrams and data-like labels visual emphasis. Teal and green suggest energy, geology, and sustainability. Orange and violet provide controlled contrast for project categories and interactive states.

### 4.2 Why the design is interactive

A petroleum engineering portfolio benefits from showing systems, layers, measurements, and relationships. Static text alone would not communicate that well.

The site therefore includes:

- Pointer-reactive depth and tilt.
- Animated wireframe and scanline layers.
- Scroll-linked hero movement.
- Project cards that flip to expose technical details.
- Expandable project readouts.
- Search and category filtering.
- Responsive mobile navigation.
- Reduced-motion support for visitors who prefer less animation.

The interactions are not decorative only. They reinforce the engineering theme while keeping the content understandable.

### 4.3 Why the profile visual is an illustration

No real portrait was supplied for Richmond. Instead of inventing or presenting a fabricated photograph as if it were real, the project uses an original engineering illustration.

The illustration contains:

- Geological layers.
- A wellbore.
- Depth markers.
- Measurement nodes.
- Reservoir labels.
- A technical grid.

The navigation uses a separate compact drilling-rig and wellhead mark so the profile page and navigation have related but distinct visual identities.

---

## 5. Public website structure

### Homepage

The homepage is the main portfolio experience.

It includes:

- Technical hero section.
- Petroleum engineering positioning.
- Animated engineering diagram.
- Selected project cards.
- Category filters.
- Project search.
- Project detail dialog.
- Technical project-card flip.
- Project-specific comments.
- Engineering approach section.
- Field notes section.
- Admin login icon.
- Responsive mobile navigation.

### Profile page

The profile page is available at:

```text
/about.html
```

It includes:

- Richmond’s name and academic identity.
- University and location.
- Petroleum engineering interests.
- Skills and values.
- Engineering identity illustration.
- CV preview link.
- CV download link.
- Contact options.

### CV page

The built-in fallback CV is available at:

```text
/richmond-ayamga-cv.html
```

Visitors can preview the CV in a browser before deciding whether to save or print it.

When Richmond uploads a replacement PDF through the admin dashboard, public CV links use the uploaded file instead.

### Admin dashboard

The admin dashboard is available at:

```text
/admin.html
```

It provides:

- Supabase email/password login.
- Project creation.
- Project editing.
- Project publishing and unpublishing.
- Project deletion.
- Project or field-picture upload.
- Comment review.
- Comment approval.
- Comment deletion.
- CV replacement.

---

## 6. Project content model

Each project contains:

- Project ID.
- Title.
- Description.
- Category.
- Status.
- Metric.
- Metric label.
- Tags.
- Accent color.
- Icon.
- Tools.
- Method.
- Outcome.
- Optional image URL.
- Published state.
- Sort order.

The three initial project concepts are:

### WellLog Insight

Category: Reservoir

A study of well-log data used to interpret lithology and estimate reservoir properties.

### CoreLab Notes

Category: Formation

A practical record of core analysis, porosity, permeability, and fluid-property studies.

### Field Development Plan

Category: Production

A student field-development study connecting well placement, production forecasts, recovery, and scenario comparison.

These are starter records and can be edited or replaced from the admin dashboard.

---

## 7. Comments and feedback

Visitors can comment on a specific project.

The workflow is:

1. A visitor selects `Comment` on a project card.
2. The form is automatically associated with that project.
3. The visitor submits a name, email, and message.
4. The comment enters the pending review queue.
5. Richmond signs in to the dashboard.
6. Richmond approves or deletes the comment.
7. Approved comments can be made publicly readable through the database rules.

This moderation workflow prevents unreviewed content from appearing publicly.

---

## 8. Technology choices

### Vite

Vite provides:

- Fast local development.
- TypeScript support.
- Production bundling.
- Multi-page HTML builds.
- Efficient deployment output.

The project uses Vite’s multi-page configuration so the production build includes:

```text
index.html
about.html
admin.html
richmond-ayamga-cv.html
```

### TypeScript

TypeScript helps maintain predictable data structures for projects, comments, profile records, and dashboard operations.

### Vanilla TypeScript and DOM rendering

The site uses vanilla TypeScript rather than a large UI framework because:

- The project is small enough to remain clear without a framework.
- The public pages need limited runtime state.
- The dashboard and public pages share straightforward data models.
- Fewer dependencies reduce deployment complexity.

### Supabase

Supabase provides:

- PostgreSQL database storage.
- Authentication for the admin dashboard.
- Row-level security.
- Storage for project pictures and CV files.

The main database tables are:

```text
projects
comments
profile
```

The storage bucket is:

```text
portfolio-media
```

### Vercel

Vercel was chosen for hosting because it:

- Connects directly to GitHub.
- Automatically deploys the `main` branch.
- Detects Vite projects.
- Provides preview deployments.
- Supports environment variables.
- Requires little server maintenance.

---

## 9. Supabase architecture

### Public access

The public site can:

- Read published projects.
- Submit pending comments.
- Read approved comments.
- Read public profile data.
- Read public portfolio media.

### Authenticated access

The authenticated admin can:

- Manage projects.
- Manage comments.
- Manage profile data.
- Upload and replace project images.
- Upload and replace the CV.

### Storage behavior

Project images are uploaded under project-specific paths.

The current CV is uploaded to a stable path:

```text
cv/current.pdf
```

Using a stable path means the dashboard can replace the current CV without requiring a new public link in the page markup each time.

The public profile falls back to the built-in CV page until a managed CV URL exists in the `profile` record.

---

## 10. Environment variables

The application expects:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

For local development, create `.env.local` from `.env.example`.

For Vercel, add the same variables under the project’s **Environment** settings and redeploy after saving them.

Do not commit:

- `.env.local`.
- Supabase service-role keys.
- Supabase secret keys.
- Database passwords.
- Private authentication credentials.

The browser-facing Supabase URL and publishable/anon key are used by the frontend. Database row-level security and authenticated policies protect write operations.

---

## 11. Local development

Install dependencies:

```powershell
npm install
```

Start the local development server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview the production build:

```powershell
npm run preview
```

The production build should emit:

```text
dist/index.html
dist/about.html
dist/admin.html
dist/richmond-ayamga-cv.html
```

---

## 12. Supabase setup process

Run the complete schema file in the Supabase SQL Editor:

[supabase/schema.sql](../supabase/schema.sql)

The schema creates or updates:

- Projects table.
- Comments table.
- Profile table.
- Project image column.
- CV URL column.
- Row-level security policies.
- Portfolio storage bucket.
- Storage access policies.
- Initial seed projects.
- Initial profile record.

After running the schema:

1. Create the intended Supabase admin user.
2. Add the Supabase URL and publishable/anon key to local `.env.local`.
3. Add the same variables to Vercel.
4. Sign in at `/admin.html`.
5. Upload Richmond’s real CV.
6. Add real project or field images.

---

## 13. Deployment workflow

The repository is:

```text
https://github.com/kennedyadosibe/richmond-petroleum-portfolio
```

The branch workflow is:

```text
dev → validation → main → Vercel production
```

### Development branch

New work is created on `dev`.

### Main branch

Validated work is promoted to `main`.

### Vercel

Vercel deploys the `main` branch as the production site.

### After a change

1. Make the change on `dev`.
2. Run `npm run build`.
3. Test the affected page and interaction.
4. Commit the change.
5. Promote the commit to `main`.
6. Push both branches to GitHub.
7. Confirm the Vercel deployment.

---

## 14. Documentation and progress tracking

Feature documentation is stored in:

```text
docs/features/
```

Progress entries are stored in:

```text
progress/
```

This structure records why features were added and how the project evolved.

The workspace instructions are stored in:

[.github/copilot-instructions.md](../.github/copilot-instructions.md)

They define the expected Git, branch, documentation, progress, and official-documentation workflow.

---

## 15. Security decisions

The project follows these security principles:

- No service-role key is used in the browser.
- Environment secrets are not committed.
- Admin actions require Supabase authentication.
- Comments are moderated.
- Storage writes require authentication.
- Public projects are limited to published records.
- Project and profile writes are protected by authenticated policies.
- Uploaded CV files are limited to PDF files in the dashboard.
- Uploaded project images are limited to image files in the dashboard.
- Uploads are limited to 10 MB in the dashboard.

For a future multi-admin system, the current authenticated-user policies should be tightened with an explicit admin-role table or claim.

---

## 16. Current limitations

The current version intentionally has a few limitations:

- Project images support one primary image per project, not a full gallery.
- The CV upload accepts PDF files only.
- The profile text is still mostly source-defined rather than fully editable in the dashboard.
- The public comments section can be expanded further to display approved comments beneath individual projects.
- The built-in CV is a print-ready HTML fallback rather than a supplied official PDF.
- No real portrait or official professional social links have been supplied yet.

These limitations are safe extension points rather than blockers for launch.

---

## 17. Recommended next steps

### Before public launch

1. Upload Richmond’s official CV.
2. Replace starter project content with real project descriptions.
3. Add real field and project images.
4. Confirm the Supabase schema has run successfully.
5. Test admin login on the live Vercel URL.
6. Test project image upload on the live site.
7. Test CV replacement on the live site.
8. Test comment moderation.
9. Test the site on a phone.
10. Add a custom domain if desired.

### Later improvements

- Add project image galleries.
- Add profile editing to the dashboard.
- Add approved comments directly beneath each project.
- Add richer project timelines.
- Add downloadable project reports.
- Add analytics with privacy-conscious configuration.
- Add stricter admin authorization.
- Add a real portrait when Richmond provides one.
- Add LinkedIn or professional links.

---

## 18. Project status

The project currently includes:

- Public petroleum engineering portfolio.
- Interactive 3D-inspired visual system.
- Responsive homepage and profile page.
- Project filtering and search.
- Project details and comments.
- Supabase-backed admin dashboard.
- Project image uploads.
- Replaceable CV upload.
- Vercel multi-page production configuration.
- GitHub `dev` and `main` branches.
- Feature documentation and progress tracking.

The site is ready to host after the Supabase schema and Vercel environment variables are confirmed.
