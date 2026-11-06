import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { projects } from '../data/profile'

export default function Projects() {
  return (
    <Section id="projects" eyebrow="SYSTEMS & APPLICATIONS" title="Featured Engineering Work">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => {
          const isFlagship = index < 2

          return (
            <article
              key={project.name}
              onMouseMove={cardGlow}
              className={`glow-card reveal flex flex-col justify-between rounded-2xl border bg-panel p-6 transition-all duration-300 hover:-translate-y-1 ${
                isFlagship
                  ? 'border-emerald-500/30 hover:border-emerald-500/70 shadow-lg shadow-emerald-950/10'
                  : 'border-line hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header status bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] font-semibold text-cyan-400 truncate">
                    {project.context.split('·')[0]?.trim()}
                  </span>
                  {isFlagship && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400 shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AWS Production
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-fg group-hover:text-emerald-400 transition-colors">
                  {project.name}
                </h3>

                <p className="mt-3 text-sm text-mut leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>

              <div className="mt-5 border-t border-line/60 pt-4">
                {/* Stack Pills */}
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line/80 bg-panel-2 px-2 py-0.5 font-mono text-[11px] text-slate-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* Project Links */}
                {project.links && project.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-panel-2 px-3 py-1.5 font-mono text-xs font-semibold text-fg transition-all hover:border-emerald-500/50 hover:text-emerald-400 active:scale-95"
                      >
                        <span>{link.label}</span>
                        <span className="text-emerald-400">→</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
