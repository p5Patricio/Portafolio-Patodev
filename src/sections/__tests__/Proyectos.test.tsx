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

  it('renders exactly the first three featured projects', () => {
    renderWithProviders(<Proyectos />)
    const firstThree = FEATURED_REPOS.slice(0, 3)
    firstThree.forEach((repo) => {
      expect(screen.getByText(repo.name)).toBeInTheDocument()
    })

    const rest = FEATURED_REPOS.slice(3)
    rest.forEach((repo) => {
      expect(screen.queryByText(repo.name)).not.toBeInTheDocument()
    })
  })

  it('renders the "view all projects" link (in the header meta slot and the mobile-only fallback)', () => {
    renderWithProviders(<Proyectos />)
    const links = screen.getAllByRole('link', { name: /ver todos los proyectos/i })
    expect(links.length).toBeGreaterThanOrEqual(1)
    links.forEach((link) => expect(link).toHaveAttribute('href', '/galeria'))
  })

  it('does not render bracketed technology tags anymore', () => {
    const { container } = renderWithProviders(<Proyectos />)
    expect(container.textContent).not.toMatch(/\[[A-Z0-9.]+\]/)
  })

  it('keeps each cover lazy, sized and labelled, on a parallax layer separate from the hover zoom', () => {
    renderWithProviders(<Proyectos />)
    const withCovers = FEATURED_REPOS.slice(0, 3).filter((repo) => repo.images?.[0])
    expect(withCovers.length).toBeGreaterThan(0)

    withCovers.forEach((repo) => {
      const img = screen.getByRole('img', { name: repo.name })
      expect(img).toHaveAttribute('src', repo.images![0])
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('decoding', 'async')
      expect(img).toHaveAttribute('width', '900')
      expect(img).toHaveAttribute('height', '563')
      expect(img).toHaveClass('group-hover:scale-[1.03]')

      // The hover zoom lives on the image; the scroll-linked depth lives on
      // the wrapping layer, so the two transforms never fight.
      const frame = img.closest('.aspect-\\[16\\/10\\]') as HTMLElement
      expect(frame).toHaveClass('group', 'overflow-hidden', 'rounded')
      expect(img.parentElement).not.toBe(frame)
      expect(frame).toContainElement(img.parentElement)
    })
  })

  it('renders demo/code links with accessible names', () => {
    renderWithProviders(<Proyectos />)
    expect(screen.getAllByRole('link', { name: /demo/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /código/i }).length).toBeGreaterThan(0)
  })
})
