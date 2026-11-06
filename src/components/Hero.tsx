import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { identity, stats } from '../data/profile'
import InteractivePipeline from './InteractivePipeline'

export default function Hero() {
  const ref = useReveal<HTMLElement>()
  const [avatarError, setAvatarError] = useState(false)

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Subtle background grid pattern */}
      <div className="dot-grid absolute inset-0 opacity-25 dark:opacity-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Identity & Recruiter Value Pitch */}
        <div className="reveal lg:col-span-6">
          {/* Recruiter Live Status Badge */}
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 shadow-xs dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold text-emerald-800 dark:text-emerald-400 truncate">
              Available for Junior Software & DevOps Roles
            </span>
          </div>

          {/* Profile Identity Header */}
          <div className="flex items-center gap-3.5 sm:gap-4 mb-4">
            <div className="relative h-14 w-14 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-white p-0.5 shadow-md dark:border-line dark:bg-panel">
              {!avatarError && identity.avatar ? (
                <img
                  src={identity.avatar}
                  alt={identity.name}
                  onError={() => setAvatarError(true)}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 font-mono text-lg font-bold text-emerald-600 dark:bg-panel-2 dark:text-emerald-400">
                  {identity.name.split(' ').map((n) => n[0]).join('').slice(0, 3)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight sm:text-3xl lg:text-4xl text-slate-900 dark:text-fg">
                {identity.name}
              </h1>
              <p className="font-mono text-xs sm:text-sm font-semibold text-sky-600 dark:text-cyan-400 mt-0.5">
                Software Engineer · .NET Core & Cloud DevOps
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-600 dark:text-mut leading-relaxed max-w-xl">
            {identity.pitch}
          </p>

          {/* Core Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-95 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400 dark:shadow-emerald-500/20"
            >
              View <span className="hidden sm:inline">&nbsp;Production&nbsp;</span>Projects
            </a>
            <a
              href="#devops"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-95 dark:border-line dark:bg-panel dark:text-fg dark:hover:border-slate-600 dark:hover:bg-panel-2 dark:shadow-none"
            >
              DevOps <span className="hidden sm:inline">&nbsp;Architecture&nbsp;</span>Specs
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-colors dark:border-line dark:bg-panel dark:text-mut dark:hover:text-fg dark:hover:border-slate-600 dark:hover:bg-panel-2 dark:shadow-none"
            >
              Get in Touch
            </a>
          </div>

          {/* Quantifiable Impact Metrics */}
          <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-200 pt-6 dark:border-line/70">
            <div>
              <dt className="sr-only">Experience</dt>
              <dd className="font-mono text-xl font-extrabold text-slate-900 sm:text-3xl dark:text-fg">
                {stats[0]?.value || '2+'}
              </dd>
              <dd className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium dark:text-mut">years exp</dd>
            </div>
            <div>
              <dt className="sr-only">CI/CD & Security</dt>
              <dd className="font-mono text-xl font-extrabold text-emerald-600 sm:text-3xl dark:text-emerald-400">
                100%
              </dd>
              <dd className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium dark:text-mut">CI pass gates</dd>
            </div>
            <div>
              <dt className="sr-only">Shipped Projects</dt>
              <dd className="font-mono text-xl font-extrabold text-sky-600 sm:text-3xl dark:text-cyan-400">
                {stats[1]?.value || '8'}
              </dd>
              <dd className="mt-1 text-[11px] sm:text-xs text-slate-500 font-medium dark:text-mut">shipped</dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Live Interactive Architecture Pipeline */}
        <div className="reveal lg:col-span-6">
          <InteractivePipeline />
        </div>
      </div>
    </section>
  )
}
