import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils'
import LikeButton from '../LikeButton'

const STORAGE_KEY = 'portfolio:liked'
const QUESTION = /¿te gusta el portafolio\?/i

describe('LikeButton', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('fetches and displays the global count in a fixed capsule on mount', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 42 }),
    }))

    renderWithProviders(<LikeButton />)

    const button = await screen.findByRole('button', { name: QUESTION })
    expect(button).toHaveAttribute('aria-pressed', 'false')
    const wrapper = button.parentElement as HTMLElement
    expect(wrapper).toHaveClass('fixed', 'z-30')
    expect(button).not.toHaveClass('fixed')
    expect(wrapper.className).toContain('bottom-[max(1rem,env(safe-area-inset-bottom))]')
    expect(wrapper.className).toContain('right-[max(1rem,env(safe-area-inset-right))]')
    expect(screen.getByText('¿Te gusta el portafolio?')).toHaveClass('hidden', 'sm:inline')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /¿te gusta el portafolio\?, 42/i })).toBeInTheDocument()
    })
  })

  it('likes once, disables itself, shows thanks, and shows the new count', async () => {
    const user = userEvent.setup()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 43 }),
    }))

    renderWithProviders(<LikeButton />)

    const button = await screen.findByRole('button', { name: QUESTION })
    await waitFor(() => expect(screen.getByRole('button', { name: /¿te gusta el portafolio\?, 43/i })).toBeInTheDocument())

    await user.click(button)

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-pressed', 'true')
      expect(button).toBeDisabled()
      expect(screen.getByRole('button', { name: /¡gracias!, 43/i })).toBeInTheDocument()
    })
    expect(screen.getByText('¡Gracias!')).toBeInTheDocument()
    expect(localStorage.getItem(STORAGE_KEY)).toBe('1')
    expect(fetch).toHaveBeenLastCalledWith('/api/likes', { method: 'POST' })
  })

  it('restores the already-liked state and thank-you message from localStorage', async () => {
    localStorage.setItem(STORAGE_KEY, '1')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 10 }),
    }))

    renderWithProviders(<LikeButton />)

    const button = await screen.findByRole('button', { name: /¡gracias!/i })
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toBeDisabled()
    expect(screen.getByText('¡Gracias!')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /¡gracias!, 10/i })).toBeInTheDocument()
    })
  })

  it('hides the count on initial fetch failure without crashing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')))

    renderWithProviders(<LikeButton />)

    const button = await screen.findByRole('button', { name: /^¿te gusta el portafolio\?$/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await waitFor(() => expect(fetch).toHaveBeenCalledWith('/api/likes'))
    expect(screen.queryByRole('button', { name: /¿te gusta el portafolio\?, \d+/i })).not.toBeInTheDocument()
  })

  it('rolls back the optimistic update when POST fails', async () => {
    const user = userEvent.setup()
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => ({ count: 5 }) })
      .mockRejectedValueOnce(new Error('Server error')))

    renderWithProviders(<LikeButton />)

    const button = await screen.findByRole('button', { name: QUESTION })
    await waitFor(() => expect(screen.getByRole('button', { name: /¿te gusta el portafolio\?, 5/i })).toBeInTheDocument())

    await user.click(button)

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-pressed', 'false')
      expect(button).not.toBeDisabled()
      expect(screen.getByRole('button', { name: /¿te gusta el portafolio\?, 5/i })).toBeInTheDocument()
    })
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  describe('capsule entrance', () => {
    const okFetch = () =>
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ count: 1 }) }))

    const originalMatchMedia = window.matchMedia

    afterEach(() => {
      vi.useRealTimers()
      window.matchMedia = originalMatchMedia
    })

    function allowMotion() {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })) as unknown as typeof window.matchMedia
    }

    it('is JS-gated: hidden only under the html.js class until it enters', () => {
      okFetch()
      renderWithProviders(<LikeButton />)
      const wrapper = screen.getByRole('button', { name: QUESTION }).parentElement as HTMLElement
      // Without `.js` on <html> (SSR / no-JS) none of these selectors match, so it stays visible.
      expect(wrapper.className).toContain('[.js_&:not([data-entered]):not(:focus-within)]:opacity-0')
      expect(wrapper.className).toContain('duration-(--motion-duration-slow)')
      expect(wrapper.className).toContain('ease-out-expo')
      expect(wrapper.className).toContain('motion-reduce:transition-none')
    })

    it('enters only after the hero entrance has settled', () => {
      allowMotion()
      vi.useFakeTimers()
      okFetch()
      renderWithProviders(<LikeButton />)
      const wrapper = screen.getByRole('button', { name: QUESTION }).parentElement as HTMLElement

      expect(wrapper).not.toHaveAttribute('data-entered')
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(wrapper).not.toHaveAttribute('data-entered')
      act(() => {
        vi.advanceTimersByTime(400)
      })
      expect(wrapper).toHaveAttribute('data-entered')
    })

    it('enters immediately under prefers-reduced-motion', () => {
      okFetch()
      renderWithProviders(<LikeButton />)
      const wrapper = screen.getByRole('button', { name: QUESTION }).parentElement as HTMLElement
      expect(wrapper).toHaveAttribute('data-entered')
    })
  })
})
