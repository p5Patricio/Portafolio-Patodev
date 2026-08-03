import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import Proyectos from '../Proyectos'
import { FEATURED_REPOS } from '../../data/repos'

describe('Proyectos', () => {
  it('renders section with id proyectos', () => {
    renderWithProviders(<Proyectos />)
    expect(document.getElementById('proyectos')).toBeInTheDocument()
  })

  it('renders the title', () => {
    renderWithProviders(<Proyectos />)
    expect(screen.getByRole('heading', { name: /proyect/i })).toBeInTheDocument()
  })

  it('renders all featured project cards', () => {
    renderWithProviders(<Proyectos />)
    FEATURED_REPOS.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument()
    })
  })

  it('renders the "view all projects" CTA link', () => {
    renderWithProviders(<Proyectos />)
    const link = screen.getByRole('link', { name: /ver todos los proyectos/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/galeria')
  })
})
