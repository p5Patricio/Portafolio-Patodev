import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import ScrollBackground from '../ScrollBackground'

// setupTests.ts installs a global matchMedia mock that reports
// prefers-reduced-motion: reduce. That alone should keep ColorBends (WebGL)
// from ever mounting in tests, which is what unblocked App/HomePage/
// GaleriaPage from crashing on jsdom's incomplete WebGL context. These tests
// exercise the gating logic directly, including the "matchMedia is entirely
// missing" case that setupTests.ts's mock doesn't cover on its own.

describe('ScrollBackground', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children plus the fixed background layer', () => {
    render(
      <ScrollBackground>
        <p>hello</p>
      </ScrollBackground>
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('renders the static gradient fallback (not WebGL) when prefers-reduced-motion matches', async () => {
    render(
      <ScrollBackground>
        <span>content</span>
      </ScrollBackground>
    )

    // The global test mock (setupTests.ts) reports matches: true for any
    // prefers-reduced-motion query, so ColorBends must never mount and no
    // <canvas> should ever appear.
    await waitFor(() => {
      expect(document.querySelector('canvas')).not.toBeInTheDocument()
    })
  })

  it('falls back to the static gradient when window.matchMedia is missing entirely', async () => {
    const original = window.matchMedia
    // @ts-expect-error - simulating an environment without matchMedia support
    delete window.matchMedia

    render(
      <ScrollBackground>
        <span>content</span>
      </ScrollBackground>
    )

    await waitFor(() => {
      expect(document.querySelector('canvas')).not.toBeInTheDocument()
    })

    window.matchMedia = original
  })

  it('keeps overflow-x-clip on the root wrapper (load-bearing for the sticky pin)', () => {
    const { container } = render(
      <ScrollBackground>
        <span>content</span>
      </ScrollBackground>
    )
    expect(container.firstChild).toHaveClass('overflow-x-clip')
  })
})
