import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { useInView, useReducedMotion } from 'framer-motion'
import MotionProvider from '../MotionProvider'
import Crosshair, { CROSSHAIR_TRIGGER } from '../Crosshair'

// Framer caches the OS preference globally, so the hooks are the seams for
// switching "prefers-reduced-motion" and viewport entry per test. Both default
// to the real hooks (reduced motion ON through the matchMedia mock in
// setupTests; IntersectionObserver is a no-op mock, so nothing enters view).
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>()
  return {
    ...actual,
    useReducedMotion: vi.fn(actual.useReducedMotion),
    useInView: vi.fn(actual.useInView),
  }
})

const allowMotion = () => vi.mocked(useReducedMotion).mockReturnValue(false)

function placeInViewport() {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    top: 100,
    bottom: 110,
    left: 20,
    right: 30,
    width: 10,
    height: 10,
    x: 20,
    y: 100,
    toJSON: () => ({}),
  } as DOMRect)
}

function renderMark(className = 'absolute left-4 top-0') {
  const { container, rerender } = render(
    <MotionProvider>
      <Crosshair className={className} />
    </MotionProvider>,
  )
  const svg = container.querySelector('svg') as SVGSVGElement
  return { svg, rerender }
}

describe('Crosshair', () => {
  afterEach(() => {
    vi.mocked(useReducedMotion).mockReset()
    vi.mocked(useInView).mockReset()
    vi.restoreAllMocks()
  })

  it('renders a decorative, click-through sky mark that keeps the caller classes', () => {
    const { svg } = renderMark('absolute left-4 top-0 -translate-x-1/2')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveClass('pointer-events-none', 'text-sky', 'absolute', 'left-4', 'top-0', '-translate-x-1/2')
  })

  it('prerenders a neutral, untransformed mark', () => {
    allowMotion()
    const html = renderToString(
      <MotionProvider>
        <Crosshair />
      </MotionProvider>,
    )

    expect(html).toContain('aria-hidden="true"')
    expect(html).not.toMatch(/rotate\(|scale\(/)
  })

  it('stays static under prefers-reduced-motion, even when it starts off-screen', () => {
    const { svg } = renderMark()

    expect(svg.style.transform).toMatch(/^(none)?$/)
  })

  it('leaves a mark that is already on screen untouched, so it never flashes on load', () => {
    allowMotion()
    placeInViewport()
    const { svg } = renderMark()

    expect(svg.style.transform).toMatch(/^(none)?$/)
  })

  it('arms an off-screen mark and snaps it into register once it scrolls into view', async () => {
    allowMotion()
    vi.mocked(useInView).mockReturnValue(false)
    const { svg, rerender } = renderMark()

    await waitFor(() => {
      expect(svg.style.transform).toMatch(/rotate\(-45deg\)/)
      expect(svg.style.transform).toMatch(/scale\(0\.5\)/)
    })

    vi.mocked(useInView).mockReturnValue(true)
    rerender(
      <MotionProvider>
        <Crosshair className="absolute left-4 top-0" />
      </MotionProvider>,
    )

    await waitFor(() => expect(svg.style.transform).toMatch(/^(none)?$/))
  })

  it('shows a reticle only while its trigger group is hovered or holds keyboard focus', () => {
    const { svg } = renderMark()
    const reticle = svg.querySelector('rect') as SVGRectElement

    expect(CROSSHAIR_TRIGGER).toBe('group/crosshair')
    expect(reticle).toHaveClass(
      'opacity-0',
      'group-hover/crosshair:opacity-100',
      'group-focus-within/crosshair:opacity-100',
    )
  })
})
