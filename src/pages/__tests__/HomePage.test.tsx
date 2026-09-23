import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import HomePage from '../HomePage'

describe('HomePage', () => {
  it('renders all major sections', () => {
    renderWithProviders(<HomePage />)

    // Hero
    expect(document.getElementById('inicio')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /patricio garcía ingeniero de software/i })).toBeInTheDocument()

    // Experience
    expect(document.getElementById('experiencia')).toBeInTheDocument()
    expect(screen.getByText('Universidad de Guanajuato')).toBeInTheDocument()

    // Projects
    expect(document.getElementById('proyectos')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /proyectos/i })).toBeInTheDocument()

    // Tools
    expect(document.getElementById('herramientas')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: /herramientas/i }).length).toBeGreaterThanOrEqual(1)

    // About
    expect(document.getElementById('sobre-mi')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sobre mí/i })).toBeInTheDocument()

    // Contact
    expect(document.getElementById('contacto')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /contacto/i })).toBeInTheDocument()
  })
})
