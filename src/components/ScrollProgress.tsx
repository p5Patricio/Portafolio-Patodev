import { m, useScroll, useSpring } from 'framer-motion'
import { SPRING } from '../lib/motion'

type Props = {
  className?: string
}

/**
 * Hairline page-progress bar: a sky line that grows from the left edge as the
 * page scrolls. Meant to sit on the bottom edge of the fixed header.
 *
 * - Driven by Framer motion values (`useScroll` -> `useSpring` -> `scaleX`),
 *   so scrolling never re-renders React; the `snappy` spring smooths wheel
 *   steps without overshooting the real position.
 * - Starts at `scaleX(0)`: the prerendered HTML matches the top of the page.
 * - Purely decorative (`aria-hidden`) and removed under prefers-reduced-motion,
 *   since it is scroll-linked motion.
 */
function ScrollProgress({ className = '' }: Props) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, SPRING.snappy)

  return (
    <m.div
      data-testid="scroll-progress"
      aria-hidden="true"
      style={{ scaleX }}
      className={`pointer-events-none h-0.5 origin-left bg-sky motion-reduce:hidden ${className}`}
    />
  )
}

export default ScrollProgress
