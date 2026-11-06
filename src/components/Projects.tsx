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
              className={`glow-card reveal flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-panel dark:shadow-none ${
                isFlagship
                  ? 'border-emerald-300 hover:border-emerald-500 shadow-emerald-100/50 dark:border-emerald-500/30 dark:hover:border-emerald-500/70 dark:shadow-emerald-950/10'
                  : 'border-slate-200 hover:border-slate-400 dark:border-line dark:hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header status bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] font-semibold text-sky-700 dark:text-cyan-400 truncate">
                    {project.context.split('·')[0]?.trim()}
                  </span>
                  {isFlagship && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-800 shrink-0 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      AWS Production
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors dark:text-fg dark:group-hover:text-emerald-400">
                  {project.name}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-4 dark:text-mut">
                  {project.description}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4 dark:border-line/60">
                {/* Stack Pills */}
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-700 dark:border-line/80 dark:bg-panel-2 dark:text-slate-300"
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
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-semibold text-slate-800 transition-all hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 active:scale-95 dark:border-line dark:bg-panel-2 dark:text-fg dark:hover:border-emerald-500/50 dark:hover:text-emerald-400"
                      >
                        <span>{link.label}</span>
                        <span className="text-emerald-600 dark:text-emerald-400">→</span>
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
