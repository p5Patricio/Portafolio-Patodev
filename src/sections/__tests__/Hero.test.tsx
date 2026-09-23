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

  it('renders title text words', () => {
    renderWithProviders(<Hero />)
    expect(screen.getByText((content) => content.includes('Patricio'))).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('Ingeniero'))).toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('Software'))).toBeInTheDocument()
  })

  it('renders the massive integrated logo', () => {
    renderWithProviders(<Hero />)
    // Massive logo as background
    expect(screen.getByRole('img', { name: /logo personal/i })).toBeInTheDocument()
  })

  it('renders a single accessible h1 with natural (spaced) text content', () => {
    renderWithProviders(<Hero />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('Patricio García Ingeniero de Software')
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
