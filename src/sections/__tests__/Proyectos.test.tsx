import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
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
      expect(img).toHaveClass('motion-safe:group-hover/project:scale-[1.03]')

      // The hover zoom lives on the image; the scroll-linked depth lives on
      // the wrapping layer, so the two transforms never fight.
      const frame = img.closest('.aspect-\\[16\\/10\\]') as HTMLElement
      expect(frame).toHaveClass('overflow-hidden', 'rounded')
      expect(img.parentElement).not.toBe(frame)
      expect(frame).toContainElement(img.parentElement)
    })
  })

  it('shares the gallery hover language: the whole row (hover or keyboard focus) tints the title and zooms the cover', () => {
    renderWithProviders(<Proyectos />)

    FEATURED_REPOS.slice(0, 3).forEach((repo) => {
      const title = screen.getByRole('heading', { level: 3, name: repo.name })
      const row = title.closest('.group\\/project') as HTMLElement
      expect(row).not.toBeNull()
      expect(title).toHaveClass('group-hover/project:text-sky', 'group-focus-within/project:text-sky')

      const cover = row.querySelector('img')
      if (cover) {
        expect(cover).toHaveClass(
          'motion-safe:group-hover/project:scale-[1.03]',
          'motion-safe:group-focus-within/project:scale-[1.03]',
        )
      }
    })
  })

  it('renders demo/code links with accessible names', () => {
    renderWithProviders(<Proyectos />)
    expect(screen.getAllByRole('link', { name: /demo/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /código/i }).length).toBeGreaterThan(0)
  })

  it('renders no per-cover view transition names (the route change is a plain cross-fade)', () => {
    const { container } = renderWithProviders(<Proyectos />)
    expect(container.innerHTML).not.toMatch(/project-cover-/)
    const named = [...container.querySelectorAll<HTMLElement>('*')].filter((el) => el.style.viewTransitionName)
    expect(named).toEqual([])
  })

  it('opts the "view all" links into the view transition', () => {
    const start = vi.fn(() => ({ finished: Promise.resolve(), ready: Promise.resolve(), updateCallbackDone: Promise.resolve() }))
    Object.defineProperty(document, 'startViewTransition', { configurable: true, writable: true, value: start })
    try {
      renderWithProviders(<Proyectos />)
      const links = screen.getAllByRole('link', { name: /ver todos los proyectos/i })
      links.forEach((link) => fireEvent.click(link))
      expect(start).toHaveBeenCalledTimes(links.length)
    } finally {
      Reflect.deleteProperty(document, 'startViewTransition')
    }
  })
})
