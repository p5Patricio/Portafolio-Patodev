import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CommonProps = {
  children: ReactNode
  className?: string
}

type Props =
  | (CommonProps & { to: string; href?: never } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
  | (CommonProps & { href: string; to?: never } & AnchorHTMLAttributes<HTMLAnchorElement>)

// `link-underline` (src/index.css, "Micro-interactions") draws the resting
// hairline and the sky underline that sweeps in on hover/focus.
const BASE =
  'link-underline text-paper transition-colors duration-(--motion-duration-base) ease-out-expo hover:text-sky focus-visible:text-sky outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2 rounded-xs'

/**
 * Plain text link: paper with a hairline underline at rest; on hover or
 * keyboard focus the text turns sky and a sky underline sweeps in from the
 * left, exiting to the right when the pointer leaves.
 */
function TextLink({ children, className = '', ...props }: Props) {
  if ('to' in props && props.to) {
    const { to, ...rest } = props
    return (
      <Link to={to} className={`${BASE} ${className}`} {...rest}>
        {children}
      </Link>
    )
  }

  const { href, ...rest } = props as Extract<Props, { href: string }>
  return (
    <a href={href} className={`${BASE} ${className}`} {...rest}>
      {children}
    </a>
  )
}

export default TextLink
