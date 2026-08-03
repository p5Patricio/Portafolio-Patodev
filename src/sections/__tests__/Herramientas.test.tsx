import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import Herramientas from '../Herramientas'
import { SKILL_CATEGORIES } from '../../data/skills'

describe('Herramientas', () => {
  it('renders section with id herramientas', () => {
    renderWithProviders(<Herramientas />)
    expect(document.getElementById('herramientas')).toBeInTheDocument()
  })

  it('renders the title', () => {
    renderWithProviders(<Herramientas />)
    const headings = screen.getAllByRole('heading', { name: /herramien/i })
    expect(headings.length).toBeGreaterThanOrEqual(1)
  })

  it('renders all tool categories', () => {
    renderWithProviders(<Herramientas />)
    SKILL_CATEGORIES.forEach((cat) => {
      const els = screen.getAllByText(cat.title.es)
      expect(els.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('renders narrative descriptions for active category', () => {
    renderWithProviders(<Herramientas />)
    expect(screen.getAllByText(/React 19 \+ TypeScript \+ Tailwind/i).length).toBeGreaterThanOrEqual(1)
  })

  it('renders tech icons for active category', () => {
    renderWithProviders(<Herramientas />)
    expect(screen.getAllByLabelText('React').length).toBeGreaterThanOrEqual(1)
  })
})
