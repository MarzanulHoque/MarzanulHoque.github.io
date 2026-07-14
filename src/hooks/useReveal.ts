import { useEffect, useRef } from 'react'

/** Adds `is-visible` to elements with the `reveal` class when they enter the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.classList.contains('reveal')
      ? [root]
      : Array.from(root.querySelectorAll<HTMLElement>('.reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    // reveal anything already on screen immediately; observe the rest
    const viewportH = window.innerHeight
    targets.forEach((t) => {
      const rect = t.getBoundingClientRect()
      if (rect.top < viewportH && rect.bottom > 0) {
        t.classList.add('is-visible')
      } else {
        observer.observe(t)
      }
    })
    return () => observer.disconnect()
  }, [])

  return ref
}
