import { useEffect, useRef } from 'react'
import { m, useInView, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { SPRING } from '../lib/motion'

type Props = {
  className?: string
}

/**
 * Add this class to an ancestor (a card, a row) to make the marks inside it
 * show their reticle while that ancestor is hovered or holds keyboard focus.
 */
export const CROSSHAIR_TRIGGER = 'group/crosshair'

/** Rotation (deg) of an armed mark: it reads as an "x" before snapping to "+". */
const ARMED_ROTATE = -45
/** Scale of an armed mark before it snaps into register. */
const ARMED_SCALE = 0.5
/** Shrinks the viewport bottom so the snap plays inside the view, not at its very edge. */
const IN_VIEW_MARGIN = '0px 0px -10% 0px'

function isOnScreen(el: Element): boolean {
  const rect = el.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0
}

/**
 * Small "+" registration mark, sky-colored, used at rail/hairline
 * intersections in the blueprint frame and on cover placeholders. Decorative
 * and click-through.
 *
 * Motion (transform only, motion values, no per-frame React state):
 * - A mark that starts off-screen is armed (rotated to an "x", half size) and
 *   springs into register with `SPRING.snappy` the first time it scrolls into
 *   view. Marks already on screen at mount, the prerendered HTML and
 *   reduced-motion users always get the neutral "+".
 * - Inside an ancestor carrying `CROSSHAIR_TRIGGER`, a small square reticle
 *   fades in on hover or focus-within (it only scales under motion-safe).
 *
 * It is deliberately not a pointer-following cursor: these marks are part of
 * the frame's geometry, and moving them would break the grid they register.
 */
function Crosshair({ className = '' }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: IN_VIEW_MARGIN })

  // 0 = in register (neutral), 1 = armed.
  const armed = useSpring(0, SPRING.snappy)
  const rotate = useTransform(armed, (a) => a * ARMED_ROTATE)
  const scale = useTransform(armed, (a) => 1 - (1 - ARMED_SCALE) * a)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduceMotion) {
      armed.jump(0)
      return
    }
    // Only marks the user cannot see yet are armed, so nothing flashes on load.
    if (!isOnScreen(el)) armed.jump(1)
  }, [armed, reduceMotion])

  useEffect(() => {
    if (inView) armed.set(0)
  }, [armed, inView])

  return (
    <m.svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 10 10"
      width="10"
      height="10"
      className={`pointer-events-none text-sky ${className}`}
      style={{ rotate, scale }}
    >
      <path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" />
      <rect
        x="3"
        y="3"
        width="4"
        height="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="origin-center opacity-0 transition-[opacity,scale] duration-(--motion-duration-base) ease-out-quart [transform-box:fill-box] motion-safe:scale-50 group-hover/crosshair:opacity-100 group-hover/crosshair:scale-100 group-focus-within/crosshair:opacity-100 group-focus-within/crosshair:scale-100"
      />
    </m.svg>
  )
}

export default Crosshair
