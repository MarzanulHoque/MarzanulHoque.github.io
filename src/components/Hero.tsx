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
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Identity & Recruiter Value Pitch */}
        <div className="reveal lg:col-span-6">
          {/* Recruiter Live Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-semibold text-emerald-400">
              Available for Junior Software & DevOps Roles
            </span>
          </div>

          {/* Profile Identity Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full border-2 border-line bg-panel p-0.5 shadow-md">
              {!avatarError && identity.avatar ? (
                <img
                  src={identity.avatar}
                  alt={identity.name}
                  onError={() => setAvatarError(true)}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-panel-2 font-mono text-lg font-bold text-emerald-400">
                  {identity.name.split(' ').map((n) => n[0]).join('').slice(0, 3)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl text-fg">
                {identity.name}
              </h1>
              <p className="font-mono text-sm sm:text-base font-semibold text-cyan-400 mt-0.5">
                Software Engineer · .NET Core & Cloud DevOps
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base text-mut leading-relaxed max-w-xl">
            {identity.pitch}
          </p>

          {/* Core Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/30 active:scale-95"
            >
              View Production Projects
            </a>
            <a
              href="#devops"
              className="inline-flex items-center justify-center rounded-xl border border-line bg-panel px-5 py-2.5 text-sm font-semibold text-fg transition-all hover:border-slate-600 hover:bg-panel-2 active:scale-95"
            >
              DevOps Architecture Specs
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-mut hover:text-fg hover:border-slate-600 hover:bg-panel-2 transition-colors"
            >
              Get in Touch
            </a>
          </div>

          {/* Quantifiable Impact Metrics */}
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line/70 pt-6">
            <div>
              <dt className="sr-only">Experience</dt>
              <dd className="font-mono text-2xl font-extrabold text-fg sm:text-3xl">
                {stats[0]?.value || '2+'}
              </dd>
              <dd className="mt-1 text-xs text-mut font-medium">years hands-on exp</dd>
            </div>
            <div>
              <dt className="sr-only">CI/CD & Security</dt>
              <dd className="font-mono text-2xl font-extrabold text-emerald-400 sm:text-3xl">
                100%
              </dd>
              <dd className="mt-1 text-xs text-mut font-medium">automated CI gates</dd>
            </div>
            <div>
              <dt className="sr-only">Shipped Projects</dt>
              <dd className="font-mono text-2xl font-extrabold text-cyan-400 sm:text-3xl">
                {stats[1]?.value || '8'}
              </dd>
              <dd className="mt-1 text-xs text-mut font-medium">projects shipped</dd>
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
