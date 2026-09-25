import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import SobreMi from '../SobreMi'
import { SKILL_CATEGORIES } from '../../data/skills'

/** Forces useIsCompactViewport() to report the <lg (collapsible) layout. */
function mockCompactViewport() {
  const original = window.matchMedia
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('max-width'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
  return () => {
    window.matchMedia = original
  }
}

describe('SobreMi', () => {
  it('renders section with id sobre-mi', () => {
    renderWithProviders(<SobreMi />)
    expect(document.getElementById('sobre-mi')).toBeInTheDocument()
  })

  it('renders the title', () => {
    renderWithProviders(<SobreMi />)
    expect(screen.getByRole('heading', { name: /sobre/i })).toBeInTheDocument()
  })

  it('renders the bio paragraph as fully readable text (word-by-word reveal is scroll-driven, client-only)', () => {
    renderWithProviders(<SobreMi />)
    expect(screen.getByText(/patricio/i)).toBeInTheDocument()
  })

  it('renders the Stack block with every skill category', () => {
    renderWithProviders(<SobreMi />)
    expect(screen.getByText('Stack')).toBeInTheDocument()
    SKILL_CATEGORIES.forEach((cat) => {
      expect(screen.getByText(cat.title.es)).toBeInTheDocument()
    })
  })

  it('renders skill labels for the frontend category', () => {
    renderWithProviders(<SobreMi />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders a brand icon for every skill', () => {
    renderWithProviders(<SobreMi />)
    const totalSkills = SKILL_CATEGORIES.reduce((sum, cat) => sum + cat.skills.length, 0)
    const icons = screen.getAllByRole('img')
    expect(icons.length).toBe(totalSkills)
  })

  describe('below lg (compact viewport)', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('renders every category collapsed by default', () => {
      const restore = mockCompactViewport()
      const { container } = renderWithProviders(<SobreMi />)
      const details = container.querySelectorAll('details.skill-category')
      expect(details.length).toBe(SKILL_CATEGORIES.length)
      details.forEach((d) => expect(d).not.toHaveAttribute('open'))
      restore()
    })

    it('expands a category when its summary is activated', () => {
      const restore = mockCompactViewport()
      renderWithProviders(<SobreMi />)
      const summary = screen.getByText(SKILL_CATEGORIES[0].title.es).closest('summary')!
      fireEvent.click(summary)
      expect(summary.closest('details')).toHaveAttribute('open')
      restore()
    })
  })
})
