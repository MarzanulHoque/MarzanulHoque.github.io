import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { experience } from '../data/profile'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="CAREER & TRACK RECORD" title="Engineering Experience">
      <ol className="relative space-y-8 border-l border-slate-200 pl-6 dark:border-line/80">
        {experience.map((job) => (
          <li key={`${job.role}-${job.company}`} className="relative">
            <span
              className="absolute -left-[1.85rem] top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-sm shadow-emerald-500/50 dark:border-panel dark:bg-emerald-400 dark:shadow-emerald-400/50"
              aria-hidden="true"
            />
            <article
              onMouseMove={cardGlow}
              className="glow-card reveal rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:border-slate-400 hover:shadow-md dark:border-line dark:bg-panel dark:hover:border-slate-700 dark:shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-line/60">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-fg">{job.role}</h3>
                  <p className="font-mono text-xs font-semibold text-sky-700 mt-0.5 dark:text-cyan-400">{job.company}</p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-xs text-slate-700 dark:border-line dark:bg-panel-2 dark:text-mut">
                  {job.period}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-800 font-medium dark:text-fg/90">{job.summary}</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-mut">
                {job.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold mt-0.5">➜</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
