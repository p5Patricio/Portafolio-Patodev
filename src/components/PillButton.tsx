import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const MotionLink = motion(Link)

const BASE_CLASSES =
  'group inline-flex items-center gap-3 rounded-2xl bg-white text-color-papel px-8 py-3.5 text-[0.75rem] uppercase tracking-[0.4em] font-technical font-bold shadow-xl hover:shadow-2xl transition-all'

type Props = {
  children: ReactNode
  ariaLabel?: string
} & (
  | { href: string; external?: boolean; to?: never; type?: never; disabled?: never; onClick?: never }
  | { to: string; href?: never; external?: never; type?: never; disabled?: never; onClick?: never }
  | { type: 'button' | 'submit' | 'reset'; disabled?: boolean; onClick?: () => void; href?: never; to?: never; external?: never }
)

/**
 * Elegant CyberDuck Button.
 * Premium feel with black-on-white high contrast and spring interactions.
 */
function PillButton({ children, ariaLabel, ...props }: Props) {
  const transition: Transition = { type: 'spring', stiffness: 400, damping: 15 }
  const motionProps = {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition,
  }

  if ('href' in props && props.href) {
    const target = props.external ?? true ? '_blank' : undefined
    const rel = props.external ?? true ? 'noopener noreferrer' : undefined
    return (
      <motion.a
        href={props.href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={BASE_CLASSES}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  if ('to' in props && props.to) {
    return (
      <MotionLink
        to={props.to}
        aria-label={ariaLabel}
        className={BASE_CLASSES}
        {...motionProps}
      >
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={ariaLabel}
      className={`${BASE_CLASSES} disabled:opacity-60 disabled:cursor-not-allowed`}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}

export default PillButton
