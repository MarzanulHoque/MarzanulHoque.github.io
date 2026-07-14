// ─────────────────────────────────────────────────────────────────────────────
// ALL site content lives here. Replace every placeholder with your own info —
// components never hardcode content. See PORTFOLIO_KNOWLEDGEBASE.md §4 / §14.
// ─────────────────────────────────────────────────────────────────────────────

export const identity = {
  name: '<S. M. Marzanul Hoque/>',
  role: 'Junior Software Engineer',
  pitch: 'I develop end-to-end web applications, handling everything from databases and APIs to responsive user interfaces, deployment, and monitoring. I enjoy building scalable, high-performance solutions that solve real-world problems.',
  availability: 'Currently available for new opportunities.',
}

export const links = {
  github: 'https://github.com/MarzanulHoque',
  linkedin: 'https://www.linkedin.com/in/marzanulhoque/',
 // upwork: '', // optional — leave '' to hide it in Contact
  email: 'marzanulhoque.cseru@gmail.com',
}

// Hero stats (value + label). Keep to ~3.
export const stats = [
  { value: '2+', label: 'years of experience' },
  { value: '3', label: 'projects shipped' },
  { value: '8', label: 'technologies used' },
]

export const about = [
  'Paragraph one — who you are and what you build.',
  'Paragraph two — how you work and what you care about.',
  "Paragraph three — what you're open to (roles, freelance, collaboration).",
]

export const skillGroups = [
  { title: 'Languages', skills: ['C#', 'TypeScript', 'JavaScript', 'Python'] },
  { title: 'Frontend', skills: ['Angular', 'Tailwind CSS', 'Vite'] },
  { title: 'Backend', skills: ['ASP.NET','FastAPI','NestJs', 'REST APIs', 'MySQL'] },
  { title: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'CI/CD', 'Terraform','Kubernetes'] },
  { title: 'Tools & Practices', skills: ['Git', 'GitHub Actions','Visual Studio','Linux','Postman', 'Testing'] },
]

export const experience = [
  {
    role: 'Junior Software Engineer',
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
    degree: 'BSc in Computer Science and Engineering',
    institution: 'University of Rajshahi',
    location: 'Rajshahi, Bangladesh',
  },
]
