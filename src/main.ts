import './style.css'

type Project = {
  id: string
  title: string
  description: string
  category: string
  status: string
  metric: string
  metricLabel: string
  tags: string[]
  accent: string
  icon: string
}

const projects: Project[] = [
  {
    id: 'gridwatch',
    title: 'WellLog Insight',
    description: 'A study of well-log data to identify lithology and estimate reservoir properties.',
    category: 'Reservoir',
    status: 'In progress',
    metric: '12',
    metricLabel: 'wells reviewed',
    tags: ['Petrophysics', 'Python', 'Excel'],
    accent: 'teal',
    icon: '⌁',
  },
  {
    id: 'atlas',
    title: 'CoreLab Notes',
    description: 'A practical record of core analysis, porosity, permeability, and fluid-property studies.',
    category: 'Formation',
    status: 'Open for feedback',
    metric: '08',
    metricLabel: 'lab studies',
    tags: ['Core Analysis', 'PVT', 'Reports'],
    accent: 'orange',
    icon: '◈',
  },
  {
    id: 'flowbench',
    title: 'Field Development Plan',
    description: 'A student field-development study connecting well placement, production forecasts, and recovery.',
    category: 'Production',
    status: 'Draft study',
    metric: '3',
    metricLabel: 'scenarios compared',
    tags: ['Reservoir Eng.', 'Eclipse', 'Mapping'],
    accent: 'purple',
    icon: '◌',
  },
]

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root element was not found.')
}

const projectCard = (project: Project) => `
  <article class="project-card" data-category="${project.category}" data-project="${project.id}">
    <div class="project-visual ${project.accent}">
      <span class="visual-grid"></span>
      <span class="visual-icon">${project.icon}</span>
      <span class="visual-label">PROJECT / 0${projects.indexOf(project) + 1}</span>
      <span class="visual-line"></span>
    </div>
    <div class="card-content">
      <div class="card-topline">
        <span class="eyebrow">${project.category}</span>
        <span class="status"><i></i>${project.status}</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="metric"><strong>${project.metric}</strong><span>${project.metricLabel}</span></div>
      <div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      <div class="project-actions">
        <button class="text-button view-project" data-project-id="${project.id}" data-project-action="view">View project <span>↗</span></button>
        <button class="text-button comment-project" data-project-id="${project.id}" data-project-action="comment">Comment <span>✎</span></button>
      </div>
    </div>
  </article>
`

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="RICH Engineering home">
      <span class="brand-mark">R</span>
      <span><b>RICH</b><small>PETROLEUM / STUDENT</small></span>
    </a>
    <nav aria-label="Main navigation">
      <a class="active" href="#work">Work</a>
      <a href="#about">About</a>
      <a href="#notes">Notes</a>
    </nav>
    <button class="outline-button" data-modal="collaborate">Start a conversation <span>↗</span></button>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="kicker"><span></span> Petroleum engineering student</p>
        <h1>Learning the<br /><em>language of the subsurface.</em></h1>
        <p class="hero-description">A portfolio of coursework, field studies, and practical projects exploring reservoirs, wells, and the decisions that bring energy from the ground to the surface.</p>
        <div class="hero-actions">
          <a class="primary-button" href="#work">Explore the work <span>↓</span></a>
          <a class="quiet-link" href="#about">More about me <span>↗</span></a>
        </div>
      </div>
      <div class="hero-diagram" aria-label="Abstract engineering diagram">
        <div class="diagram-orbit orbit-one"></div>
        <div class="diagram-orbit orbit-two"></div>
        <div class="diagram-core"><span>R</span></div>
        <span class="diagram-node node-one"></span><span class="diagram-node node-two"></span><span class="diagram-node node-three"></span>
        <span class="diagram-note note-one">SYSTEMS<br />THINKING</span>
        <span class="diagram-note note-two">01 — 06</span>
        <span class="crosshair cross-one">+</span><span class="crosshair cross-two">+</span>
      </div>
    </section>

    <section class="signal-bar">
      <div><span class="signal-dot"></span> Currently exploring <strong>reservoir behavior, well performance &amp; field development</strong></div>
      <span class="signal-line"></span>
      <div class="signal-right">Scroll to explore <span>↓</span></div>
    </section>

    <section class="work-section" id="work">
      <div class="section-heading">
        <div><p class="kicker"><span></span> Selected work</p><h2>Ideas in motion.</h2></div>
        <p>A few things I’m thinking about, testing, and making real. Every project is open to thoughtful feedback.</p>
      </div>
      <div class="work-toolbar">
        <div class="filters" role="group" aria-label="Filter projects">
          <button class="filter active" data-filter="All">All projects <span>03</span></button>
          <button class="filter" data-filter="Reservoir">Reservoir <span>01</span></button>
          <button class="filter" data-filter="Formation">Formation <span>01</span></button>
          <button class="filter" data-filter="Production">Production <span>01</span></button>
        </div>
        <label class="search"><span>⌕</span><input id="project-search" type="search" placeholder="Search projects" /></label>
      </div>
      <div class="project-grid" id="project-grid">${projects.map(projectCard).join('')}</div>
      <div class="view-all"><button class="text-button" id="show-all">View all projects <span>↗</span></button><span>03 / 03</span></div>
    </section>

    <section class="manifesto" id="about">
      <div><p class="kicker"><span></span> The approach</p><h2>Stay curious.<br /><em>Think in systems.</em></h2></div>
      <div class="manifesto-copy"><p>I’m a petroleum engineering student building a clear record of what I’m learning — from rock and fluid properties to reservoir decisions and production strategy.</p><p>This site is a study desk, not a showroom. If you spot a better method, have field experience to share, or want to discuss a project, <a href="#notes">leave a note</a>.</p><a class="quiet-link" href="#notes">Read the field notes <span>↗</span></a></div>
    </section>

    <section class="notes-section" id="notes">
      <div class="section-heading"><div><p class="kicker"><span></span> From the workbench</p><h2>Field notes.</h2></div><button class="outline-button" data-modal="note">Leave a note <span>↗</span></button></div>
      <div class="notes-grid">
        <article class="note-card"><span class="note-number">01</span><p class="eyebrow">On process / 06.14.24</p><h3>The first prototype is a question, not an answer.</h3><a href="#notes" class="quiet-link">Read note <span>↗</span></a></article>
        <article class="note-card"><span class="note-number">02</span><p class="eyebrow">On systems / 05.28.24</p><h3>Designing for the failure you haven’t seen yet.</h3><a href="#notes" class="quiet-link">Read note <span>↗</span></a></article>
        <article class="note-card dark"><span class="note-number">03</span><p class="eyebrow">Open invitation</p><h3>Have a field insight or a useful question?</h3><button class="text-button" data-modal="note">Start a thread <span>↗</span></button></article>
      </div>
    </section>
  </main>
  <footer><span>© 2024 RICH / PETROLEUM ENGINEERING</span><span>Learning in public, with intent.</span><a href="#top">Back to top ↑</a></footer>
  <div class="modal-backdrop" id="modal" hidden><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" aria-label="Close dialog">×</button><p class="kicker"><span></span> Open channel</p><h2 id="modal-title">Let’s build<br /><em>from the field.</em></h2><p class="modal-intro" id="modal-intro">Share a question, an idea, or a project you’d like to work on together.</p><form id="contact-form"><label>Your name<input name="name" required placeholder="Ada Lovelace" /></label><label>Email address<input name="email" type="email" required placeholder="ada@example.com" /></label><label>Your comment<textarea name="message" rows="4" required placeholder="I’ve been thinking about..."></textarea></label><button class="primary-button" type="submit">Send comment <span>↗</span></button></form></div></div>
`

const grid = document.querySelector<HTMLDivElement>('#project-grid')!
const search = document.querySelector<HTMLInputElement>('#project-search')!
const filters = document.querySelectorAll<HTMLButtonElement>('.filter')
const modal = document.querySelector<HTMLDivElement>('#modal')!
const modalTitle = document.querySelector<HTMLHeadingElement>('#modal-title')!
const modalIntro = document.querySelector<HTMLParagraphElement>('#modal-intro')!

const renderProjects = (filter = 'All', query = '') => {
  const term = query.toLowerCase()
  const filtered = projects.filter((project) => (filter === 'All' || project.category === filter) && `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase().includes(term))
  grid.innerHTML = filtered.length ? filtered.map(projectCard).join('') : '<p class="empty-state">No projects match that search yet.</p>'
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'))
    button.classList.add('active')
    renderProjects(button.dataset.filter ?? 'All', search.value)
  })
})

search.addEventListener('input', () => {
  const active = document.querySelector<HTMLButtonElement>('.filter.active')
  renderProjects(active?.dataset.filter ?? 'All', search.value)
})

document.querySelector<HTMLButtonElement>('#show-all')!.addEventListener('click', () => {
  filters.forEach((item) => item.classList.toggle('active', item.dataset.filter === 'All'))
  search.value = ''
  renderProjects()
})

const openModal = (title = 'Let’s build', intro = 'Share a question, an idea, or a project you’d like to work on together.') => {
  modalTitle.innerHTML = `${title}<br /><em>from the field.</em>`
  modalIntro.textContent = intro
  modal.hidden = false
  document.body.classList.add('modal-open')
  modal.querySelector<HTMLInputElement>('input')?.focus()
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  const modalTrigger = target.closest<HTMLElement>('[data-modal]')
  const projectTrigger = target.closest<HTMLElement>('[data-project-id]')
  if (modalTrigger) openModal(modalTrigger.dataset.modal === 'note' ? 'Start a thread' : undefined)
  if (projectTrigger) {
    const project = projects.find((item) => item.id === projectTrigger.dataset.projectId)
    if (project) {
      const isComment = projectTrigger.dataset.projectAction === 'comment'
      openModal(isComment ? `Comment on ${project.title}` : project.title, isComment ? `Share feedback or ask a question about ${project.title}.` : undefined)
    }
  }
  if (target.closest('.modal-close') || target === modal) {
    modal.hidden = true
    document.body.classList.remove('modal-open')
  }
})

document.querySelector<HTMLFormElement>('#contact-form')!.addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget as HTMLFormElement
  form.innerHTML = '<div class="success-message"><span>✓</span><h3>Message received.</h3><p>Thanks for reaching out. I’ll get back to you soon.</p></div>'
})
