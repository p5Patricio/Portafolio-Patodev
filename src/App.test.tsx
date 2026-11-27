import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from './test-utils'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />)
    expect(document.body).toBeInTheDocument()
  })

  it('includes skip-to-content link', () => {
    renderWithProviders(<App />)
    const skipLink = screen.getByText(/saltar al contenido/i)
    expect(skipLink).toBeInTheDocument()
    expect(skipLink.tagName).toBe('A')
  })

  it('renders the home page by default', () => {
    renderWithProviders(<App />)
    expect(document.getElementById('inicio')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /patricio garcía/i })).toBeInTheDocument()
  })

  it('renders the shared header (pointing back at home anchors) plus a back link on the gallery route', async () => {
    renderWithProviders(<App />, { route: '/galeria' })
    // The shared Header is present, but its nav links point back at the
    // home page's anchors (not plain in-page hashes) on this route.
    const trabajoLink = screen.getByRole('link', { name: 'Trabajo' })
    expect(trabajoLink).toHaveAttribute('href', '/#proyectos')
    // Gallery also renders its own explicit "back to home" link.
    const backLink = await screen.findByRole('link', { name: /volver al inicio/i })
    expect(backLink).toBeInTheDocument()
  })

  it('renders language selectors on home', () => {
    renderWithProviders(<App />)
    const selectors = screen.getAllByRole('group', { name: /language selector/i })
    expect(selectors.length).toBeGreaterThanOrEqual(1)
  })

  it.each(['/', '/galeria'])('renders one fixed like capsule on %s', async (route) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ count: 7 }) }))
    renderWithProviders(<App />, { route })

    const buttons = await screen.findAllByRole('button', { name: /¿te gusta el portafolio\?/i })
    expect(buttons).toHaveLength(1)
    expect(buttons[0].parentElement).toHaveClass('fixed', 'z-30')
    expect(buttons[0]).not.toHaveClass('fixed')
  })

  it('runs the "view all" navigation as a view transition and captures the gallery at the top once it commits', async () => {
    const start = vi.fn((update: () => unknown) => {
      const done = Promise.resolve(update())
      return { finished: done, ready: done, updateCallbackDone: done }
    })
    Object.defineProperty(document, 'startViewTransition', { configurable: true, writable: true, value: start })
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    try {
      renderWithProviders(<App />)
      fireEvent.click(screen.getAllByRole('link', { name: /ver todos los proyectos/i })[0])

      expect(start).toHaveBeenCalledTimes(1)
      expect(await screen.findByRole('heading', { level: 1, name: /todos los proyectos/i })).toBeInTheDocument()
      // The route commit (not the 1s fallback) releases the transition.
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' })
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    } finally {
      Reflect.deleteProperty(document, 'startViewTransition')
      scrollTo.mockRestore()
    }
  })
})
