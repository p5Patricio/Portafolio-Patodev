import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import SobreMi from '../SobreMi'
import { SKILL_CATEGORIES } from '../../data/skills'

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
})
