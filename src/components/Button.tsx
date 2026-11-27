import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useMagnetic } from './Magnetic'

const FOCUS_RING =
  'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2'

/** Press feedback: a 2% scale-down on the independent `scale` property. */
const PRESS = 'motion-safe:active:not-disabled:scale-[0.98]'

// `transform` is deliberately NOT transitioned: the magnetic pull drives it
// inline every frame. The press uses the independent `scale` property, so the
// two compose without fighting.
const BASE =
  'group inline-flex min-h-11 items-center justify-center gap-2 rounded px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.08em] transition-[color,background-color,border-color,scale] duration-(--motion-duration-fast) ease-out-quart'

const VARIANT_CLASSES = {
  primary: 'bg-paper text-ink hover:bg-paper/90',
  secondary: 'border border-line text-paper hover:border-paper bg-transparent',
} as const

/** Label + arrow move together as one layer, a few px past the surface. */
const CONTENT = 'inline-flex items-center gap-2'

const ARROW =
  'inline-block transition-transform duration-(--motion-duration-base) ease-out-expo group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none'

const MotionLink = m.create(Link)

type Variant = keyof typeof VARIANT_CLASSES

type CommonProps = {
  children: ReactNode
  ariaLabel?: string
  variant?: Variant
  /** Show the trailing arrow that nudges on hover/focus. Defaults to true. */
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
 * 4px on hover and keyboard focus, 2px sky focus ring, 44px min touch target.
 *
 * Micro-interactions (transform only, the layout box never changes): a subtle
 * magnetic pull toward a fine pointer with the label following a bit further
 * (see `useMagnetic`), and a 0.98 press scale.
 */
function Button({ children, ariaLabel, variant = 'primary', arrow = true, className = '', ...props }: Props) {
  const isDisabled = 'disabled' in props && Boolean(props.disabled)
  const magnetic = useMagnetic({ disabled: isDisabled })
  const classes = `${BASE} ${PRESS} ${VARIANT_CLASSES[variant]} ${FOCUS_RING} ${className}`

  const content = (
    <m.span style={magnetic.innerStyle} className={CONTENT}>
      {children}
      {arrow && (
        <span aria-hidden="true" className={ARROW}>
          →
        </span>
      )}
    </m.span>
  )

  if ('href' in props && props.href) {
    const isExternal = props.external ?? true
    return (
      <m.a
        href={props.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
        className={classes}
        style={magnetic.style}
        {...magnetic.handlers}
      >
        {content}
      </m.a>
    )
  }

  if ('to' in props && props.to) {
    return (
      <MotionLink to={props.to} aria-label={ariaLabel} className={classes} style={magnetic.style} {...magnetic.handlers}>
        {content}
      </MotionLink>
    )
  }

  return (
    <m.button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={ariaLabel}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
      style={magnetic.style}
      {...magnetic.handlers}
    >
      {content}
    </m.button>
  )
}

export default Button
