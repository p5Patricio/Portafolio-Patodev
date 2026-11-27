import { useRef, useSyncExternalStore, type RefObject } from 'react'
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { SPRING } from '../lib/motion'

/**
 * Viewport line (fraction of the viewport height, from the top) that the
 * drawn tip of the timeline follows. A node lights up when it crosses this
 * same line, so the tip and the nodes stay in lockstep. Slightly below the
 * middle so the line draws while the entry is being read, not after.
 */
const DRAW_LINE = 0.6

/** `useScroll` offset: progress 0 when the target's top meets `DRAW_LINE`, 1 when its bottom does. */
const DRAW_OFFSET = [`start ${DRAW_LINE}`, `end ${DRAW_LINE}`] as const

/**
 * True only on the client, after hydration, when the user has not asked for
 * reduced motion. Before that (server prerender, first client render, no-JS)
 * the timeline renders its final state: fully drawn, every node lit.
 */
function useScrollLinked() {
  const reduced = useReducedMotion()
  // `false` on the server and during hydration, `true` afterwards: the
  // first client render matches the prerendered static HTML.
  const hydrated = useSyncExternalStore(subscribeNoop, isClient, isServer)
  return hydrated && !reduced
}

const subscribeNoop = () => () => {}
const isClient = () => true
const isServer = () => false

/*
 * The scroll-linked elements below are keyed on `enabled`, so switching from
 * the static state remounts them: Framer only writes a motion value's current
 * value into the DOM on mount or on change, and a value bound later through a
 * prop update would keep the static (fully drawn) look until the first scroll.
 */

type ProgressProps = {
  /** The element whose scroll-through drives the line (usually the list it runs along). */
  target: RefObject<HTMLElement | null>
  /** Positioning classes (`left-*`, `top-*`); the parent must be `relative`. */
  className?: string
}

/**
 * Thin vertical timeline: a 1px `line` track with a `sky` progress line that
 * draws top-down (`scaleY`, origin top) as `target` scrolls past `DRAW_LINE`,
 * smoothed with `SPRING.snappy`. Absolutely positioned, so it never affects
 * layout. Purely decorative (`aria-hidden`).
 */
function TimelineProgress({ target, className = '' }: ProgressProps) {
  const enabled = useScrollLinked()
  const { scrollYProgress } = useScroll({ target, offset: [...DRAW_OFFSET] })
  const scaleY = useSpring(scrollYProgress, SPRING.snappy)

  return (
    <div
      aria-hidden="true"
      data-timeline="track"
      className={`pointer-events-none absolute inset-y-0 w-px bg-line ${className}`}
    >
      <m.div
        key={enabled ? 'scroll-linked' : 'static'}
        data-timeline="progress"
        className="absolute inset-0 origin-top bg-sky"
        style={enabled ? { scaleY } : undefined}
      />
    </div>
  )
}

type NodeProps = {
  /** Positioning classes; center it on the track (`left` = track left − 3px for the 7px node). */
  className?: string
}

/**
 * Small square node on the timeline. Its `sky` fill fades in as the node
 * crosses `DRAW_LINE` (the same line the progress tip follows), springing
 * with the same preset as the line so both arrive together. Purely
 * decorative (`aria-hidden`).
 */
export function TimelineNode({ className = '' }: NodeProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const enabled = useScrollLinked()
  const { scrollYProgress } = useScroll({ target: ref, offset: [...DRAW_OFFSET] })
  const lit = useSpring(scrollYProgress, SPRING.snappy)
  // Clamp the spring's overshoot to a valid opacity.
  const opacity = useTransform(lit, [0, 1], [0, 1])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-timeline="node"
      className={`pointer-events-none absolute size-[7px] border border-line bg-ink ${className}`}
    >
      <m.span
        key={enabled ? 'scroll-linked' : 'static'}
        data-timeline="node-fill"
        className="absolute -inset-px bg-sky"
        style={enabled ? { opacity } : undefined}
      />
    </span>
  )
}

export default TimelineProgress
