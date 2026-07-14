import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { identity } from '../data/profile'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
      <div
        className="line-grad absolute inset-x-0 top-0 h-0.5 origin-left"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-bold">
          <span className="text-grad">{identity.name}</span>
        </a>

        <div className="hidden items-center gap-6 sm:flex">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm transition-colors ${active === id ? 'font-semibold text-vio' : 'text-mut hover:text-fg'}`}
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
              className={`block py-2 text-sm ${active === id ? 'font-semibold text-vio' : 'text-mut'}`}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
