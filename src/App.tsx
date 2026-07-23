import { usePointerGlow } from './hooks/usePointerGlow'
import GlobalFX from './components/GlobalFX'
import Nav from './components/Nav'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
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
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
