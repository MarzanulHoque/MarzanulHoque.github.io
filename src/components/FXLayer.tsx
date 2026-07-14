import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { FXVariant } from './fx/SectionFX'

const SectionFX = lazy(() => import('./fx/SectionFX'))

type Props = { variant: FXVariant; className?: string }

/** Lazy 3D background layer — mounts its canvas only while the section is near the viewport. */
export default function FXLayer({ variant, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (reduced || !ref.current) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '250px 0px',
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {visible && !reduced && (
        <Suspense fallback={null}>
          <SectionFX variant={variant} />
        </Suspense>
      )}
    </div>
  )
}
