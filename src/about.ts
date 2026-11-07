import './about.css'

const app = document.querySelector<HTMLDivElement>('#profile-app')

if (!app) {
  throw new Error('Profile app root element was not found.')
}

app.innerHTML = `
  <header class="profile-header">
    <a class="profile-brand" href="/" aria-label="Back to RICH portfolio"><span>R</span><strong>RICH</strong><small>PETROLEUM / STUDENT</small></a>
    <nav aria-label="Profile navigation"><a href="/">Work</a><a class="active" href="/about.html">About</a><a href="/#notes">Notes</a></nav>
    <a class="profile-button" href="/richmond-ayamga-cv.html" download>Download CV <span>↓</span></a>
  </header>
  <main class="profile-main">
    <section class="profile-hero">
      <div class="profile-hero-copy">
        <p class="kicker"><span></span> The person behind the projects</p>
        <h1>Meet<br /><em>Richmond.</em></h1>
        <p class="lead">A petroleum engineering student learning how the subsurface works — and how thoughtful engineering can help build a healthier, greener future.</p>
        <div class="profile-actions"><a class="profile-button primary" href="/richmond-ayamga-cv.html" download>Download my CV <span>↓</span></a><a class="text-link" href="mailto:ayamrich25@gmail.com">Get in touch <span>↗</span></a></div>
      </div>
      <div class="identity-panel">
        <div class="identity-orbit orbit-a"></div><div class="identity-orbit orbit-b"></div><div class="identity-core">RA</div>
        <span class="identity-label label-top">RICHMOND AYAMGA</span><span class="identity-label label-bottom">UENR / PETROLEUM / 01—02</span>
      </div>
    </section>
    <section class="profile-grid">
      <div class="profile-section-intro"><p class="kicker"><span></span> At a glance</p><h2>Curious by<br /><em>default.</em></h2></div>
      <div class="profile-copy"><p>Richmond is a Level 100 Petroleum Engineering student at the University of Energy and Natural Resources in Sunyani, Ghana, progressing into Level 200.</p><p>He is interested in the relationship between energy, the earth, and human wellbeing — with a growing focus on petrophysics, reservoir engineering, green energy, and practical problem-solving.</p><p>His portfolio is a living record of projects, questions, and collaboration. It is a place to share work openly, learn from review, and keep moving forward.</p></div>
    </section>
    <section class="detail-band">
      <div><p class="kicker"><span></span> Current chapter</p><h2>Learning the<br /><em>right questions.</em></h2></div>
      <div class="detail-list"><div><span>Education</span><strong>University of Energy and Natural Resources</strong><small>Petroleum Engineering · Sunyani, Ghana</small></div><div><span>Stage</span><strong>Level 100 → Level 200</strong><small>Building a strong technical foundation</small></div><div><span>Values</span><strong>Good health · Green energy · Continuous learning</strong><small>Collaboration over isolation</small></div></div>
    </section>
    <section class="skills-section"><div class="section-heading"><div><p class="kicker"><span></span> What he is building</p><h2>Skills in<br /><em>motion.</em></h2></div><p>The foundations are growing through coursework, project experiments, conversations, and a willingness to keep asking better questions.</p></div><div class="skill-grid"><div class="skill-card"><span>01</span><strong>Petrophysics</strong><p>Reading rock and fluid signals to understand reservoir properties.</p></div><div class="skill-card"><span>02</span><strong>Reservoir engineering</strong><p>Thinking through pressure, recovery, wells, and development choices.</p></div><div class="skill-card"><span>03</span><strong>Creative thinking</strong><p>Looking for useful connections between technical problems and real needs.</p></div><div class="skill-card"><span>04</span><strong>Communication</strong><p>Making ideas clear enough to invite review, collaboration, and progress.</p></div></div></section>
    <section class="contact-panel"><div><p class="kicker"><span></span> Open channel</p><h2>Have a question,<br /><em>idea, or opportunity?</em></h2></div><div><p>Richmond is open to thoughtful conversations about petroleum engineering, green energy, learning, and collaboration.</p><a class="profile-button primary" href="mailto:ayamrich25@gmail.com">Email Richmond <span>↗</span></a><a class="phone-link" href="tel:+233559530510">+233 55 953 0510</a></div></section>
  </main>
  <footer><span>© 2024 RICHMOND AYAMGA</span><span>Petroleum engineering student / Ghana</span><a href="/">Back to work ↑</a></footer>
`
