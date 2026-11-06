import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'
import FXLayer from './FXLayer'
import type { FXVariant } from './fx/SectionFX'

type Props = {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
  className?: string
  fx?: FXVariant
}

export default function Section({ id, eyebrow, title, children, className = '', fx }: Props) {
  const ref = useReveal<HTMLElement>()
  return (
    <section id={id} ref={ref} className="relative overflow-hidden">
      {fx && <FXLayer variant={fx} className="opacity-40 dark:opacity-50" />}
      <div className={`relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24 ${className}`}>
        <div className="reveal">
          <p className="font-mono text-xs font-semibold tracking-wider text-cyan-400 uppercase">{`// ${eyebrow}`}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl lg:text-4xl">{title}</h2>
          <div className="line-grad mt-3.5 h-0.5 w-16 rounded-full" aria-hidden="true" />
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
