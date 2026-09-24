import type { ReactNode } from 'react'
import Crosshair from './Crosshair'

type Props = {
  id: string
  children: ReactNode
  className?: string
  /** Extra classes for the inner padded content wrapper. */
  innerClassName?: string
  ariaLabelledBy?: string
  /** Hero is the first section — no top hairline above it. */
  first?: boolean
}

/**
 * Shared "blueprint" section frame: a centered max-width container with 1px
 * `line` vertical rails (md+) at the gutter edges, a top hairline separating
 * it from the previous section, and small sky crosshairs centered exactly on
 * the rail/hairline intersections. Mobile (<768px) hides rails/crosshairs
 * but keeps hairlines.
 *
 * Two padding layers, matching Header's own layout so both align to the
 * same inner edge:
 *  - the outer `px-4 md:px-6 lg:px-10` gutter is where the rails/crosshairs
 *    sit (must stay in sync with Header.tsx's outer container);
 *  - an inner `md:px-[clamp(1.5rem,3vw,3rem)]` insets the actual content
 *    from those rails so text never starts flush on the rail line.
 */
function Section({ id, children, className = '', innerClassName = '', ariaLabelledBy, first = false }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative ${first ? '' : 'border-t border-line'} ${className}`}
    >
      <div className="relative mx-auto frame-width">
        {/* Vertical rails — md+ only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 hidden w-px bg-line md:left-6 md:block lg:left-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-4 hidden w-px bg-line md:right-6 md:block lg:right-10"
        />

        {!first && (
          <>
            <Crosshair className="absolute left-4 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:left-6 md:block lg:left-10" />
            <Crosshair className="absolute right-4 top-0 hidden translate-x-1/2 -translate-y-1/2 md:right-6 md:block lg:right-10" />
          </>
        )}

        <div className="px-4 md:px-6 lg:px-10">
          <div className={`py-[clamp(4rem,8vw,7rem)] md:px-[clamp(1.5rem,3vw,3rem)] ${innerClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section
