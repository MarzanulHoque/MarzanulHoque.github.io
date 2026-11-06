import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { skillGroups } from '../data/profile'

export default function Skills() {
  return (
    <Section id="skills" eyebrow="INFRASTRUCTURE & CODE" title="Technical Capabilities & Racks">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <article
            key={group.title}
            onMouseMove={cardGlow}
            className="glow-card reveal flex flex-col justify-between rounded-2xl border border-line bg-panel p-5 transition-all duration-200 hover:border-slate-700 hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-line/60 pb-2.5">
                <span className="font-mono text-[10px] font-bold text-mut uppercase tracking-wider">
                  Rack 0{index + 1}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-fg">{group.title}</h3>
            </div>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-line/80 bg-panel-2 px-2 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
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
