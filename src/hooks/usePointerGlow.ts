import { useEffect } from 'react'
import type { MouseEvent } from 'react'

/** Tracks the pointer and exposes it as --mx/--my on an element (page-level glow). */
export function usePointerGlow(selector: string) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(selector)
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`)
        el.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [selector])
}

/** Mousemove handler for .glow-card elements — sets --gx/--gy local to the card. */
export function cardGlow(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--gx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--gy', `${e.clientY - rect.top}px`)
}
