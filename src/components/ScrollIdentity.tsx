import { useEffect, useState } from 'react'
import { identity, links } from '../data/profile'

/** Tiny floating profile widget that expands into quick links on click. */
export default function ScrollIdentity() {
  const [show, setShow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [avatarError, setAvatarError] = useState(false)

  // Show floating widget once the main hero section scrolls out of view
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting))
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  if (!show) return null

  return (
    <>
      {/* Click-outside backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
        {/* Expanded Quick-Access Card Popover */}
        {isOpen && (
          <div className="relative z-50 mb-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl transition-all duration-200 dark:border-line dark:bg-panel">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 dark:border-line/60">
              <div className="flex items-center gap-2.5">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 p-0.5 dark:border-line">
                  {!avatarError && identity.avatar ? (
                    <img
                      src={identity.avatar}
                      alt={identity.name}
                      onError={() => setAvatarError(true)}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 font-mono text-xs font-bold text-emerald-600 dark:bg-panel-2 dark:text-emerald-400">
                      {identity.name.split(' ').map((n) => n[0]).join('').slice(0, 3)}
                    </div>
                  )}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-900 truncate dark:text-fg">{identity.name}</p>
                  <p className="font-mono text-[10px] text-sky-700 font-semibold truncate dark:text-cyan-400">
                    {identity.role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:text-slate-700 transition-colors dark:hover:text-fg"
                aria-label="Close profile card"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Availability Pill */}
            <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate">Available for Roles</span>
            </div>

            {/* Quick Actions */}
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 py-1.5 font-mono text-xs text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors dark:border-line dark:bg-panel-2 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                <span>GitHub</span>
                <span className="text-[10px]">↗</span>
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 py-1.5 font-mono text-xs text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors dark:border-line dark:bg-panel-2 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                <span>LinkedIn</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>

            <div className="mt-2 flex flex-col gap-1.5">
              <a
                href={`mailto:${links.email}`}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-1.5 font-mono text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 transition-colors dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400"
              >
                <span>Email Marzanul</span>
                <span className="text-[10px]">✉</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-1.5 font-mono text-[11px] text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors dark:border-line dark:text-mut dark:hover:text-fg dark:hover:bg-panel-2"
              >
                <span>Back to Top Hero</span>
                <span>↑</span>
              </button>
            </div>
          </div>
        )}

        {/* Tiny Floating Clickable Avatar Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close quick profile' : 'Open quick profile'}
          title="Click to view profile & quick links"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-slate-300 bg-white p-0.5 shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 hover:border-emerald-500 dark:border-slate-700 dark:bg-panel dark:hover:border-emerald-400"
        >
          {!avatarError && identity.avatar ? (
            <img
              src={identity.avatar}
              alt={identity.name}
              onError={() => setAvatarError(true)}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 font-mono text-xs font-bold text-emerald-600 dark:bg-panel-2 dark:text-emerald-400">
              {identity.name.split(' ').map((n) => n[0]).join('').slice(0, 3)}
            </div>
          )}

          {/* Live Emerald Status Pulse Indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white bg-emerald-500 dark:border-panel" />
          </span>
        </button>
      </div>
    </>
  )
}
