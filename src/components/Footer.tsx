import { identity, links } from '../data/profile'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-mut">
          © {new Date().getFullYear()} <span className="font-semibold text-fg">{identity.name}</span>
        </p>
        <div className="flex gap-5 text-sm text-mut">
          <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-fg">
            GitHub
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg">
            LinkedIn
          </a>
          <a href={`mailto:${links.email}`} className="hover:text-fg">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
