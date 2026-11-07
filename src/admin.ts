import './admin.css'
import { isSupabaseConfigured, requireSupabase, type CommentRecord, type ProjectRecord } from './supabase'

const app = document.querySelector<HTMLDivElement>('#admin-app')

if (!app) {
  throw new Error('Admin app root element was not found.')
}

const client = isSupabaseConfigured ? requireSupabase() : null
let projects: ProjectRecord[] = []
let comments: CommentRecord[] = []

const escapeHtml = (value: string | null | undefined) =>
  (value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character] ?? character)

const loginView = (message = '') => {
  app.innerHTML = `
    <main class="auth-shell">
      <div class="auth-card">
        <div class="admin-brand"><span>R</span><div><strong>RICH ADMIN</strong><small>PETROLEUM / STUDENT</small></div></div>
        <p class="admin-kicker">Private workspace</p>
        <h1>Manage the<br /><em>field notes.</em></h1>
        <p class="auth-copy">Sign in to add projects, update the portfolio, and review visitor comments.</p>
        ${message ? `<p class="form-error">${escapeHtml(message)}</p>` : ''}
        <form id="login-form">
          <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
          <label>Password<input name="password" type="password" required placeholder="••••••••" /></label>
          <button class="admin-button primary" type="submit">Sign in <span>↗</span></button>
        </form>
        <a class="back-link" href="/">← Back to portfolio</a>
      </div>
    </main>
  `
  document.querySelector<HTMLFormElement>('#login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (!client) return
    const form = event.currentTarget as HTMLFormElement
    const data = new FormData(form)
    const { error } = await client.auth.signInWithPassword({
      email: String(data.get('email')),
      password: String(data.get('password')),
    })
    if (error) {
      loginView(error.message)
      return
    }
    await renderDashboard()
  })
}

const dashboardView = () => {
  app.innerHTML = `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <a class="admin-brand" href="/"><span>R</span><div><strong>RICH ADMIN</strong><small>CONTROL ROOM</small></div></a>
        <nav class="admin-nav" aria-label="Dashboard navigation">
          <a class="active" href="#overview"><span>◈</span> Overview</a>
          <a href="#projects"><span>⌁</span> Projects</a>
          <a href="#comments"><span>✎</span> Comments <b id="sidebar-comment-count">0</b></a>
        </nav>
        <div class="sidebar-bottom"><a href="/" class="back-link">View public site ↗</a><button class="admin-button ghost" id="sign-out">Sign out</button></div>
      </aside>
      <main class="dashboard">
      <div class="dashboard-topbar"><span class="mobile-label">RICH / CONTROL ROOM</span><span class="live-indicator"><i></i> Supabase connected</span></div>
      <div class="dashboard-intro" id="overview"><div><p class="admin-kicker">Portfolio control room</p><h1>Good work starts<br /><em>with a clear readout.</em></h1></div><button class="admin-button primary" id="new-project">+ Add project</button></div>
      <section class="stats-grid"><div class="stat-card"><span>Published projects</span><strong id="project-count">—</strong></div><div class="stat-card"><span>Pending comments</span><strong id="comment-count">—</strong></div><div class="stat-card"><span>Workspace status</span><strong class="status-live">ONLINE</strong></div></section>
      <section class="dashboard-section media-section"><div class="section-title"><div><p class="admin-kicker">Public profile</p><h2>CV file</h2><p class="section-helper">Upload a PDF to replace the current public CV. The built-in CV remains the fallback until you upload one.</p></div></div><form id="cv-form" class="media-form"><label>Replace CV<input id="cv-file" name="cv" type="file" accept="application/pdf,.pdf" required /></label><button class="admin-button primary" type="submit">Upload and replace CV</button><p class="media-status" id="cv-status"></p></form></section>
      <section class="dashboard-section" id="projects"><div class="section-title"><div><p class="admin-kicker">Content inventory</p><h2>Projects</h2><p class="section-helper">Add and maintain the work shown on the public portfolio.</p></div><button class="admin-button ghost" id="refresh-projects">Refresh ↻</button></div><div class="table-wrap"><table><thead><tr><th>Project</th><th>Category</th><th>Status</th><th>Published</th><th>Actions</th></tr></thead><tbody id="projects-table"></tbody></table></div></section>
      <section class="dashboard-section" id="comments"><div class="section-title"><div><p class="admin-kicker">Community inbox</p><h2>Comments</h2><p class="section-helper">Approve useful feedback before it appears publicly.</p></div></div><div class="comment-list" id="comments-list"></div></section>
      </main>
    </div>
    <div class="admin-modal" id="project-modal" hidden><div class="admin-modal-card"><button class="modal-close" id="close-project-modal">×</button><p class="admin-kicker">Project editor</p><h2 id="project-modal-title">Add project</h2><form id="project-form" class="project-form"><input name="id" type="hidden" /><div class="form-grid"><label>Project ID<input name="project_id" required placeholder="well-log-insight" /></label><label>Title<input name="title" required placeholder="WellLog Insight" /></label><label>Category<input name="category" required placeholder="Reservoir" /></label><label>Status<input name="status" required placeholder="In progress" /></label><label>Metric<input name="metric" required placeholder="12" /></label><label>Metric label<input name="metric_label" required placeholder="wells reviewed" /></label><label>Accent<select name="accent"><option value="teal">Teal</option><option value="orange">Orange</option><option value="purple">Purple</option></select></label><label>Icon<input name="icon" required placeholder="⌁" /></label></div><label>Description<textarea name="description" rows="2" required></textarea></label><label>Tags, comma-separated<input name="tags" required placeholder="Petrophysics, Python, Excel" /></label><label>Tools<input name="tools" required /></label><label>Method<textarea name="method" rows="3" required></textarea></label><label>Outcome<textarea name="outcome" rows="3" required></textarea></label><label>Project or field picture<input name="project_image" type="file" accept="image/*" /></label><label class="checkbox-label"><input name="published" type="checkbox" /> Publish on portfolio</label><button class="admin-button primary" type="submit">Save project</button></form></div></div>
  `
}

const loadData = async () => {
  if (!client) return
  const [projectResult, commentResult] = await Promise.all([
    client.from('projects').select('*').order('sort_order'),
    client.from('comments').select('*').order('created_at', { ascending: false }),
  ])
  if (projectResult.error) throw projectResult.error
  if (commentResult.error) throw commentResult.error
  projects = projectResult.data as ProjectRecord[]
  comments = commentResult.data as CommentRecord[]
}

const renderProjectRows = () => {
  const table = document.querySelector<HTMLTableSectionElement>('#projects-table')
  if (!table) return
  table.innerHTML = projects
    .map(
      (project) => `
        <tr>
          <td><strong>${escapeHtml(project.title)}</strong><small>${escapeHtml(project.id)}</small></td>
          <td>${escapeHtml(project.category)}</td>
          <td><span class="pill">${escapeHtml(project.status)}</span></td>
          <td><span class="publish-state ${project.published ? 'published' : ''}">${project.published ? 'Published' : 'Draft'}</span></td>
          <td><button class="table-action edit-project" data-project-id="${escapeHtml(project.id)}">Edit</button><button class="table-action delete-project" data-project-id="${escapeHtml(project.id)}">Delete</button></td>
        </tr>
      `,
    )
    .join('')
  document.querySelector<HTMLElement>('#project-count')!.textContent = String(projects.filter((project) => project.published).length)
}

const renderComments = () => {
  const list = document.querySelector<HTMLDivElement>('#comments-list')
  if (!list) return
  const pending = comments.filter((comment) => comment.status === 'pending')
  document.querySelector<HTMLElement>('#comment-count')!.textContent = String(pending.length)
  const sidebarCount = document.querySelector<HTMLElement>('#sidebar-comment-count')
  if (sidebarCount) sidebarCount.textContent = String(pending.length)
  list.innerHTML = comments.length
    ? comments
        .map(
          (comment) => `
          <article class="comment-item">
            <div><strong>${escapeHtml(comment.name)}</strong><small>${escapeHtml(comment.email)} · ${new Date(comment.created_at).toLocaleDateString()}</small><p>${escapeHtml(comment.message)}</p></div>
            <div class="comment-actions"><span class="comment-status ${comment.status}">${comment.status}</span>${comment.status === 'pending' ? `<button class="table-action approve-comment" data-comment-id="${comment.id}">Approve</button>` : ''}<button class="table-action delete-comment" data-comment-id="${comment.id}">Delete</button></div>
          </article>
        `,
        )
        .join('')
    : '<p class="empty-admin">No comments yet.</p>'
}

const fillProjectForm = (project?: ProjectRecord) => {
  const form = document.querySelector<HTMLFormElement>('#project-form')
  const title = document.querySelector<HTMLHeadingElement>('#project-modal-title')
  if (!form || !title) return
  title.textContent = project ? 'Edit project' : 'Add project'
  form.reset()
  const set = (name: string, value: string) => {
    const input = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
    if (input) input.value = value
  }
  if (project) {
    set('id', project.id)
    set('project_id', project.id)
    set('title', project.title)
    set('category', project.category)
    set('status', project.status)
    set('metric', project.metric)
    set('metric_label', project.metric_label)
    set('accent', project.accent)
    set('icon', project.icon)
    set('description', project.description)
    set('tags', project.tags.join(', '))
    set('tools', project.tools)
    set('method', project.method)
    set('outcome', project.outcome)
    const imageInput = form.elements.namedItem('project_image') as HTMLInputElement
    imageInput.value = ''
    const published = form.elements.namedItem('published') as HTMLInputElement
    published.checked = project.published
    ;(form.elements.namedItem('project_id') as HTMLInputElement).readOnly = true
  } else {
    ;(form.elements.namedItem('project_id') as HTMLInputElement).readOnly = false
  }
}

const renderDashboard = async () => {
  dashboardView()
  try {
    await loadData()
    renderProjectRows()
    renderComments()
  } catch (error) {
    console.error('Unable to load dashboard data.', error)
    document.querySelector<HTMLDivElement>('#projects-table')!.innerHTML = '<tr><td colspan="5" class="form-error">Unable to load data. Run supabase/schema.sql and check your environment variables.</td></tr>'
  }

  document.querySelector('#sign-out')?.addEventListener('click', async () => {
    await client?.auth.signOut()
    loginView()
  })
  document.querySelector('#refresh-projects')?.addEventListener('click', async () => {
    await loadData()
    renderProjectRows()
    renderComments()
  })
  document.querySelector('#new-project')?.addEventListener('click', () => {
    fillProjectForm()
    document.querySelector<HTMLElement>('#project-modal')!.hidden = false
  })
  document.querySelector('#close-project-modal')?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#project-modal')!.hidden = true
  })
  document.querySelector('#project-form')?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const data = new FormData(form)
    const projectId = String(data.get('project_id'))
    let imageUrl = projects.find((project) => project.id === projectId)?.image_url ?? null
    const image = (form.elements.namedItem('project_image') as HTMLInputElement).files?.[0]
    if (image) {
      if (!image.type.startsWith('image/')) {
        console.error('Project media must be an image.')
        return
      }
      if (image.size > 10 * 1024 * 1024) {
        console.error('Project media must be 10 MB or smaller.')
        return
      }
      const path = `projects/${projectId}/${Date.now()}-${image.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
      const upload = await client!.storage.from('portfolio-media').upload(path, image, { upsert: false, contentType: image.type })
      if (upload.error) {
        console.error('Unable to upload project media.', upload.error)
        return
      }
      imageUrl = client!.storage.from('portfolio-media').getPublicUrl(path).data.publicUrl
    }
    const record = {
      id: projectId,
      title: String(data.get('title')),
      category: String(data.get('category')),
      status: String(data.get('status')),
      metric: String(data.get('metric')),
      metric_label: String(data.get('metric_label')),
      accent: String(data.get('accent')),
      icon: String(data.get('icon')),
      description: String(data.get('description')),
      tags: String(data.get('tags')).split(',').map((tag) => tag.trim()).filter(Boolean),
      tools: String(data.get('tools')),
      method: String(data.get('method')),
      outcome: String(data.get('outcome')),
      image_url: imageUrl,
      published: data.get('published') === 'on',
      sort_order: projects.find((project) => project.id === String(data.get('project_id')))?.sort_order ?? projects.length + 1,
    }
    const { error } = await client!.from('projects').upsert(record)
    if (error) {
      console.error('Unable to save project.', error)
      return
    }
    document.querySelector<HTMLElement>('#project-modal')!.hidden = true
    await loadData()
    renderProjectRows()
  })
  document.querySelector('#cv-form')?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const file = (form.elements.namedItem('cv') as HTMLInputElement).files?.[0]
    const status = document.querySelector<HTMLElement>('#cv-status')
    if (!file || file.type !== 'application/pdf') {
      if (status) status.textContent = 'Choose a PDF CV file.'
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      if (status) status.textContent = 'The CV must be 10 MB or smaller.'
      return
    }
    const upload = await client!.storage.from('portfolio-media').upload('cv/current.pdf', file, { upsert: true, contentType: 'application/pdf', cacheControl: '0' })
    if (upload.error) {
      console.error('Unable to upload CV.', upload.error)
      if (status) status.textContent = 'Upload failed. Check the Storage bucket and policies.'
      return
    }
    const cvUrl = client!.storage.from('portfolio-media').getPublicUrl('cv/current.pdf').data.publicUrl
    const { error } = await client!.from('profile').upsert({ id: 1, cv_url: cvUrl })
    if (error) {
      console.error('Unable to save CV URL.', error)
      if (status) status.textContent = 'The file uploaded, but its public link could not be saved.'
      return
    }
    if (status) status.textContent = 'CV replaced successfully.'
    form.reset()
  })
  document.querySelectorAll<HTMLButtonElement>('.edit-project').forEach((button) => {
    button.addEventListener('click', () => {
      fillProjectForm(projects.find((project) => project.id === button.dataset.projectId))
      document.querySelector<HTMLElement>('#project-modal')!.hidden = false
    })
  })
  document.querySelectorAll<HTMLButtonElement>('.delete-project').forEach((button) => {
    button.addEventListener('click', async () => {
      if (!confirm('Delete this project and its comments?')) return
      const { error } = await client!.from('projects').delete().eq('id', button.dataset.projectId)
      if (error) {
        console.error('Unable to delete project.', error)
        return
      }
      await loadData()
      renderProjectRows()
      renderComments()
    })
  })
  document.querySelectorAll<HTMLButtonElement>('.approve-comment').forEach((button) => {
    button.addEventListener('click', async () => {
      const { error } = await client!.from('comments').update({ status: 'approved' }).eq('id', button.dataset.commentId)
      if (error) {
        console.error('Unable to approve comment.', error)
        return
      }
      await loadData()
      renderComments()
    })
  })
  document.querySelectorAll<HTMLButtonElement>('.delete-comment').forEach((button) => {
    button.addEventListener('click', async () => {
      const { error } = await client!.from('comments').delete().eq('id', button.dataset.commentId)
      if (error) {
        console.error('Unable to delete comment.', error)
        return
      }
      await loadData()
      renderComments()
    })
  })
}

if (!client) {
  loginView('Connect Supabase first by creating a .env.local file from .env.example.')
} else {
  client.auth.getSession().then(({ data }) => {
    if (data.session) {
      renderDashboard()
    } else {
      loginView()
    }
  })
}
