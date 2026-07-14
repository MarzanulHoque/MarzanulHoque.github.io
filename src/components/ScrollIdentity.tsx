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

  const initials = identity.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <aside
      className={`fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-500 2xl:block ${
        show ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
      }`}
    >
      <div className="rounded-2xl border border-line bg-panel p-5 text-center shadow-lg">
        <div
          className="bg-grad mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-sm font-extrabold text-white"
          aria-hidden="true"
        >
          {initials}
        </div>
        <p className="mt-3 text-sm font-bold">{identity.name}</p>
        <p className="mt-0.5 font-mono text-xs text-mut">{identity.role}</p>
        <a href={`mailto:${links.email}`} className="mt-2 block font-mono text-xs text-vio hover:underline">
          {links.email}
        </a>
      </div>
    </aside>
  )
}
