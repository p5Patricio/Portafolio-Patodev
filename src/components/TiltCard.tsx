import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees on each axis. */
  maxTilt?: number
  /** Scale applied while the pointer is over the card. */
  hoverScale?: number
}

const SPRING = { stiffness: 160, damping: 16, mass: 0.6 }

/**
 * 3D "tilted card": the content rotates toward the pointer as if it were a
 * card held in the hand, and springs back to rest when the pointer leaves.
 * Disabled under prefers-reduced-motion.
 */
function TiltCard({ children, className = '', maxTilt = 14, hoverScale = 1.05 }: Props) {
  const reduceMotion = useReducedMotion()

  // Pointer position relative to the card, normalized to -0.5..0.5.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [maxTilt, -maxTilt]), SPRING)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-maxTilt, maxTilt]), SPRING)
  const scale = useSpring(1, SPRING)

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleEnter = () => {
    if (!reduceMotion) scale.set(hoverScale)
  }

  const handleLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
    scale.set(1)
  }

  return (
    <div
      className={`[perspective:900px] ${className}`}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
    >
      <motion.div style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}

export default TiltCard
