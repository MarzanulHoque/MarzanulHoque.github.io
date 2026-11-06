import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { skillGroups } from '../data/profile'

export default function Skills() {
  // Separate the extensive Cloud & DevOps group to give it a featured rack span
  const cloudGroup = skillGroups.find((g) => g.title.toLowerCase().includes('cloud')) || skillGroups[4]
  const standardGroups = skillGroups.filter((g) => g !== cloudGroup)

  return (
    <Section id="skills" eyebrow="INFRASTRUCTURE & CODE" title="Technical Capabilities & Systems Racks">
      <div className="space-y-4">
        {/* Featured Rack: Cloud, DevOps & Linux Infrastructure (Spans Full Width) */}
        {cloudGroup && (
          <article
            onMouseMove={cardGlow}
            className="glow-card reveal rounded-2xl border border-emerald-300 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-emerald-500 hover:shadow-md dark:border-emerald-500/30 dark:bg-panel dark:hover:border-emerald-500/60 dark:shadow-none"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-line/60">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-emerald-700 dark:text-emerald-400">
                  RACK 00 // CORE INFRASTRUCTURE
                </span>
                <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs font-bold text-slate-900 dark:text-fg">{cloudGroup.title}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Primary Cloud Specialization
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-500 dark:text-mut">
              Production containerization, Linux daemon supervision, CI/CD automation, and cloud networking.
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {cloudGroup.skills.map((skill) => (
                <li
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs font-medium text-slate-800 transition-all hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 dark:border-line/80 dark:bg-panel-2 dark:text-slate-200 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
                >
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">▸</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </article>
        )}

        {/* 6 Symmetrical Standard Racks (2 rows of 3 on desktop) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {standardGroups.map((group, index) => (
            <article
              key={group.title}
              onMouseMove={cardGlow}
              className="glow-card reveal flex min-h-[160px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md dark:border-line dark:bg-panel dark:hover:border-slate-700 dark:shadow-none"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5 dark:border-line/60">
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest dark:text-mut">
                    RACK 0{index + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-fg">{group.title}</h3>
              </div>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 dark:border-line/80 dark:bg-panel-2 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
