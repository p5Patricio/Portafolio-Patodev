import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CommonProps = {
  children: ReactNode
  className?: string
}

type Props =
  | (CommonProps & { to: string; href?: never } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
  | (CommonProps & { href: string; to?: never } & AnchorHTMLAttributes<HTMLAnchorElement>)

const BASE =
  'underline decoration-line underline-offset-4 text-paper transition-colors hover:text-sky hover:decoration-sky outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2 rounded-xs'

/** Plain underlined text link: paper by default, sky on hover/focus. */
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
