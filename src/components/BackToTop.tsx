import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="bg-grad float-bob fixed bottom-6 right-6 z-50 rounded-xl p-3 text-white shadow-lg transition-transform hover:-translate-y-1"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 19V5m-6 6 6-6 6 6" />
      </svg>
    </button>
  )
}
