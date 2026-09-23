import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const MotionLink = motion(Link)

const FOCUS_RING_CLASSES =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black'

const VARIANT_CLASSES = {
  solid:
    'bg-white text-color-papel shadow-xl hover:shadow-2xl',
  outline:
    'bg-transparent text-white border-2 border-white/70 hover:border-white hover:bg-white/10',
} as const

type Variant = keyof typeof VARIANT_CLASSES

type Props = {
  children: ReactNode
  ariaLabel?: string
  variant?: Variant
} & (
  | { href: string; external?: boolean; to?: never; type?: never; disabled?: never; onClick?: never }
  | { to: string; href?: never; external?: never; type?: never; disabled?: never; onClick?: never }
  | { type: 'button' | 'submit' | 'reset'; disabled?: boolean; onClick?: () => void; href?: never; to?: never; external?: never }
)

/**
 * Elegant CyberDuck Button.
 * Premium feel with black-on-white high contrast and spring interactions.
 * `variant="outline"` gives a lighter-weight secondary look (e.g. a
 * secondary CTA next to a primary solid one) while keeping the same shape,
 * sizing and interaction language.
 */
function PillButton({ children, ariaLabel, variant = 'solid', ...props }: Props) {
  const baseClasses = `group inline-flex items-center gap-3 rounded-2xl px-8 py-3.5 text-[0.75rem] uppercase tracking-[0.4em] font-technical font-bold transition-all ${VARIANT_CLASSES[variant]} ${FOCUS_RING_CLASSES}`
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
        className={baseClasses}
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
        className={baseClasses}
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
      className={`${baseClasses} disabled:opacity-60 disabled:cursor-not-allowed`}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}

export default PillButton
