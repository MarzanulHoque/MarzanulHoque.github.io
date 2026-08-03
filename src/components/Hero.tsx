import { useState, type ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'
import { identity, skillGroups, stats } from '../data/profile'

/* tiny syntax-highlight helpers for the fake IDE card */
const K = ({ children }: { children: ReactNode }) => <span className="text-[#c678dd]">{children}</span>
const T = ({ children }: { children: ReactNode }) => <span className="text-[#e5c07b]">{children}</span>
const S = ({ children }: { children: ReactNode }) => <span className="text-[#98c379]">{children}</span>
const P = ({ children }: { children: ReactNode }) => <span className="text-[#abb2bf]">{children}</span>

export default function Hero() {
  const ref = useReveal<HTMLElement>()
  const topSkills = skillGroups.flatMap((g) => g.skills).slice(0, 3)
  const [avatarError, setAvatarError] = useState(false)

  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      <div className="blob left-[-10%] top-[-10%] h-96 w-96 bg-grad" aria-hidden="true" />
      <div className="blob bottom-[-20%] right-[-5%] h-80 w-80 bg-grad" aria-hidden="true" />
      <div className="dot-grid absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-12 px-6 pb-20 pt-32 sm:pt-40 lg:grid-cols-2 lg:items-center">
        {/* left: identity */}
        <div className="reveal">
          {/* Avatar frame */}
          <div className="mb-6 inline-block">
            <div className="group relative h-24 w-24 sm:h-28 sm:w-28 cursor-pointer">
              {/* Outer glowing halo */}
              <div className="absolute -inset-1.5 rounded-full bg-grad opacity-70 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg" />
              {/* Animated gradient ring */}
              <div className="absolute -inset-[2px] rounded-full bg-grad transition-transform duration-500 group-hover:scale-105" />
              {/* Inner container */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-ink bg-panel p-[2px]">
                {!avatarError && identity.avatar ? (
                  <img
                    src={identity.avatar}
                    alt={identity.name}
                    onError={() => setAvatarError(true)}
                    className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-panel-2 font-mono text-xl font-bold text-grad">
                    {identity.name.split(' ').map((n) => n[0]).join('').slice(0, 3)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <h1 className="whitespace-nowrap text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-grad">{identity.name}</span>
          </h1>
          <p className="mt-3 font-mono text-lg text-vio">{identity.role}</p>
          <p className="mt-4 max-w-md text-mut">{identity.pitch}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="bg-grad rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line bg-panel px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>

          <dl className="mt-10 flex gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-extrabold text-grad">{s.value}</dd>
                <dd className="mt-1 text-xs text-mut">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right: fake IDE code card (stays dark in both themes) */}
        <div className="reveal">
          <div className="overflow-hidden rounded-2xl border border-[#252538] bg-[#13131e] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-[#252538] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
              <span className="ml-3 font-mono text-xs text-[#636382]">developer.ts</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-[#e8e8f4]">
              <code>
                <K>const</K> <T>developer</T> <P>= {'{'}</P>
                {'\n  '}name<P>:</P> <S>{`'${identity.name}'`}</S>
                <P>,</P>
                {'\n  '}role<P>:</P> <S>{`'${identity.role}'`}</S>
                <P>,</P>
                {'\n  '}stack<P>: [</P>
                {topSkills.map((s, i) => (
                  <span key={s}>
                    <S>{`'${s}'`}</S>
                    {i < topSkills.length - 1 && <P>, </P>}
                  </span>
                ))}
                <P>],</P>
                {'\n  '}hireable<P>:</P> <K>true</K>
                <P>,</P>
                {'\n'}
                <P>{'}'}</P>
                <span className="caret" aria-hidden="true" />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
