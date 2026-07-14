import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { experience } from '../data/profile'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="experience" title="Where I've worked">
      <ol className="relative space-y-8 border-l border-line pl-6">
        {experience.map((job) => (
          <li key={`${job.role}-${job.company}`} className="relative">
            <span
              className="bg-grad absolute -left-[1.85rem] top-2 h-3 w-3 rounded-full"
              aria-hidden="true"
            />
            <article
              onMouseMove={cardGlow}
              className="glow-card reveal rounded-2xl border border-line bg-panel p-6"
            >
              <p className="font-mono text-xs text-vio">{job.period}</p>
              <h3 className="mt-2 text-lg font-bold">{job.role}</h3>
              <p className="text-sm text-mut">{job.company}</p>
              <p className="mt-3 text-sm text-mut">{job.summary}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-mut">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
