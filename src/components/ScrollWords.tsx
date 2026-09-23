import { useEffect, useMemo, useRef } from 'react'

type Props = {
  text: string
  className?: string
}

/**
 * Scroll-linked word-by-word reveal: words go from muted to paper as the
 * paragraph scrolls through the viewport.
 *
 * SSR/no-JS safety: every word renders `text-paper` (fully readable) by
 * default. The scroll-driven muted→paper interpolation is applied
 * imperatively in a `useEffect`, which only ever runs client-side after
 * mount — the prerendered HTML and any no-JS client always see the plain,
 * fully visible paragraph. Bails out entirely under prefers-reduced-motion.
 */
function ScrollWords({ text, className = '' }: Props) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const words = useMemo(() => text.split(' '), [text])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const spans = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'))
    if (spans.length === 0) return

    let ticking = false

    const update = () => {
      ticking = false
      const vh = window.innerHeight
      const start = vh * 0.85
      const end = vh * 0.3

      for (const span of spans) {
        const rect = span.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const progress = (start - center) / (start - end)
        const clamped = Math.min(1, Math.max(0, progress))
        span.style.opacity = String(0.4 + clamped * 0.6)
        span.style.color = clamped > 0.5 ? 'var(--color-paper)' : 'var(--color-muted)'
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} data-word className="text-paper transition-colors duration-150">
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}

export default ScrollWords
