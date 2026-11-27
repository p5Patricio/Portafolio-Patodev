import type { Transition, Variants } from 'framer-motion'

/**
 * Shared motion vocabulary for Framer Motion.
 *
 * These values mirror the CSS custom properties declared in `src/index.css`
 * (`--ease-*`, `--motion-duration-*`, `--motion-stagger`) so CSS transitions
 * and JS-driven animations share the same rhythm. `src/lib/__tests__/motion.test.ts`
 * fails if the two drift apart: change both sides together.
 */

/** A cubic-bezier curve as Framer Motion expects it: `[x1, y1, x2, y2]`. */
export type CubicBezier = readonly [number, number, number, number]

/**
 * Easing curves.
 *
 * - `outExpo`: the default. Entrances, reveals and anything that should feel
 *   fast to start and soft to land (mirrors `--ease-out-expo`).
 * - `inOutQuart`: elements that move from one resting place to another, such
 *   as layout shifts, panels or page transitions (mirrors `--ease-in-out-quart`).
 * - `outQuart`: small UI feedback (hover, focus, color/opacity changes) where
 *   `outExpo` would feel too dramatic (mirrors `--ease-out-quart`).
 */
export const EASE = {
  outExpo: [0.22, 1, 0.36, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
  outQuart: [0.25, 1, 0.5, 1],
} as const satisfies Record<string, CubicBezier>

/**
 * Durations in seconds (Framer Motion's unit).
 *
 * - `fast` (160ms): micro-interactions such as hover, press and focus states.
 * - `base` (320ms): the default for most UI transitions.
 * - `slow` (650ms): section and content reveals.
 * - `slower` (900ms): hero-level, once-per-page moments.
 */
export const DURATION = {
  fast: 0.16,
  base: 0.32,
  slow: 0.65,
  slower: 0.9,
} as const

/** Delay in seconds between siblings in a staggered sequence (mirrors `--motion-stagger`). */
export const STAGGER = 0.07

/**
 * Spring presets for physics-driven motion (`useSpring`, `type: 'spring'`).
 *
 * - `soft`: pointer-following and hover motion such as tilt cards; settles
 *   gently with a slight overshoot.
 * - `snappy`: small UI elements (toggles, badges, icons) that should respond
 *   instantly with almost no overshoot.
 */
export const SPRING = {
  soft: { stiffness: 160, damping: 16, mass: 0.6 },
  snappy: { stiffness: 420, damping: 32, mass: 0.7 },
} as const

/** Builds a tween transition on the shared vocabulary. Defaults to `base` + `outExpo`. */
export function tween(
  duration: number = DURATION.base,
  ease: CubicBezier = EASE.outExpo,
  delay = 0,
): Transition {
  return { duration, ease, delay }
}

/** Builds a spring transition from one of the `SPRING` presets. */
export function spring(preset: keyof typeof SPRING = 'soft'): Transition {
  return { type: 'spring', ...SPRING[preset] }
}

/**
 * Ready-made transitions for the most common cases.
 *
 * - `ui`: hover/press/focus feedback.
 * - `base`: default UI transition (same as the `MotionProvider` default).
 * - `reveal`: content entering the viewport.
 * - `hero`: the single most important entrance on a page.
 */
export const TRANSITION = {
  ui: tween(DURATION.fast, EASE.outQuart),
  base: tween(DURATION.base, EASE.outExpo),
  reveal: tween(DURATION.slow, EASE.outExpo),
  hero: tween(DURATION.slower, EASE.outExpo),
} as const satisfies Record<string, Transition>

/**
 * Fade in while rising a short distance. Use with `initial="hidden"` and
 * `animate`/`whileInView="visible"` for content reveals.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: TRANSITION.reveal },
}

/** Plain opacity fade for elements that must not move (overlays, images). */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITION.reveal },
}

/**
 * Parent variants that stagger their children by `STAGGER`. Pair with child
 * variants that define `hidden`/`visible` (for example `fadeUp`).
 */
export function staggerContainer(stagger: number = STAGGER, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  }
}
