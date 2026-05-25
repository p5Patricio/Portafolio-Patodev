import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import GaleriaPage from '../GaleriaPage'

describe('GaleriaPage', () => {
  it('renders gallery title', () => {
    renderWithProviders(<GaleriaPage />)
    expect(screen.getByRole('heading', { name: /galería completa de proyectos/i })).toBeInTheDocument()
    expect(screen.queryByText(/archivo completo/i)).not.toBeInTheDocument()
  })

  it('renders back to home link', () => {
    renderWithProviders(<GaleriaPage />)
    const link = screen.getByRole('link', { name: /volver al inicio/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders year group headings', () => {
    renderWithProviders(<GaleriaPage />)
    // Should contain at least one year heading
    expect(screen.getByText('2026')).toBeInTheDocument()
  })

  it('renders project cards from all repos', () => {
    renderWithProviders(<GaleriaPage />)
    // Some non-featured repos should appear here
    expect(screen.getByText('D-MOX')).toBeInTheDocument()
    expect(screen.getByText('FitTrack Pro')).toBeInTheDocument()
  })
})
