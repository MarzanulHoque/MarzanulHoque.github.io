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
      <div className="reveal max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-line dark:bg-panel dark:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5 dark:border-line/60">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-mono font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Currently Available for Software & DevOps Roles
          </div>
          <span className="font-mono text-xs text-slate-500 dark:text-mut">Direct Pipeline Ingestion</span>
        </div>

        <p className="mt-5 text-sm sm:text-base text-slate-700 leading-relaxed dark:text-fg/90">
          {identity.availability} I welcome conversations with engineering leaders, technical recruiters, and founders seeking high-performance .NET Core and AWS cloud development.
        </p>

        {/* Email & Action Console */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${links.email}`}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-95 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400 dark:shadow-emerald-500/20"
          >
            Send Email Message
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-xs font-semibold text-slate-800 transition-all hover:bg-slate-100 hover:border-slate-400 active:scale-95 dark:border-line dark:bg-panel-2 dark:text-fg dark:hover:border-slate-600"
          >
            <span>{copied ? '✓ Copied to Clipboard' : links.email}</span>
            <span className="text-slate-400 text-[11px]">{copied ? '' : '📋'}</span>
          </button>

          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-colors dark:border-line dark:bg-panel dark:text-mut dark:hover:text-fg dark:hover:border-slate-600"
            >
              {channel.label} →
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
