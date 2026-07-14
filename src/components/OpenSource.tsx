import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { openSource } from '../data/profile'

export default function OpenSource() {
  return (
    <Section id="open-source" eyebrow="open source" title="Open-source projects">
      <div className="grid gap-4 sm:grid-cols-2">
        {openSource.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            onMouseMove={cardGlow}
            className="glow-card reveal block rounded-2xl border border-line bg-panel p-6 transition-transform hover:-translate-y-1"
          >
            <h3 className="font-mono text-lg font-bold text-vio">{repo.name}</h3>
            <p className="mt-2 text-sm text-mut">{repo.description}</p>
            <p className="mt-4 font-mono text-xs text-faint">{repo.language}</p>
          </a>
        ))}
      </div>
    </Section>
  )
}
