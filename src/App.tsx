import { usePointerGlow } from './hooks/usePointerGlow'
import GlobalFX from './components/GlobalFX'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import OpenSource from './components/OpenSource'
import Testimonials from './components/Testimonials'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  usePointerGlow('#glow-layer')

  return (
    <>
      <div
        id="glow-layer"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--g2) var(--glow-alpha), transparent), transparent 70%)',
        }}
      />
      <GlobalFX />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <OpenSource />
        <Testimonials />
        <Education />
        <Contact />
      </main>
    </>
  )
}
