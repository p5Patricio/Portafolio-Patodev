import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
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
})
