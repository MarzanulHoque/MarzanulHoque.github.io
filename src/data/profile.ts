// ─────────────────────────────────────────────────────────────────────────────
// ALL site content lives here. Replace every placeholder with your own info —
// components never hardcode content. See PORTFOLIO_KNOWLEDGEBASE.md §4 / §14.
// ─────────────────────────────────────────────────────────────────────────────

export const identity = {
  name: 'Marzanul Hoque',
  role: 'Software Engineer',
  pitch: 'I build fast, reliable web applications end to end.',
  availability: 'Currently available for new opportunities.',
}

export const links = {
  github: 'https://github.com/MarzanulHoque',
  linkedin: 'https://www.linkedin.com/in/USERNAME/',
  upwork: '', // optional — leave '' to hide it in Contact
  email: 'you@example.com',
}

// Hero stats (value + label). Keep to ~3.
export const stats = [
  { value: '0+', label: 'years of experience' },
  { value: '0', label: 'projects shipped' },
  { value: '0', label: 'technologies used' },
]

export const about = [
  'Paragraph one — who you are and what you build.',
  'Paragraph two — how you work and what you care about.',
  "Paragraph three — what you're open to (roles, freelance, collaboration).",
]

export const skillGroups = [
  { title: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python'] },
  { title: 'Frontend', skills: ['React', 'Tailwind CSS', 'Vite'] },
  { title: 'Backend', skills: ['Node.js', 'REST APIs', 'PostgreSQL'] },
  { title: 'Tools & Practices', skills: ['Git', 'GitHub Actions', 'Testing'] },
]

export const experience = [
  {
    role: 'Your Role',
    company: 'Company Name',
    period: 'Start — Present',
    summary: 'One line on your scope and impact in this role.',
    points: [
      'Achievement or responsibility (ideally with a number).',
      'Another concrete bullet.',
    ],
  },
]

export const projects = [
  {
    name: 'Project Name',
    context: 'What it is · Where',
    description: 'One paragraph: what it does and what you built.',
    stack: ['Tech', 'Tech', 'Tech'],
  },
]

// ── Optional sections: delete an array (and its section in App.tsx) if unused ──

export const openSource = [
  {
    name: 'repo-name',
    description: 'One line on what it is.',
    url: 'https://github.com/MarzanulHoque/repo',
    language: 'Language',
  },
]

export const testimonials = [
  {
    project: 'Engagement title',
    period: 'Year',
    rating: 5.0,
    endorsements: ['Tag'],
    quotes: ['Client quote.'],
  },
]

export const education = [
  {
    degree: 'Your Degree',
    institution: 'Institution Name',
    location: 'City, Country',
  },
]
