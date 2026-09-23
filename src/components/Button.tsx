import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const FOCUS_RING =
  'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2'

const BASE =
  'group inline-flex min-h-11 items-center justify-center gap-2 rounded px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.08em] transition-colors'

const VARIANT_CLASSES = {
  primary: 'bg-paper text-ink hover:bg-paper/90',
  secondary: 'border border-line text-paper hover:border-paper bg-transparent',
} as const

type Variant = keyof typeof VARIANT_CLASSES

type CommonProps = {
  children: ReactNode
  ariaLabel?: string
  variant?: Variant
  /** Show the trailing arrow that nudges on hover. Defaults to true. */
  arrow?: boolean
  className?: string
}

type Props =
  | (CommonProps & { href: string; external?: boolean; to?: never; type?: never; disabled?: never; onClick?: never })
  | (CommonProps & { to: string; href?: never; external?: never; type?: never; disabled?: never; onClick?: never })
  | (CommonProps & {
      type: 'button' | 'submit' | 'reset'
      disabled?: boolean
      onClick?: () => void
      href?: never
      to?: never
      external?: never
    })

/**
 * Primary/secondary CTA button per the blueprint design system: solid paper
 * or hairline-bordered, mono uppercase label, trailing arrow that nudges
 * 4px on hover, 2px sky focus ring, 44px min touch target.
 */
function Button({ children, ariaLabel, variant = 'primary', arrow = true, className = '', ...props }: Props) {
  const classes = `${BASE} ${VARIANT_CLASSES[variant]} ${FOCUS_RING} ${className}`
  const arrowEl = arrow && (
    <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  )

  if ('href' in props && props.href) {
    const isExternal = props.external ?? true
    return (
      <a
        href={props.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
        {arrowEl}
      </a>
    )
  }

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} aria-label={ariaLabel} className={classes}>
        {children}
        {arrowEl}
      </Link>
    )
  }

  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={ariaLabel}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
      {arrowEl}
    </button>
  )
}

export default Button
