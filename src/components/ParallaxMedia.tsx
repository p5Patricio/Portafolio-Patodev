import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { SPRING } from '../lib/motion'

type Props = {
  /** The media to animate, typically an `<img>`; rendered untouched. */
  children: ReactNode
  /** Classes for the clipping frame (aspect ratio, radius, `group`, ...). */
  className?: string
}

/** Vertical travel of the media inside its frame, in % of the frame height (±). */
const PARALLAX_SHIFT = 6
/**
 * Overscale of the media so its edges never show while it travels. Must be at
 * least `1 + 2 * PARALLAX_SHIFT / 100` (1.12); the extra 0.02 is a safety margin.
 */
const MEDIA_OVERSCALE = 1.14
/** Frame scale when it starts entering the viewport; it grows to 1 as it enters. */
const ENTER_SCALE = 0.96
/** Scroll progress (0 = frame top at viewport bottom) at which the frame reaches scale 1. */
const ENTER_END = 0.35

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/**
 * Scroll-linked depth for media covers: as the frame crosses the viewport the
 * media drifts inside it (±PARALLAX_SHIFT%), and the frame settles from
 * ENTER_SCALE to 1 while it enters.
 *
 * Layers: frame (clips, scales on entry) > depth layer (overscale + drift) >
 * children. Keep hover effects on the children so they never fight the
 * scroll-driven transforms.
 *
 * Every transform is weighted by an `intensity` motion value that starts at 0
 * (neutral, same as the static layout) and only springs to 1 after mount when
 * motion is allowed, so the prerendered HTML is static and reduced-motion
 * users always see the media at scale 1. Updates run on motion values only,
 * never React state, so scrolling triggers no re-renders.
 */
function ParallaxMedia({ children, className = '' }: Props) {
  const frameRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] })
  const progress = useSpring(scrollYProgress, SPRING.soft)
  const intensity = useSpring(0, SPRING.soft)

  useEffect(() => {
    intensity.set(reduceMotion ? 0 : 1)
  }, [reduceMotion, intensity])

  const frameScale = useTransform([progress, intensity], ([p, i]: number[]) => {
    const entering = 1 - clamp01(p / ENTER_END)
    return 1 - (1 - ENTER_SCALE) * entering * i
  })
  const mediaScale = useTransform(intensity, (i) => 1 + (MEDIA_OVERSCALE - 1) * i)
  // The drift is scaled by intensity too, so it never exceeds the overscale
  // margin while the overscale itself is still ramping up.
  const mediaY = useTransform(
    [progress, intensity],
    ([p, i]: number[]) => `${(clamp01(p) * 2 - 1) * PARALLAX_SHIFT * i}%`,
  )

  return (
    <m.div ref={frameRef} className={`overflow-hidden ${className}`} style={{ scale: frameScale }}>
      <m.div className="h-full w-full will-change-transform" style={{ y: mediaY, scale: mediaScale }}>
        {children}
      </m.div>
    </m.div>
  )
}

export default ParallaxMedia
