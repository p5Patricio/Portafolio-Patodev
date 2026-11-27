import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CommonProps = {
  children: ReactNode
  className?: string
  /** Leading icon. When set, only the label is underlined, not the icon. */
  icon?: ReactNode
}

type Props =
  | (CommonProps & { to: string; href?: never } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
  | (CommonProps & { href: string; to?: never } & AnchorHTMLAttributes<HTMLAnchorElement>)

// `link-underline` (src/index.css, "Micro-interactions") draws the resting
// hairline and the sky underline that sweeps in on hover/focus.
const BASE =
  'text-paper transition-colors duration-(--motion-duration-base) ease-out-expo hover:text-sky focus-visible:text-sky outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2 rounded-xs'

/**
 * Plain text link: paper with a hairline underline at rest; on hover or
 * keyboard focus the text turns sky and a sky underline sweeps in from the
 * left, exiting to the right when the pointer leaves.
 */
function TextLink({ children, className = '', icon, ...props }: Props) {
  // With an icon, the underline moves to the label span so it sits under the
  // text baseline instead of spanning the taller icon box.
  const classes = `${BASE} ${icon ? 'inline-flex items-center gap-1.5' : 'link-underline'} ${className}`
  const content = icon ? (
    <>
      {icon}
      <span className="link-underline">{children}</span>
    </>
  ) : (
    children
  )

  if ('to' in props && props.to) {
    const { to, ...rest } = props
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  const { href, ...rest } = props as Extract<Props, { href: string }>
  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  )
}

export default TextLink
