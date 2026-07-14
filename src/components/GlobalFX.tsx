import { lazy, Suspense, useState } from 'react'

const SectionFX = lazy(() => import('./fx/SectionFX'))

/** Single fixed full-page 3D background. */
export default function GlobalFX() {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  if (reduced) return null
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 opacity-60 dark:opacity-70">
      <Suspense fallback={null}>
        <SectionFX variant="network" />
      </Suspense>
    </div>
  )
}
