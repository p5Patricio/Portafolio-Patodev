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
    expect(screen.getByRole('heading', { level: 1, name: /patricio garcía ingeniero de software/i })).toBeInTheDocument()
  })

  it('does not render main navbar on gallery route', async () => {
    renderWithProviders(<App />, { route: '/galeria' })
    // Gallery has its own back button, not the main navbar links
    expect(screen.queryByText('Inicio')).not.toBeInTheDocument()
    const backLink = await screen.findByRole('link', { name: /volver al inicio/i })
    expect(backLink).toBeInTheDocument()
  })

  it('renders language selectors on home', () => {
    renderWithProviders(<App />)
    const selectors = screen.getAllByRole('group', { name: /language selector/i })
    expect(selectors.length).toBeGreaterThanOrEqual(1)
  })
})
