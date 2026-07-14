import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { projects } from '../data/profile'

export default function Projects() {
  return (
    <Section id="projects" eyebrow="projects" title="Featured work">
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            onMouseMove={cardGlow}
            className="glow-card reveal rounded-2xl border border-line bg-panel p-6 transition-transform hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p className="mt-1 font-mono text-xs text-vio">{project.context}</p>
            <p className="mt-3 text-sm text-mut">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-panel-2 px-3 py-1 font-mono text-xs text-mut"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
