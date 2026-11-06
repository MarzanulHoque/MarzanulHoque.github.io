import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { identity } from '../data/profile'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'devops', label: 'DevOps' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-ink/85 backdrop-blur-md">
      <div
        className="line-grad absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-100"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-3">
          <a href="#top" className="font-mono text-sm font-bold text-fg hover:text-emerald-400 transition-colors">
            <span>{identity.name}</span>
          </a>
          {/* Systems Telemetry Pill */}
          <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Live · AWS EC2</span>
          </span>
        </div>

        <div className="hidden items-center gap-6 sm:flex">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-xs font-medium tracking-wide uppercase font-mono transition-colors ${
                active === id ? 'font-bold text-emerald-400' : 'text-mut hover:text-fg'
              }`}
            >
              {label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-line bg-panel p-2 text-mut"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink/95 px-6 py-4 sm:hidden">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-mono ${active === id ? 'font-bold text-emerald-400' : 'text-mut'}`}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
