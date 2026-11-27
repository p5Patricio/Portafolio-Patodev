import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { useReducedMotion } from 'framer-motion'
import MotionProvider from '../MotionProvider'
import ParallaxMedia from '../ParallaxMedia'

// Framer caches the OS preference globally, so the hook is the seam for
// switching "prefers-reduced-motion" per test. Defaults to the real hook
// (reduced motion ON through the matchMedia mock in setupTests).
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>()
  return { ...actual, useReducedMotion: vi.fn(actual.useReducedMotion) }
})

const allowMotion = () => vi.mocked(useReducedMotion).mockReturnValue(false)

function Cover() {
  return (
    <MotionProvider>
      <ParallaxMedia className="group aspect-[16/10] rounded">
        <img src="/cover.webp" alt="Project cover" width={900} height={563} loading="lazy" decoding="async" />
      </ParallaxMedia>
    </MotionProvider>
  )
}

function getLayers() {
  const img = screen.getByRole('img', { name: 'Project cover' })
  const layer = img.parentElement as HTMLElement
  const frame = layer.parentElement as HTMLElement
  return { img, layer, frame }
}

describe('ParallaxMedia', () => {
  afterEach(() => {
    vi.mocked(useReducedMotion).mockReset()
  })

  it('renders the media untouched inside a clipping frame that keeps the caller classes', () => {
    render(<Cover />)
    const { img, frame } = getLayers()

    expect(img).toHaveAttribute('src', '/cover.webp')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('decoding', 'async')
    expect(img).toHaveAttribute('width', '900')
    expect(img).toHaveAttribute('height', '563')
    expect(frame).toHaveClass('group', 'aspect-[16/10]', 'rounded', 'overflow-hidden')
  })

  it('stays static at scale 1 under prefers-reduced-motion', () => {
    render(<Cover />)
    const { layer, frame } = getLayers()

    expect(frame.style.transform).toMatch(/^(none)?$/)
    expect(layer.style.transform).toMatch(/^(none)?$/)
  })

  it('prerenders neutral transforms that match the static layout', () => {
    allowMotion()
    const html = renderToString(<Cover />)

    expect(html).toContain('alt="Project cover"')
    expect(html).not.toMatch(/translateY|scale\(/)
  })

  it('overscales the media and links its depth to scroll when motion is allowed', async () => {
    allowMotion()
    render(<Cover />)
    const { layer } = getLayers()

    await waitFor(() => expect(layer.style.transform).toMatch(/scale\(1\.1\d*\)/))
    expect(layer.style.transform).toMatch(/translateY\(-?\d/)
  })
})
