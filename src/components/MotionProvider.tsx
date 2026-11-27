import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import type { ReactNode } from 'react'
import { DURATION, EASE } from '../lib/motion'

const DEFAULT_TRANSITION = { duration: DURATION.base, ease: EASE.outExpo }

/**
 * Root motion context shared by the client (`src/main.tsx`) and the server
 * prerender (`src/entry-server.tsx`) so both trees stay identical for hydration.
 *
 * - `LazyMotion` + `domAnimation` ships only the animation features the site
 *   uses; `strict` makes any full `motion.*` component throw, so components
 *   must use the lightweight `m.*` instead.
 * - `reducedMotion="user"` honors the OS "reduce motion" preference by
 *   dropping transform/layout animations.
 * - The default transition puts every animation without its own transition
 *   on the shared rhythm (`DURATION.base` + `EASE.outExpo`).
 */
function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={DEFAULT_TRANSITION}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}

export default MotionProvider
