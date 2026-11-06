import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { skillGroups } from '../data/profile'

const rackDescriptions: Record<string, string> = {
  Languages: 'Core programming runtimes & language syntax',
  Frontend: 'Component architecture & reactive client UI',
  Backend: 'RESTful APIs, Clean Architecture, CQRS & ORMs',
  Databases: 'Relational schemas, queries & persistence engines',
  'Cloud & DevOps': 'Linux systemd, container orchestration & CI/CD',
  'Tools & Practices': 'Git source control, debugging & project management',
  'AI Tools & Assistants': 'AI-accelerated coding & terminal automation',
}

export default function Skills() {
  return (
    <Section id="skills" eyebrow="INFRASTRUCTURE & CODE" title="Technical Capabilities & Racks">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const isAiRack = index === 6

          return (
            <article
              key={group.title}
              onMouseMove={cardGlow}
              className={`glow-card reveal rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md dark:border-line dark:bg-panel dark:hover:border-slate-700 dark:shadow-none ${
                isAiRack
                  ? 'sm:col-span-2 lg:col-span-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
                  : 'flex flex-col'
              }`}
            >
              <div className={isAiRack ? 'md:max-w-md' : ''}>
                {/* Top Rack Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-line/60">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-mut">
                    RACK 0{index + 1}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                    ONLINE
                  </span>
                </div>

                {/* Category Title - Uniform spacing and baseline across all cards */}
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-fg">
                  {group.title}
                </h3>

                {/* Subtitle / Scope descriptor */}
                <p className="mt-1 text-xs text-slate-500 dark:text-mut">
                  {rackDescriptions[group.title] || 'Production engineering technologies'}
                </p>
              </div>

              {/* Skills Pills - Consistent top-margin immediately below subtitle */}
              <ul className={`flex flex-wrap gap-1.5 ${isAiRack ? 'mt-2 md:mt-0' : 'mt-4'}`}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 dark:border-line/80 dark:bg-panel-2 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
