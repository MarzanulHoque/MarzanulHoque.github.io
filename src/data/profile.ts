// ─────────────────────────────────────────────────────────────────────────────
// ALL site content lives here. Replace every placeholder with your own info —
// components never hardcode content. See PORTFOLIO_KNOWLEDGEBASE.md §4 / §14.
// ─────────────────────────────────────────────────────────────────────────────

export const identity = {
  name: 'S. M. Marzanul Hoque',
  role: 'Junior Software Engineer',
  pitch: 'Software engineer specializing in C#, .NET Core, JavaScript, Entity Framework Core, MySQL, Docker, Linux, and AWS cloud infrastructure. I enjoy building scalable, high-performance applications and continuously expanding my expertise in modern software development and DevOps practices.',
  availability: 'Currently available for new opportunities.',
}

export const links = {
  github: 'https://github.com/marzanulhoque',
  linkedin: 'https://www.linkedin.com/in/marzanulhoque/',
 // upwork: '', // optional — leave '' to hide it in Contact
  email: 'marzanulhoque.cseru@gmail.com',
}

// Hero stats (value + label). Keep to ~3.
export const stats = [
  { value: '2+', label: 'years of experience' },
  { value: '2', label: 'projects shipped' },
  { value: '10+', label: 'technologies used' },
]

export const about = [
  "I'm a Junior Software Engineer at Bizzntek Ltd., building web applications with .NET Core, C#, Entity Framework Core, and MySQL — from RESTful APIs and database design to the Angular front ends that consume them.",
  'I care about clean, maintainable architecture and measurable performance: refactoring for readability, adding caching to cut server load, and fixing critical bugs that keep production stable. I lean on AI-driven development tools like GitHub Copilot and Claude CLI to move faster without cutting corners.',
  "I'm open to roles and freelance work involving full-stack .NET/Angular development, API design, and cloud/DevOps work on AWS.",
]

export const skillGroups = [
  { title: 'Languages', skills: ['C#', 'JavaScript', 'Python', 'C', 'C++'] },
  { title: 'Frontend', skills: ['React', 'Angular'] },
  { title: 'Backend', skills: ['ASP.NET Core', '.NET MVC', 'Entity Framework Core', 'Dapper', 'REST APIs'] },
  { title: 'Databases', skills: ['MySQL', 'SQLite', 'SQL Server'] },
  { title: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Linux', 'CI/CD'] },
  { title: 'Tools & Practices', skills: ['Git', 'GitHub', 'Azure Repos', 'Visual Studio', 'Visual Studio Code', 'Postman'] },
  { title: 'AI Tools & Assistants', skills: ['GitHub Copilot', 'Claude CLI', 'AI-Driven Development'] },
]

export const experience = [
  {
    role: 'Junior Software Engineer',
    company: 'Bizzntek Ltd.',
    period: '05/2024 — Present',
    summary: 'Building and maintaining web applications end to end with .NET Core, MySQL, and Angular.',
    points: [
      'Enhanced a web application by improving user experience and reducing page load times using .NET Core MVC, Web API, jQuery, MySQL, and caching for optimized data retrieval and lower server load.',
      'Fixed multiple critical bugs that improved overall efficiency, strengthened system stability, and enhanced overall reliability of the platform.',
      'Refactored the codebase to improve maintainability, readability, and performance, creating a cleaner and more scalable architecture.',
      'Used Azure Boards to manage tasks, track progress, and collaborate effectively with the team for better transparency and workflow alignment.',
      'Gained hands-on experience across multiple applications, showcasing adaptability, teamwork, and continuous improvement in coding practices.',
    ],
  },
]

export const projects = [
  {
    name: 'Piramids',
    context: 'Enterprise ERP platform · Construction, rental & hospitality · Client project via Bizzntek Ltd. · Shipped',
    description: 'Key contributor to an enterprise ERP platform covering project management, customer onboarding, task scheduling, contract management, and financial workflows. Built and maintained secure RESTful APIs with server-side pagination, dynamic filtering, reporting, and dashboard endpoints for large datasets, optimized MySQL stored procedures and Dapper queries, added in-memory caching, and implemented menu-based access control and subscription-based feature management.',
    stack: ['ASP.NET Core 8', 'ASP.NET MVC', 'C#', 'Entity Framework Core', 'MySQL', 'JavaScript', 'jQuery'],
    links: [{ label: 'Live Site', url: 'https://piramids.com/' }],
  },
  {
    name: 'Altios GoGlobal — IC Management Platform',
    context: 'Enterprise global-mobility & payments platform · Client project via Bizzntek Ltd. · Shipped',
    description: 'Contributing to a three-tier .NET 8 platform (UI, business-logic API, and data-access API) for global contractor and vendor management, covering vendor invoicing, cross-border payments, and ERP integrations. Work spans the ASP.NET Core MVC front end, the business-logic layer, and the EF Core/MySQL data-access API, built on clean architecture with repository/unit-of-work patterns, JWT authentication, and encrypted inter-service communication.',
    stack: ['ASP.NET Core 8', 'C#', 'Entity Framework Core', 'MySQL', 'JWT', 'FluentValidation', 'AutoMapper', 'Quartz'],
  },
  {
    name: 'ShiftLedger',
    context: 'Bike service shop management system · Personal project',
    description: 'A shop-management tool for bike service businesses covering service job tracking, task-wise billing, and reporting. Built with Clean Architecture and CQRS (MediatR) on an ASP.NET Core/MySQL backend and a React 18 + TypeScript SPA, with JWT auth, Admin/Employee role-based access control, real-time notifications via SignalR, and PDF/Excel report exports.',
    stack: ['ASP.NET Core', 'C#', 'MediatR', 'MySQL', 'EF Core', 'React', 'TypeScript', 'Mantine', 'SignalR', 'JWT'],
    links: [
      { label: 'Client Repo', url: 'https://github.com/MarzanulHoque/ShiftLedger-Client' },
      { label: 'API Repo', url: 'https://github.com/MarzanulHoque/ShiftLedger-API' },
    ],
  },
  {
    name: 'HRMS — Enterprise HR & Payroll Management System',
    context: 'Personal project',
    description: 'RESTful APIs for employee, attendance, leave, and payroll management built with Clean Architecture, CQRS (MediatR), and the Repository Pattern. Added JWT authentication, role-based authorization, FluentValidation, and AutoMapper, paired with a responsive Angular app using lazy loading, route guards, reactive forms, and RxJS.',
    stack: ['ASP.NET Core', 'C#', 'Angular', 'TypeScript', 'SQLite', 'EF Core', 'MediatR', 'GitHub Copilot'],
    links: [{ label: 'GitHub', url: 'https://github.com/MarzanulHoque/HR-Payroll-Api' }],
  },
  {
    name: 'DateSphere',
    context: 'Full-stack dating platform · Personal project',
    description: 'Full-stack dating platform with JWT authentication, profile management, photo uploads, and SignalR-based real-time chat. Built as a responsive SPA with reusable Angular components, using Entity Framework Core with SQLite for development and SQL Server compatibility for production, with GitHub Actions CI/CD for automated build, test, and deploy.',
    stack: ['C#', 'ASP.NET Core', 'Angular', 'JavaScript', 'Entity Framework Core', 'SQLite', 'SQL Server', 'SignalR', 'GitHub Actions'],
    links: [{ label: 'GitHub', url: 'https://github.com/MarzanulHoque/DateSphere' }],
  }
]

// ── Optional sections: delete an array (and its section in App.tsx) if unused ──

export const education = [
  {
    degree: 'BSc in Computer Science & Engineering',
    institution: 'Rajshahi University',
    location: 'Rajshahi, Bangladesh',
  },
]
