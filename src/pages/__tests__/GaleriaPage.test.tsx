import { describe, it, expect, vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
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

  it('gives every card one hover state that keyboard focus inside the card also triggers', () => {
    renderWithProviders(<GaleriaPage />)

    ALL_REPOS_BY_YEAR.forEach((repo) => {
      const title = screen.getByRole('heading', { level: 3, name: repo.name })
      const card = title.closest('.group\\/project') as HTMLElement
      expect(card).not.toBeNull()
      expect(card).toHaveClass('hover:bg-surface', 'focus-within:bg-surface')
      expect(title).toHaveClass('group-hover/project:text-sky', 'group-focus-within/project:text-sky')

      const cover = screen.getByAltText(repo.name)
      expect(cover).toHaveClass(
        'motion-safe:group-hover/project:scale-[1.03]',
        'motion-safe:group-focus-within/project:scale-[1.03]',
      )
    })
  })

  it('lifts a decorative veil off the cover and draws a sky accent on hover/focus, without adding content', () => {
    renderWithProviders(<GaleriaPage />)
    const repo = ALL_REPOS_BY_YEAR[0]
    const card = screen.getByRole('heading', { level: 3, name: repo.name }).closest('.group\\/project') as HTMLElement

    const veil = card.querySelector('[data-cover-veil]') as HTMLElement
    expect(veil).toHaveAttribute('aria-hidden', 'true')
    expect(veil).toHaveClass('pointer-events-none', 'group-hover/project:opacity-0', 'group-focus-within/project:opacity-0')

    const accent = card.querySelector('[data-card-accent]') as HTMLElement
    expect(accent).toHaveAttribute('aria-hidden', 'true')
    expect(accent).toHaveClass(
      'pointer-events-none',
      'scale-x-0',
      'group-hover/project:scale-x-100',
      'group-focus-within/project:scale-x-100',
    )
    expect(accent).toBeEmptyDOMElement()
  })

  it('does not render bracketed technology tags anymore', () => {
    const { container } = renderWithProviders(<GaleriaPage />)
    expect(container.textContent).not.toMatch(/\[[A-Z0-9.]+\]/)
  })

  it('renders no per-cover view transition names (the route change is a plain cross-fade)', () => {
    const { container } = renderWithProviders(<GaleriaPage />)
    expect(container.innerHTML).not.toMatch(/project-cover-/)
    const named = [...container.querySelectorAll<HTMLElement>('*')].filter((el) => el.style.viewTransitionName)
    expect(named).toEqual([])
  })

  it('opts the back-to-home link into the view transition', () => {
    const start = vi.fn(() => ({ finished: Promise.resolve(), ready: Promise.resolve(), updateCallbackDone: Promise.resolve() }))
    Object.defineProperty(document, 'startViewTransition', { configurable: true, writable: true, value: start })
    try {
      renderWithProviders(<GaleriaPage />, { route: '/galeria' })
      fireEvent.click(screen.getByRole('link', { name: /volver al inicio/i }))
      expect(start).toHaveBeenCalledTimes(1)
    } finally {
      Reflect.deleteProperty(document, 'startViewTransition')
    }
  })
})
