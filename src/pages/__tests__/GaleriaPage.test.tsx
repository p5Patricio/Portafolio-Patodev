import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import GaleriaPage from '../GaleriaPage'
import { ALL_REPOS_BY_YEAR } from '../../data/repos'

describe('GaleriaPage', () => {
  it('renders a single, real (non-scrambled) h1 with the page title', () => {
    renderWithProviders(<GaleriaPage />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('Todos los proyectos')
  })

  it('renders the mono "Archivo / N PROYECTOS" label', () => {
    renderWithProviders(<GaleriaPage />)
    expect(screen.getByText('Archivo')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`${ALL_REPOS_BY_YEAR.length} PROYECTOS`))).toBeInTheDocument()
  })

  it('renders a back-to-home link', () => {
    renderWithProviders(<GaleriaPage />)
    const link = screen.getByRole('link', { name: /volver al inicio/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders every project, grouped by year (newest first)', () => {
    renderWithProviders(<GaleriaPage />)

    ALL_REPOS_BY_YEAR.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument()
    })

    const years = [...new Set(ALL_REPOS_BY_YEAR.map((r) => r.year))].sort((a, b) => b - a)
    years.forEach((year) => {
      expect(screen.getByText(new RegExp(`Año ${year}`))).toBeInTheDocument()
    })
  })

  it('renders project cover images for every repository', () => {
    renderWithProviders(<GaleriaPage />)
    ALL_REPOS_BY_YEAR.forEach((repo) => {
      expect(screen.getByAltText(repo.name)).toBeInTheDocument()
    })
  })

  it('renders the back-to-top footer link', () => {
    renderWithProviders(<GaleriaPage />)
    const link = screen.getByRole('link', { name: /volver arriba/i })
    expect(link).toHaveAttribute('href', '#galeria-top')
  })

  it('does not render bracketed technology tags anymore', () => {
    const { container } = renderWithProviders(<GaleriaPage />)
    expect(container.textContent).not.toMatch(/\[[A-Z0-9.]+\]/)
  })
})
