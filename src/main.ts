import './style.css'
import { getProfile, getPublishedProjects, isSupabaseConfigured, supabase, type ProjectRecord } from './supabase'

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
  tools: string
  method: string
  outcome: string
  imageUrl: string | null
}

const defaultProjects: Project[] = [
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
    tools: 'Petrel concepts · Python · Excel',
    method: 'Compare gamma ray, resistivity, and density responses to interpret lithology across a small well set.',
    outcome: 'A repeatable interpretation workflow with clearer reservoir-property estimates.',
    imageUrl: null,
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
    tools: 'Core reports · PVT tables · Spreadsheets',
    method: 'Organize measured porosity and permeability alongside fluid-property observations from lab studies.',
    outcome: 'A practical reference for connecting core measurements to production decisions.',
    imageUrl: null,
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
    tools: 'Eclipse concepts · Mapping · Excel',
    method: 'Compare well-placement and recovery assumptions across three simplified development scenarios.',
    outcome: 'A transparent recommendation that shows the trade-offs behind the preferred plan.',
    imageUrl: null,
  },
]

let projects: Project[] = defaultProjects

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root element was not found.')
}

const projectCard = (project: Project) => `
  <article class="project-card motion-surface" data-category="${project.category}" data-project="${project.id}">
    <div class="project-card-inner">
      <div class="project-face project-front">
        <div class="project-visual ${project.accent}">
          ${project.imageUrl ? `<img class="project-image" src="${project.imageUrl}" alt="${project.title} field or project image" />` : '<span class="visual-grid"></span>'}
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
            <button class="text-button view-project" data-project-id="${project.id}" data-project-action="view">View details <span>↗</span></button>
            <button class="text-button flip-project" data-flip-project="${project.id}">Technical details <span>↻</span></button>
            <button class="text-button comment-project" data-project-id="${project.id}" data-project-action="comment">Comment <span>✎</span></button>
          </div>
        </div>
      </div>
      <div class="project-face project-back">
        <div class="technical-kicker"><span>TECHNICAL READOUT</span><strong>0${projects.indexOf(project) + 1}</strong></div>
        <h3>${project.title}<br /><em>under the surface.</em></h3>
        <dl class="technical-list">
          <div><dt>Tools</dt><dd>${project.tools}</dd></div>
          <div><dt>Method</dt><dd>${project.method}</dd></div>
          <div><dt>Outcome</dt><dd>${project.outcome}</dd></div>
        </dl>
        <div class="project-actions">
          <button class="text-button flip-project" data-flip-project="${project.id}">Back to overview <span>↺</span></button>
          <button class="text-button comment-project" data-project-id="${project.id}" data-project-action="comment">Comment <span>✎</span></button>
        </div>
      </div>
    </div>
  </article>
`

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="RICH Engineering home">
      <span class="brand-mark"><img src="/nav-engineering-mark.svg" alt="" aria-hidden="true"></span>
      <span><b>RICH</b><small>PETROLEUM / STUDENT</small></span>
    </a>
    <nav aria-label="Main navigation">
      <a class="active" href="#work">Work</a>
      <a href="/about.html">About</a>
      <a href="#notes">Notes</a>
    </nav>
    <div class="header-actions">
      <a class="admin-link" href="/admin.html" aria-label="Open admin login" title="Admin login">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.4 2.9 8.4 7 10 4.1-1.6 7-5.6 7-10V6l-7-3Z"/><path d="m9.5 12 1.7 1.7 3.5-3.5"/></svg>
      </a>
      <button class="outline-button" data-modal="collaborate">Start a conversation <span>↗</span></button>
    </div>
  </header>

  <main id="top">
    <section class="hero reveal-block">
      <div class="hero-copy">
        <p class="kicker"><span></span> Petroleum engineering student</p>
        <h1>Learning the<br /><em>language of the subsurface.</em></h1>
        <p class="hero-description">A portfolio of coursework, field studies, and practical projects exploring reservoirs, wells, and the decisions that bring energy from the ground to the surface.</p>
        <div class="hero-actions">
          <a class="primary-button" href="#work">Explore the work <span>↓</span></a>
          <a class="quiet-link" href="/about.html">More about me <span>↗</span></a>
        </div>
      </div>
      <div class="hero-diagram motion-surface motion-hero" aria-label="Abstract engineering diagram">
        <div class="wireframe-mesh" aria-hidden="true"></div>
        <div class="mesh-scanline" aria-hidden="true"></div>
        <div class="diagram-orbit orbit-one"></div>
        <div class="diagram-orbit orbit-two"></div>
        <div class="diagram-core"><span>R</span></div>
        <span class="diagram-node node-one"></span><span class="diagram-node node-two"></span><span class="diagram-node node-three"></span>
        <span class="diagram-note note-one">SYSTEMS<br />THINKING</span>
        <span class="diagram-note note-two">01 — 06</span>
        <span class="crosshair cross-one">+</span><span class="crosshair cross-two">+</span>
      </div>
    </section>

    <section class="signal-bar reveal-block">
      <div><span class="signal-dot"></span> Currently exploring <strong>reservoir behavior, well performance &amp; field development</strong></div>
      <span class="signal-line"></span>
      <div class="signal-right">Scroll to explore <span>↓</span></div>
    </section>

    <section class="work-section reveal-block" id="work">
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

    <section class="manifesto reveal-block" id="about">
      <div><p class="kicker"><span></span> The approach</p><h2>Stay curious.<br /><em>Think in systems.</em></h2></div>
      <div class="manifesto-copy"><p>I’m a petroleum engineering student building a clear record of what I’m learning — from rock and fluid properties to reservoir decisions and production strategy.</p><p>This site is a study desk, not a showroom. If you spot a better method, have field experience to share, or want to discuss a project, <a href="#notes">leave a note</a>.</p><a class="quiet-link" href="#notes">Read the field notes <span>↗</span></a></div>
    </section>

    <section class="notes-section reveal-block" id="notes">
      <div class="section-heading"><div><p class="kicker"><span></span> From the workbench</p><h2>Field notes.</h2></div><button class="outline-button" data-modal="note">Leave a note <span>↗</span></button></div>
      <div class="notes-grid">
        <article class="note-card"><span class="note-number">01</span><p class="eyebrow">On process / 06.14.24</p><h3>The first prototype is a question, not an answer.</h3><a href="#notes" class="quiet-link">Read note <span>↗</span></a></article>
        <article class="note-card"><span class="note-number">02</span><p class="eyebrow">On systems / 05.28.24</p><h3>Designing for the failure you haven’t seen yet.</h3><a href="#notes" class="quiet-link">Read note <span>↗</span></a></article>
        <article class="note-card dark"><span class="note-number">03</span><p class="eyebrow">Open invitation</p><h3>Have a field insight or a useful question?</h3><button class="text-button" data-modal="note">Start a thread <span>↗</span></button></article>
      </div>
    </section>
  </main>
  <footer><span>© 2026 RICH / PETROLEUM ENGINEERING</span><span>Learning in public, with intent.</span><a href="#top">Back to top ↑</a></footer>
  <div class="modal-backdrop" id="modal" hidden><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" aria-label="Close dialog">×</button><p class="kicker"><span></span> Open channel</p><h2 id="modal-title">Let’s build<br /><em>from the field.</em></h2><p class="modal-intro" id="modal-intro">Share a question, an idea, or a project you’d like to work on together.</p><div id="project-detail" hidden></div><form id="contact-form"><label>Your name<input name="name" required placeholder="Ada Lovelace" /></label><label>Email address<input name="email" type="email" required placeholder="ada@example.com" /></label><label>Your comment<textarea name="message" rows="4" required placeholder="I’ve been thinking about..."></textarea></label><button class="primary-button" type="submit">Send comment <span>↗</span></button></form></div></div>
`

const grid = document.querySelector<HTMLDivElement>('#project-grid')!
const search = document.querySelector<HTMLInputElement>('#project-search')!
const filters = document.querySelectorAll<HTMLButtonElement>('.filter')
const modal = document.querySelector<HTMLDivElement>('#modal')!
const modalTitle = document.querySelector<HTMLHeadingElement>('#modal-title')!
const modalIntro = document.querySelector<HTMLParagraphElement>('#modal-intro')!
const projectDetail = document.querySelector<HTMLDivElement>('#project-detail')!
const contactForm = document.querySelector<HTMLFormElement>('#contact-form')!
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let activeCommentProjectId: string | null = null

const toProject = (project: ProjectRecord): Project => ({
  id: project.id,
  title: project.title,
  description: project.description,
  category: project.category,
  status: project.status,
  metric: project.metric,
  metricLabel: project.metric_label,
  tags: project.tags,
  accent: project.accent,
  icon: project.icon,
  tools: project.tools,
  method: project.method,
  outcome: project.outcome,
  imageUrl: project.image_url,
})

const bindMotionSurface = (element: HTMLElement, intensity: number) => {
  if (prefersReducedMotion || element.dataset.motionBound === 'true') {
    return
  }
  element.dataset.motionBound = 'true'

  element.addEventListener('pointermove', (event) => {
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    element.style.setProperty('--tilt-x', `${x * intensity * 2}`)
    element.style.setProperty('--tilt-y', `${y * intensity * -2}`)
    element.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`)
    element.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`)
  })

  element.addEventListener('pointerleave', () => {
    element.style.setProperty('--tilt-x', '0')
    element.style.setProperty('--tilt-y', '0')
  })
}

const bindProjectMotion = () => {
  const cards = document.querySelectorAll<HTMLElement>('.project-card.motion-surface')
  cards.forEach((card) => bindMotionSurface(card, 7))
}

const renderProjects = (filter = 'All', query = '') => {
  const term = query.toLowerCase()
  const filtered = projects.filter((project) => (filter === 'All' || project.category === filter) && `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase().includes(term))
  grid.innerHTML = filtered.length ? filtered.map(projectCard).join('') : '<p class="empty-state">No projects match that search yet.</p>'
  bindProjectMotion()
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

const openModal = (title = 'Let’s build', intro = 'Share a question, an idea, or a project you’d like to work on together.', projectId: string | null = null) => {
  modalTitle.innerHTML = `${title}<br /><em>from the field.</em>`
  modalIntro.textContent = intro
  projectDetail.hidden = true
  projectDetail.innerHTML = ''
  contactForm.hidden = false
  activeCommentProjectId = projectId
  modal.hidden = false
  document.body.classList.add('modal-open')
  modal.querySelector<HTMLInputElement>('input')?.focus()
}

const openProjectDetail = (project: Project) => {
  modalTitle.innerHTML = `${project.title}<br /><em>under the surface.</em>`
  modalIntro.textContent = project.description
  projectDetail.innerHTML = `
    <div class="detail-grid">
      <div><span>Category</span><strong>${project.category}</strong></div>
      <div><span>Current status</span><strong>${project.status}</strong></div>
      <div><span>Tools</span><strong>${project.tools}</strong></div>
      <div><span>Method</span><strong>${project.method}</strong></div>
      <div><span>Outcome</span><strong>${project.outcome}</strong></div>
    </div>
    <button class="primary-button detail-comment" data-project-comment="${project.id}">Comment on this project <span>✎</span></button>
  `
  projectDetail.hidden = false
  contactForm.hidden = true
  activeCommentProjectId = null
  modal.hidden = false
  document.body.classList.add('modal-open')
}

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  const modalTrigger = target.closest<HTMLElement>('[data-modal]')
  const projectTrigger = target.closest<HTMLElement>('[data-project-id]')
  const flipTrigger = target.closest<HTMLButtonElement>('[data-flip-project]')
  const projectCommentTrigger = target.closest<HTMLElement>('[data-project-comment]')
  if (flipTrigger) {
    const card = flipTrigger.closest<HTMLElement>('.project-card')
    card?.classList.toggle('is-flipped')
    return
  }
  if (projectCommentTrigger) {
    const project = projects.find((item) => item.id === projectCommentTrigger.dataset.projectComment)
    if (project) {
      openModal(`Comment on ${project.title}`, `Share feedback or ask a question about ${project.title}.`, project.id)
    }
    return
  }
  if (modalTrigger) openModal(modalTrigger.dataset.modal === 'note' ? 'Start a thread' : undefined)
  if (projectTrigger) {
    const project = projects.find((item) => item.id === projectTrigger.dataset.projectId)
    if (project) {
      const isComment = projectTrigger.dataset.projectAction === 'comment'
      if (isComment) {
        openModal(`Comment on ${project.title}`, `Share feedback or ask a question about ${project.title}.`, project.id)
      } else {
        openProjectDetail(project)
      }
    }
  }
  if (target.closest('.modal-close') || target === modal) {
    modal.hidden = true
    document.body.classList.remove('modal-open')
  }
})

if (!prefersReducedMotion) {
  window.addEventListener(
    'scroll',
    () => {
      const scrollProgress = Math.min(window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1), 1)
      document.documentElement.style.setProperty('--scroll-camera', `${scrollProgress * 18}deg`)
      document.documentElement.style.setProperty('--scroll-depth', `${scrollProgress * 90}px`)
    },
    { passive: true },
  )
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget as HTMLFormElement
  const formData = new FormData(form)
  const submitComment = async () => {
    if (supabase && activeCommentProjectId) {
      const { error } = await supabase.from('comments').insert({
        project_id: activeCommentProjectId,
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      })
      if (error) {
        throw error
      }
    }
    form.innerHTML = '<div class="success-message"><span>✓</span><h3>Message received.</h3><p>Your note is now in the review queue. Thanks for contributing.</p></div>'
  }

  submitComment().catch((error: unknown) => {
    console.error('Unable to submit comment.', error)
    form.insertAdjacentHTML('beforeend', '<p class="form-error">We could not send your note. Please try again.</p>')
  })
})

if (isSupabaseConfigured) {
  getProfile()
    .then((profile) => {
      if (!profile?.cv_url) return
      document.querySelectorAll<HTMLAnchorElement>('a[href="/richmond-ayamga-cv.html"]').forEach((link) => {
        link.href = profile.cv_url as string
      })
    })
    .catch((error: unknown) => console.error('Unable to load public profile media.', error))
  getPublishedProjects()
    .then((remoteProjects) => {
      projects = remoteProjects.map(toProject)
      renderProjects()
    })
    .catch((error: unknown) => {
      console.error('Unable to load published projects from Supabase.', error)
    })
}

if (!prefersReducedMotion) {
  const heroSurface = document.querySelector<HTMLElement>('.motion-hero')
  if (heroSurface) {
    bindMotionSurface(heroSurface, 5)
  }
  bindProjectMotion()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.2 },
  )

  document.querySelectorAll<HTMLElement>('.reveal-block').forEach((item) => observer.observe(item))
}
