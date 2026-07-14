import Section from './Section'
import { cardGlow } from '../hooks/usePointerGlow'
import { testimonials } from '../data/profile'

export default function Testimonials() {
  return (
    <Section id="reviews" eyebrow="reviews" title="What clients say">
      <div className="grid gap-4 sm:grid-cols-2">
        {testimonials.map((review) => (
          <article
            key={review.project}
            onMouseMove={cardGlow}
            className="glow-card reveal rounded-2xl border border-line bg-panel p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold">{review.project}</h3>
              <p className="font-mono text-sm text-vio" aria-label={`Rated ${review.rating} out of 5`}>
                ★ {review.rating.toFixed(1)}
              </p>
            </div>
            <p className="mt-1 font-mono text-xs text-faint">{review.period}</p>
            {review.quotes.map((quote) => (
              <blockquote key={quote} className="mt-4 border-l-2 border-line pl-4 text-sm italic text-mut">
                “{quote}”
              </blockquote>
            ))}
            <ul className="mt-4 flex flex-wrap gap-2">
              {review.endorsements.map((tag) => (
                <li key={tag} className="rounded-full bg-panel-2 px-3 py-1 font-mono text-xs text-mut">
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
