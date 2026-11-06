import { identity, links } from '../data/profile'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/80 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <p className="text-xs font-mono text-mut">
            © {new Date().getFullYear()} <span className="font-semibold text-fg">{identity.name}</span>
          </p>
          <span className="hidden sm:inline-block text-line">•</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Automated CI/CD · AWS EC2</span>
          </span>
        </div>

        <div className="flex gap-5 font-mono text-xs text-mut">
          <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            GitHub
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${links.email}`} className="hover:text-emerald-400 transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
