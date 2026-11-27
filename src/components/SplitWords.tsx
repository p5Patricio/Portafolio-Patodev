import type { CSSProperties } from 'react'

type Props = {
  /** Plain text to split. Rendered text content stays identical to it. */
  text: string
  /** Sequence position of the first word; each next word is one step later. */
  startOrder?: number
  /** Extra class for every word (e.g. `seq-rise` to join a scroll sequence). */
  wordClassName?: string
}

/** Only ordinary whitespace separates words: NBSP keeps words together.
 *  (Capturing, so `split` keeps the separators.) */
export const WORD_GAP = /([ \t\n\r\f]+)/

/**
 * Splits text into per-word clipping masks for a mask reveal: each word is an
 * inline-block (`.split-word`) inside an `overflow: hidden` inline-block
 * (`.split-mask`, see src/index.css). The original whitespace is kept as real
 * text nodes between masks, so the line still wraps naturally, copy/paste
 * gives the original string, and the parent's accessible name / text content
 * is exactly `text` — no aria-label or duplicated screen-reader copy needed.
 *
 * Each word carries `--seq-order` (startOrder + its index) so CSS can stagger
 * it from the shared `--motion-stagger` token.
 */
function SplitWords({ text, startOrder = 0, wordClassName = '' }: Props) {
  let order = startOrder

  return text
    .split(WORD_GAP)
    .filter(Boolean)
    .map((part, i) =>
      WORD_GAP.test(part) ? (
        part
      ) : (
        <span key={i} className="split-mask">
          <span
            className={`split-word ${wordClassName}`.trim()}
            style={{ '--seq-order': order++ } as CSSProperties}
          >
            {part}
          </span>
        </span>
      ),
    )
}

export default SplitWords
