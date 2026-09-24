import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the hero section with id inicio', () => {
    renderWithProviders(<Hero />)
    const section = document.getElementById('inicio')
    expect(section).toBeInTheDocument()
  })

  it('renders a single accessible h1 with the full name', () => {
    renderWithProviders(<Hero />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('Patricio García')
  })

  it('renders the decorative name lines', () => {
    renderWithProviders(<Hero />)
    expect(screen.getByText('Patricio')).toBeInTheDocument()
    expect(screen.getByText('García')).toBeInTheDocument()
  })

  it('renders the availability line and positioning statement', () => {
    renderWithProviders(<Hero />)
    expect(screen.getByText(/disponible para nuevos proyectos/i)).toBeInTheDocument()
    expect(screen.getByText(/full.?stack/i)).toBeInTheDocument()
  })

  it('renders the decorative hero logo with a descriptive alt/label', () => {
    renderWithProviders(<Hero />)
    expect(screen.getAllByRole('img', { name: /logo de patodev/i }).length).toBeGreaterThan(0)
  })

  it('renders a primary "Contactar" CTA that links to #contacto', () => {
    renderWithProviders(<Hero />)
    const cta = screen.getByRole('link', { name: /contactar/i })
    expect(cta).toHaveAttribute('href', '#contacto')
    // In-page anchor: must not force a new tab like the external CV link does
    expect(cta).not.toHaveAttribute('target')
  })

  it('renders a secondary "Descargar CV" CTA that opens the résumé PDF in a new tab', () => {
    renderWithProviders(<Hero />)
    const cta = screen.getByRole('link', { name: /descargar cv/i })
    expect(cta).toHaveAttribute('href', 'https://p5patricio.github.io/cv-patricio/es/cv_es.pdf')
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
