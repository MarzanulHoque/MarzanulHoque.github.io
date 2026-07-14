import Section from './Section'
import { identity, links } from '../data/profile'

export default function Contact() {
  const channels = [
    { label: 'GitHub', url: links.github },
    { label: 'LinkedIn', url: links.linkedin },
    { label: 'Upwork', url: links.upwork },
  ].filter((c) => c.url)

  return (
    <Section id="contact" eyebrow="contact" title="Get in touch">
      <div className="reveal max-w-2xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm">
          <span className="pulse-dot inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
          Currently available
        </p>
        <p className="mt-6 text-mut">{identity.availability}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${links.email}`}
            className="bg-grad rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {links.email}
          </a>
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line bg-panel px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            >
              {channel.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
