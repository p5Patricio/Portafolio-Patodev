import type { ReactNode } from 'react'
import Reveal from './Reveal'

type SectionHeaderProps = {
  /** Two-digit section index, e.g. "01". */
  index: string
  /** Mono label next to the index, e.g. "TRABAJO". */
  label: string
  /** Section title, sentence case. */
  title: string
  /** Optional right-aligned mono meta — a plain string (e.g. "2 ENTRADAS")
   *  gets default muted styling, or a custom node (e.g. a TextLink) that
   *  styles itself. */
  meta?: ReactNode
  /** Optional intro paragraph rendered below the title. */
  intro?: string
  /** Optional id for the heading element (e.g. for aria-labelledby). */
  id?: string
  /** Heading level to render. Defaults to "h2" (home sections, where Hero
   *  already owns the page's single h1). Pages without their own hero
   *  (e.g. /galeria) pass "h1" so this becomes the page's real heading. */
  as?: 'h1' | 'h2'
}

/**
 * Swiss-style section header: `01 / LABEL` mono line (index in sky) with
 * optional right-aligned meta, then the section title in sentence case.
 */
function SectionHeader({ index, label, title, meta, intro, id, as: Heading = 'h2' }: SectionHeaderProps) {
  return (
    <Reveal className="flex flex-col gap-4 md:gap-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="mono-label text-[12px] text-muted md:text-xs">
          <span className="text-sky">{index}</span> / {label}
        </p>
        {meta &&
          (typeof meta === 'string' ? (
            <p className="mono-label text-[12px] text-muted md:text-xs">{meta}</p>
          ) : (
            <div className="mono-label text-[12px] md:text-xs">{meta}</div>
          ))}
      </div>

      <Heading
        id={id}
        className="font-stretch-wide text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-paper"
      >
        {title}
      </Heading>

      {intro && <p className="max-w-[65ch] text-sm text-muted md:text-base">{intro}</p>}
    </Reveal>
  )
}

export default SectionHeader
