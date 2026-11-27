import { isValidElement, useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import TechText, { type TechTextLayout, type TechTextLineLayout } from './TechText'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'div'

type TechTitleProps = {
  /**
   * Semantic wrapper. Use the same heading level the original title had so
   * the document outline stays intact.
   */
  as?: HeadingTag
  id?: string
  className?: string
  children: ReactNode
  'aria-hidden'?: boolean | 'true' | 'false'
}

const CANVAS_VERTICAL_PADDING_EM = 0.25

const TECH_TEXT_CONFIG = {
  color: '#ffffff',
  accentColor: '#ffffff',
  intro: 'none' as const,
  reveal: 'letter' as const,
  speed: 1,
  bounce: 0.4,
  align: 'left' as const,
  lineStyle: 'dashed' as const,
  dashLength: 4,
  dashGap: 2,
  strokeWidth: 1.5,
  specks: 15,
  clickKick: true,
  draggable: true,
  sweep: true,
  selection: true,
  labels: true,
  guides: false,
}

const textContent = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textContent).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === 'br') return '\n'
    return textContent(node.props.children)
  }
  return ''
}

const measureRenderedLines = (
  host: HTMLElement,
  source: HTMLElement
): { layout: TechTextLayout; padding: number } | null => {
  const hostRect = host.getBoundingClientRect()
  const fontSize = Number.parseFloat(getComputedStyle(host).fontSize) || 0
  const padding = fontSize * CANVAS_VERTICAL_PADDING_EM
  const walker = document.createTreeWalker(source, NodeFilter.SHOW_TEXT)
  const lines: TechTextLineLayout[] = []
  let index = 0

  while (walker.nextNode()) {
    const textNode = walker.currentNode as Text
    let offset = 0

    for (const char of Array.from(textNode.data)) {
      const start = offset
      offset += char.length
      const glyphIndex = index++
      if (!char.trim()) continue

      const range = document.createRange()
      range.setStart(textNode, start)
      range.setEnd(textNode, offset)
      if (typeof range.getClientRects !== 'function') return null
      const rect = range.getClientRects()[0]
      if (!rect || (rect.width === 0 && rect.height === 0)) continue

      const top = rect.top - hostRect.top + padding
      let line = lines.find(candidate => Math.abs(candidate.top - top) < 1)
      if (!line) {
        line = { top, height: rect.height, glyphs: [] }
        lines.push(line)
      }
      line.height = Math.max(line.height, rect.height)
      line.glyphs.push({ char, x: rect.left - hostRect.left, index: glyphIndex })
    }
  }

  if (!lines.some(line => line.glyphs.length > 0)) return null
  return { layout: { lines: lines.sort((a, b) => a.top - b.top) }, padding }
}

/**
 * Decorative ReactBits TechText wrapper that keeps the real heading text in
 * the DOM for screen readers, crawlers and the SSR/prerendered HTML. The
 * original text owns layout and line breaks; canvas is enabled only after it
 * has drawn the measured glyphs. Without JS or with reduced motion, the plain
 * title remains visible and no canvas is mounted.
 */
function TechTitle({ as = 'h2', id, className = '', children, 'aria-hidden': ariaHidden }: TechTitleProps) {
  const Tag: ElementType = as
  const SourceTag: ElementType = as === 'div' ? 'div' : 'span'
  const hostRef = useRef<HTMLElement | null>(null)
  const sourceRef = useRef<HTMLElement | null>(null)
  const text = textContent(children)
  const [enabled, setEnabled] = useState(false)
  const [measurement, setMeasurement] = useState<{
    text: string
    layout: TechTextLayout
    padding: number
  } | null>(null)
  const [readyText, setReadyText] = useState<string | null>(null)
  const layout = enabled && measurement?.text === text ? measurement.layout : null
  const canvasPadding = layout && measurement ? measurement.padding : 0
  const enhanced = Boolean(layout && readyText === text)

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const update = () => {
      const nextEnabled = !query?.matches
      setEnabled(nextEnabled)
      if (!nextEnabled) setReadyText(null)
    }

    update()
    query?.addEventListener?.('change', update)
    return () => query?.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    const host = hostRef.current
    const source = sourceRef.current
    if (!enabled || !host || !source) return undefined

    let cancelled = false
    let settled = false
    const measure = () => {
      if (cancelled || !settled) return
      const nextMeasurement = measureRenderedLines(host, source)
      setMeasurement(nextMeasurement ? { text, ...nextMeasurement } : null)
      if (!nextMeasurement) setReadyText(null)
    }
    const settle = async () => {
      try {
        await document.fonts?.ready
      } catch {
        // The canvas readiness gate keeps the original title visible on font failures.
      }
      const animations = source.getAnimations?.({ subtree: true }) ?? []
      await Promise.all(animations.map(animation => animation.finished.catch(() => undefined)))
      if (cancelled) return
      settled = true
      measure()
    }

    void settle()
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    resizeObserver?.observe(host)
    window.addEventListener('resize', measure, { passive: true })

    return () => {
      cancelled = true
      resizeObserver?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [children, enabled, text])

  return (
    <Tag
      ref={(node: HTMLDivElement | HTMLHeadingElement | null) => {
        hostRef.current = node
      }}
      id={id}
      className={`relative ${className}`.trim()}
      style={{ overflow: 'visible' }}
      aria-hidden={ariaHidden}
    >
      <SourceTag
        ref={(node: HTMLDivElement | HTMLSpanElement | null) => {
          sourceRef.current = node
        }}
        className="tech-title-source relative z-0"
        data-tech-text-ready={enhanced ? 'true' : 'false'}
        style={{ color: enhanced ? 'transparent' : undefined }}
      >
        {children}
      </SourceTag>
      {layout ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 z-10"
          style={{ top: -canvasPadding, bottom: -canvasPadding }}
        >
          <TechText
            key={text}
            text={text}
            hostRef={hostRef}
            layout={layout}
            inheritTypography
            onReady={() => setReadyText(text)}
            {...TECH_TEXT_CONFIG}
          />
        </span>
      ) : null}
    </Tag>
  )
}

export default TechTitle
