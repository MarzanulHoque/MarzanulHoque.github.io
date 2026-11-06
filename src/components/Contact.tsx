import { useState } from 'react'
import Section from './Section'
import { identity, links } from '../data/profile'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(links.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const channels = [
    { label: 'GitHub', url: links.github },
    { label: 'LinkedIn', url: links.linkedin },
  ].filter((c) => c.url)

  return (
    <Section id="contact" eyebrow="COMMUNICATION & HIRING" title="Initiate Contact">
      <div className="reveal max-w-3xl rounded-2xl border border-line bg-panel p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Currently Available for Software & DevOps Roles
          </div>
          <span className="font-mono text-xs text-mut">Direct Pipeline Ingestion</span>
        </div>

        <p className="mt-5 text-sm sm:text-base text-fg/90 leading-relaxed">
          {identity.availability} I welcome conversations with engineering leaders, technical recruiters, and founders seeking high-performance .NET Core and AWS cloud development.
        </p>

        {/* Email & Action Console */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${links.email}`}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-400 active:scale-95"
          >
            Send Email Message
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-panel-2 px-4 py-3 font-mono text-xs font-semibold text-fg transition-all hover:border-slate-600 active:scale-95"
          >
            <span>{copied ? '✓ Copied to Clipboard' : links.email}</span>
            <span className="text-muted text-[11px]">{copied ? '' : '📋'}</span>
          </button>

          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-line bg-panel px-4 py-3 text-sm font-semibold text-mut hover:text-fg hover:border-slate-600 transition-colors"
            >
              {channel.label} →
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
