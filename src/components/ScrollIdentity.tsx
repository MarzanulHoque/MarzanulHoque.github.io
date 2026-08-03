import { useEffect, useState } from 'react'
import { identity, links } from '../data/profile'

/** Docked identity card in the left margin on very wide screens, once the hero scrolls away. */
export default function ScrollIdentity() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting))
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const [avatarError, setAvatarError] = useState(false)

  return (
    <aside
      className={`fixed left-6 top-1/2 z-40 hidden w-56 -translate-y-1/2 transition-all duration-500 xl:block ${
        show ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0 pointer-events-none'
      }`}
    >
      <div className="rounded-2xl border border-line bg-panel p-5 text-center shadow-lg">
        {/* Compact Avatar */}
        <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full border border-line p-[2px]">
          {!avatarError && identity.avatar ? (
            <img
              src={identity.avatar}
              alt={identity.name}
              onError={() => setAvatarError(true)}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-panel-2 font-mono text-xs font-bold text-grad">
              {identity.name.split(' ').map((n) => n[0]).join('').slice(0, 3)}
            </div>
          )}
        </div>
        <p className="text-sm font-bold">{identity.name}</p>
        <p className="mt-0.5 font-mono text-xs text-mut">{identity.role}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="inline-flex items-center justify-center rounded-full border border-line bg-panel-2 p-2 text-mut transition-colors hover:text-vio"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.092.68-.217.68-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.833.09-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.688-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.943.359.31.679.921.679 1.856 0 1.34-.012 2.421-.012 2.751 0 .268.18.58.688.482A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="inline-flex items-center justify-center rounded-full border border-line bg-panel-2 p-2 text-mut transition-colors hover:text-vio"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.28 8.5h3.32V21H3.28V8.5Zm6.2 0h3.18v1.71h.05c.44-.84 1.53-1.73 3.15-1.73 3.37 0 3.99 2.22 3.99 5.1V21h-3.32v-5.79c0-1.38-.02-3.15-1.92-3.15-1.92 0-2.22 1.5-2.22 3.05V21H9.48V8.5Z" />
            </svg>
          </a>
          <a
            href={`mailto:${links.email}`}
            aria-label={`Email ${identity.name}`}
            title={links.email}
            className="inline-flex items-center justify-center rounded-full border border-line bg-panel-2 p-2 text-mut transition-colors hover:text-vio"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}
