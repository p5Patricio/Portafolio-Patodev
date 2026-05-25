import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import SectionHeader from '../SectionHeader'

describe('SectionHeader', () => {
  it('renders title', () => {
    renderWithProviders(<SectionHeader title="Proyectos" />)
    expect(screen.getByRole('heading', { name: /proyectos/i })).toBeInTheDocument()
  })

  it('renders intro when provided', () => {
    renderWithProviders(
      <SectionHeader title="Contacto" intro="Hablemos pronto." />
    )
    expect(screen.getByText('Hablemos pronto.')).toBeInTheDocument()
  })

  it('does not render intro when omitted', () => {
    renderWithProviders(<SectionHeader title="Hero" />)
    expect(screen.queryByText(/hablemos/i)).not.toBeInTheDocument()
  })

  it('renders elegant divider accent', () => {
    const { container } = renderWithProviders(
      <SectionHeader title="Test" />
    )
    // The accent bar uses the shared tri-color separator class
    const accent = container.querySelector('.tricolor-separator')
    expect(accent).toBeInTheDocument()
  })
})
