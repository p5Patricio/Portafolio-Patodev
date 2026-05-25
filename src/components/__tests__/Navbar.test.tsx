import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders a single desktop brand link', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getAllByRole('link', { name: /portafolio/i })).toHaveLength(1)
  })

  it('renders navigation links', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Experiencia')).toBeInTheDocument()
    expect(screen.getByText('Proyectos')).toBeInTheDocument()
    expect(screen.getByText('Herramientas')).toBeInTheDocument()
    expect(screen.getByText('Sobre mí')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('renders language selectors (desktop + mobile)', () => {
    renderWithProviders(<Navbar />)
    const selectors = screen.getAllByRole('group', { name: /language selector/i })
    expect(selectors).toHaveLength(2)
  })
})
