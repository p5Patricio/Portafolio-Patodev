import type { CSSProperties, ReactNode } from 'react'
import Reveal from './Reveal'
import SplitWords, { WORD_GAP } from './SplitWords'

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

/** Sequence positions (in `--motion-stagger` steps): `01` → `/ LABEL` (+ meta)
 *  → title, word by word → intro. */
const ORDER_INDEX = 0
const ORDER_LABEL = 1
const ORDER_TITLE = 2

const seq = (order: number) => ({ '--seq-order': order }) as CSSProperties

/**
 * Swiss-style section header: `01 / LABEL` mono line (index in sky) with
 * optional right-aligned meta, then the section title in sentence case.
 *
 * Scroll entrance (see "Section header sequence" in src/index.css): once
 * ~15% visible, the mono index and label rise through their masks, then the
 * title rises word by word through per-word masks, then the intro fades up —
 * one orchestrated sequence, staggered by `--motion-stagger`. Every piece is
 * real, readable text in the DOM from the first (prerendered) paint; the
 * hidden states only apply under `.js`, and reduced motion shows everything.
 */
function SectionHeader({ index, label, title, meta, intro, id, as: Heading = 'h2' }: SectionHeaderProps) {
  const titleWords = title.split(WORD_GAP).filter((part) => part && !WORD_GAP.test(part)).length

  return (
    <Reveal variant="sequence" className="flex flex-col gap-4 md:gap-5">
      <div className="seq-label flex items-baseline justify-between gap-4">
        <p className="mono-label text-[12px] text-muted md:text-xs">
          <span className="split-mask">
            <span className="split-word seq-rise text-sky" style={seq(ORDER_INDEX)}>
              {index}
            </span>
          </span>{' '}
          <span className="split-mask">
            <span className="split-word seq-rise" style={seq(ORDER_LABEL)}>
              / {label}
            </span>
          </span>
        </p>
        {meta &&
          (typeof meta === 'string' ? (
            <p className="seq-fade mono-label text-[12px] text-muted md:text-xs" style={seq(ORDER_LABEL)}>
              {meta}
            </p>
          ) : (
            <div className="seq-fade mono-label text-[12px] md:text-xs" style={seq(ORDER_LABEL)}>
              {meta}
            </div>
          ))}
      </div>

      <Heading
        id={id}
        className="font-stretch-wide text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-paper"
      >
        <SplitWords text={title} startOrder={ORDER_TITLE} wordClassName="seq-rise" />
      </Heading>

      {intro && (
        <p className="seq-fade-up max-w-[65ch] text-sm text-muted md:text-base" style={seq(ORDER_TITLE + titleWords)}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}

export default SectionHeader
