import Section from './Section'
import { about } from '../data/profile'

export default function About() {
  return (
    <Section id="about" eyebrow="ENGINEERING PHILOSOPHY" title="Background & Approach">
      <div className="reveal max-w-4xl rounded-2xl border border-line bg-panel p-6 sm:p-8 space-y-5 text-sm sm:text-base text-mut leading-relaxed">
        {about.map((paragraph) => (
          <p key={paragraph} className="text-fg/90">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  )
}
