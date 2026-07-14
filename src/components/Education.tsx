import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { education } from '../data/profile'

export default function Education() {
  return (
    <Section id="education" eyebrow="education" title="Education">
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((entry) => (
          <article
            key={entry.degree}
            onMouseMove={cardGlow}
            className="glow-card reveal rounded-2xl border border-line bg-panel p-6"
          >
            <h3 className="text-lg font-bold">{entry.degree}</h3>
            <p className="mt-1 text-sm text-mut">{entry.institution}</p>
            <p className="mt-1 font-mono text-xs text-faint">{entry.location}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
