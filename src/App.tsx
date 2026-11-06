import { usePointerGlow } from './hooks/usePointerGlow'
import GlobalFX from './components/GlobalFX'
import Nav from './components/Nav'
import ScrollIdentity from './components/ScrollIdentity'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import DevOpsSection from './components/DevOpsSection'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  usePointerGlow('#glow-layer')

  return (
    <>
      <div className="ambient-top" aria-hidden="true" />
      <GlobalFX />
      <Nav />
      <ScrollIdentity />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <DevOpsSection />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
