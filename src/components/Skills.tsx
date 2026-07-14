import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { skillGroups } from '../data/profile'

export default function Skills() {
  return (
    <Section id="skills" eyebrow="skills" title="Tools I work with">
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            onMouseMove={cardGlow}
            className="glow-card reveal rounded-2xl border border-line bg-panel p-6 transition-transform hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold">{group.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-panel-2 px-3 py-1 font-mono text-xs text-mut"
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
