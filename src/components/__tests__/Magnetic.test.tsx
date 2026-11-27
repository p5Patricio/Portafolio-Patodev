import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { m, useReducedMotion } from 'framer-motion'
import MotionProvider from '../MotionProvider'
import { MAGNETIC_DEPTH, MAGNETIC_PULL, useMagnetic } from '../Magnetic'

// Framer caches the OS preference globally, so the hook is the seam for
// switching "prefers-reduced-motion" per test (reduced motion is ON by default
// through the matchMedia mock in setupTests).
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>()
  return { ...actual, useReducedMotion: vi.fn(actual.useReducedMotion) }
})

const originalMatchMedia = window.matchMedia

/** Reports a hover-capable fine pointer (mouse/trackpad) on top of the default mock. */
function useFinePointerDevice() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('prefers-reduced-motion') || query.includes('pointer: fine'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

const allowMotion = () => vi.mocked(useReducedMotion).mockReturnValue(false)

function Probe({ disabled = false }: { disabled?: boolean }) {
  const magnetic = useMagnetic({ disabled })
  return (
    <m.button type="button" style={magnetic.style} {...magnetic.handlers}>
      <m.span data-testid="inner" style={magnetic.innerStyle}>
        Pull me
      </m.span>
    </m.button>
  )
}

function renderProbe(props: { disabled?: boolean } = {}) {
  render(
    <MotionProvider>
      <Probe {...props} />
    </MotionProvider>,
  )
  const button = screen.getByRole('button', { name: 'Pull me' })
  vi.spyOn(button, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    top: 0,
    right: 100,
    bottom: 40,
    width: 100,
    height: 40,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  })
  return { button, inner: screen.getByTestId('inner') }
}

/** Pointer at the right/bottom edge: the strongest pull on both axes. */
const EDGE = { clientX: 100, clientY: 40, pointerType: 'mouse' }

const settle = () => new Promise((resolve) => setTimeout(resolve, 80))

describe('useMagnetic', () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReset()
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('keeps the pull subtle: the box travels at most 6px and the label a bit further', () => {
    expect(MAGNETIC_PULL).toBe(6)
    expect(MAGNETIC_DEPTH).toBeGreaterThan(0)
    expect(MAGNETIC_DEPTH).toBeLessThanOrEqual(MAGNETIC_PULL)
  })

  it('pulls the element toward a fine pointer and springs back when it leaves', async () => {
    useFinePointerDevice()
    allowMotion()
    const { button, inner } = renderProbe()

    fireEvent.pointerMove(button, EDGE)

    await waitFor(() => expect(button.style.transform).toBe(`translateX(${MAGNETIC_PULL}px) translateY(${MAGNETIC_PULL}px)`))
    await waitFor(() => expect(inner.style.transform).toMatch(/translateX\(\d/))

    fireEvent.pointerLeave(button, EDGE)

    await waitFor(() => expect(button.style.transform).toMatch(/^(none)?$/))
  })

  it('stays still on touch/coarse pointers', async () => {
    allowMotion()
    const { button, inner } = renderProbe()

    fireEvent.pointerMove(button, EDGE)
    await settle()

    expect(button.style.transform).toMatch(/^(none)?$/)
    expect(inner.style.transform).toMatch(/^(none)?$/)
  })

  it('ignores touch input even on a device that also has a fine pointer', async () => {
    useFinePointerDevice()
    allowMotion()
    const { button } = renderProbe()

    fireEvent.pointerMove(button, { ...EDGE, pointerType: 'touch' })
    await settle()

    expect(button.style.transform).toMatch(/^(none)?$/)
  })

  it('stays still under prefers-reduced-motion', async () => {
    useFinePointerDevice()
    vi.mocked(useReducedMotion).mockReturnValue(true)
    const { button } = renderProbe()

    fireEvent.pointerMove(button, EDGE)
    await settle()

    expect(button.style.transform).toMatch(/^(none)?$/)
  })

  it('stays still while disabled', async () => {
    useFinePointerDevice()
    allowMotion()
    const { button } = renderProbe({ disabled: true })

    fireEvent.pointerMove(button, EDGE)
    await settle()

    expect(button.style.transform).toMatch(/^(none)?$/)
  })

  it('prerenders a neutral transform', () => {
    allowMotion()
    const html = renderToString(
      <MotionProvider>
        <Probe />
      </MotionProvider>,
    )

    expect(html).toContain('Pull me')
    expect(html).not.toMatch(/style="[^"]*translate/)
  })
})
