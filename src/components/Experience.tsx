import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { experience } from '../data/profile'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="CAREER & TRACK RECORD" title="Engineering Experience">
      <ol className="relative space-y-8 border-l border-line/80 pl-6">
        {experience.map((job) => (
          <li key={`${job.role}-${job.company}`} className="relative">
            <span
              className="absolute -left-[1.85rem] top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-panel bg-emerald-400 shadow-sm shadow-emerald-400/50"
              aria-hidden="true"
            />
            <article
              onMouseMove={cardGlow}
              className="glow-card reveal rounded-2xl border border-line bg-panel p-6 shadow-sm transition-all hover:border-slate-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-fg">{job.role}</h3>
                  <p className="font-mono text-xs font-semibold text-cyan-400 mt-0.5">{job.company}</p>
                </div>
                <span className="rounded-full border border-line bg-panel-2 px-3 py-1 font-mono text-xs text-mut">
                  {job.period}
                </span>
              </div>

              <p className="mt-3 text-sm text-fg/90 font-medium">{job.summary}</p>

              <ul className="mt-4 space-y-2 text-sm text-mut">
                {job.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 text-xs font-bold mt-0.5">➜</span>
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
