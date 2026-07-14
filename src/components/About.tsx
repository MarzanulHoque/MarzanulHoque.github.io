import Section from './Section'
import { about } from '../data/profile'

export default function About() {
  return (
    <Section id="about" eyebrow="about" title="A bit about me">
      <div className="reveal max-w-3xl space-y-5 text-mut">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
