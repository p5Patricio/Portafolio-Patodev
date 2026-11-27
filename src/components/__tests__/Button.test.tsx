import { afterEach, describe, it, expect, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import type { ComponentProps } from 'react'
import { renderWithProviders } from '../../test-utils'
import MotionProvider from '../MotionProvider'
import { MAGNETIC_PULL } from '../Magnetic'
import Button from '../Button'

// Framer caches the OS preference globally, so the hook is the seam for
// switching "prefers-reduced-motion" per test (ON by default in setupTests).
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>()
  return { ...actual, useReducedMotion: vi.fn(actual.useReducedMotion) }
})

const originalMatchMedia = window.matchMedia

/** Reports a hover-capable fine pointer (mouse/trackpad) and allows motion. */
function useMouseWithMotion() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('pointer: fine'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
  vi.mocked(useReducedMotion).mockReturnValue(false)
}

function renderWithMotion(props: ComponentProps<typeof Button>) {
  renderWithProviders(
    <MotionProvider>
      <Button {...props} />
    </MotionProvider>,
  )
}

function mockBox(el: HTMLElement) {
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    top: 0,
    right: 120,
    bottom: 44,
    width: 120,
    height: 44,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  })
}

describe('Button', () => {
  afterEach(() => {
    window.matchMedia = originalMatchMedia
    vi.mocked(useReducedMotion).mockReset()
  })

  it.each([
    ['link', { href: 'https://example.com', children: 'Visit' }],
    ['router link', { to: '/galeria', children: 'Visit' }],
    ['button', { type: 'button', children: 'Visit' }],
  ] as const)('pulls the %s toward a fine pointer and its label a bit further', async (role, props) => {
    useMouseWithMotion()
    renderWithMotion(props as ComponentProps<typeof Button>)
    const el = screen.getByRole(role === 'button' ? 'button' : 'link', { name: /visit/i })
    const label = screen.getByText('Visit')
    mockBox(el)

    fireEvent.pointerMove(el, { clientX: 120, clientY: 22, pointerType: 'mouse' })

    await waitFor(() => expect(el.style.transform).toBe(`translateX(${MAGNETIC_PULL}px)`))
    await waitFor(() => expect(label.style.transform).toMatch(/translateX\(\d/))

    fireEvent.pointerLeave(el)

    await waitFor(() => expect(el.style.transform).toMatch(/^(none)?$/))
  })

  it('does not pull on touch/coarse pointers', async () => {
    vi.mocked(useReducedMotion).mockReturnValue(false)
    renderWithMotion({ href: 'https://example.com', children: 'Visit' })
    const el = screen.getByRole('link', { name: /visit/i })
    mockBox(el)

    fireEvent.pointerMove(el, { clientX: 120, clientY: 22 })
    await new Promise((resolve) => setTimeout(resolve, 80))

    expect(el.style.transform).toMatch(/^(none)?$/)
  })

  it('keeps its accessible name and a single label when the label is wrapped for depth', () => {
    renderWithMotion({ href: 'https://example.com', ariaLabel: 'Download CV', variant: 'secondary', children: 'CV' })
    const link = screen.getByRole('link', { name: 'Download CV' })
    expect(link).toHaveTextContent('CV→')
  })

  it('has a refined press state on every variant (scale only, no layout change)', () => {
    renderWithMotion({ type: 'button', children: 'Press' })
    const btn = screen.getByRole('button', { name: /press/i })
    expect(btn).toHaveClass('motion-safe:active:not-disabled:scale-[0.98]')
    // The magnetic pull drives `transform` inline: CSS must not transition it.
    expect(btn.className).not.toMatch(/(^|\s)transition(-all|-transform)?(\s|$)/)
  })

  it('nudges the arrow on keyboard focus as well as on hover', () => {
    renderWithMotion({ href: 'https://example.com', children: 'Visit' })
    const arrow = screen.getByText('→')
    expect(arrow).toHaveAttribute('aria-hidden', 'true')
    expect(arrow).toHaveClass('group-hover:translate-x-1', 'group-focus-visible:translate-x-1')
  })

  it('keeps the 2px sky focus ring', () => {
    renderWithMotion({ to: '/galeria', children: 'Galería' })
    expect(screen.getByRole('link', { name: /galería/i })).toHaveClass(
      'focus-visible:outline-2',
      'focus-visible:outline-sky',
    )
  })

  it('prerenders without any transform', () => {
    useMouseWithMotion()
    const html = renderToString(
      <MemoryRouter>
        <MotionProvider>
          <Button href="https://example.com">Visit</Button>
        </MotionProvider>
      </MemoryRouter>,
    )
    expect(html).toContain('Visit')
    expect(html).not.toMatch(/style="[^"]*translate/)
  })

  it('renders as an external link when href is provided', () => {
    renderWithProviders(<Button href="https://example.com">Link</Button>)
    const link = screen.getByRole('link', { name: /link/i })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders as an in-page anchor without target when external is false', () => {
    renderWithProviders(
      <Button href="#contacto" external={false}>
        Contactar
      </Button>
    )
    const link = screen.getByRole('link', { name: /contactar/i })
    expect(link).toHaveAttribute('href', '#contacto')
    expect(link).not.toHaveAttribute('target')
  })

  it('renders as an internal router link when to is provided', () => {
    renderWithProviders(<Button to="/galeria">Galería</Button>)
    const link = screen.getByRole('link', { name: /galería/i })
    expect(link).toHaveAttribute('href', '/galeria')
  })

  it('renders as a button and handles clicks', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    renderWithProviders(
      <Button type="button" onClick={handleClick}>
        Click me
      </Button>
    )
    const btn = screen.getByRole('button', { name: /click me/i })
    await user.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    renderWithProviders(
      <Button type="submit" disabled>
        Submit
      </Button>
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('defaults to the primary variant', () => {
    renderWithProviders(<Button href="https://example.com">Link</Button>)
    const link = screen.getByRole('link', { name: /link/i })
    expect(link.classList.contains('bg-paper')).toBe(true)
  })

  it('applies the secondary variant', () => {
    renderWithProviders(
      <Button href="https://example.com" variant="secondary">
        Secondary
      </Button>
    )
    const link = screen.getByRole('link', { name: /secondary/i })
    expect(link.classList.contains('bg-paper')).toBe(false)
    expect(link.classList.contains('border')).toBe(true)
  })
})
