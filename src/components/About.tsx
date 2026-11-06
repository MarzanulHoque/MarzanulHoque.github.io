import Section from './Section'
import { about } from '../data/profile'

export default function About() {
  return (
    <Section id="about" eyebrow="ENGINEERING PHILOSOPHY" title="Background & Approach">
      <div className="reveal max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed shadow-xs dark:border-line dark:bg-panel dark:text-fg/90 dark:shadow-none">
        {about.map((paragraph) => (
          <p key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  )
}
