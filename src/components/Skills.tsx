import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { skillGroups } from '../data/profile'

export default function Skills() {
  return (
    <Section id="skills" eyebrow="INFRASTRUCTURE & CODE" title="Technical Capabilities & Racks">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <article
            key={group.title}
            onMouseMove={cardGlow}
            className="glow-card reveal flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md dark:border-line dark:bg-panel dark:hover:border-slate-700 dark:shadow-none"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5 dark:border-line/60">
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-mut">
                  Rack 0{index + 1}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-fg">{group.title}</h3>
            </div>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 dark:border-line/80 dark:bg-panel-2 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
