import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import Experiencia from '../Experiencia'

describe('Experiencia', () => {
  it('renders section with id experiencia', () => {
    renderWithProviders(<Experiencia />)
    expect(document.getElementById('experiencia')).toBeInTheDocument()
  })

  it('renders the title', () => {
    renderWithProviders(<Experiencia />)
    expect(screen.getByRole('heading', { name: /exp/i })).toBeInTheDocument()
  })

  it('renders university timeline entry', () => {
    renderWithProviders(<Experiencia />)
    expect(screen.getByText('Universidad de Guanajuato')).toBeInTheDocument()
    expect(screen.getByText(/2021 — 2025/i)).toBeInTheDocument()
  })

  it('renders internship timeline entry', () => {
    renderWithProviders(<Experiencia />)
    expect(screen.getByText('Mazda Motor Manufacturing')).toBeInTheDocument()
    expect(screen.getByText(/2025 — 2026/i)).toBeInTheDocument()
  })

  it('renders each entry as an open list row (no images, no modal)', () => {
    renderWithProviders(<Experiencia />)
    expect(screen.queryAllByRole('img')).toHaveLength(0)
    expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument()
  })

  it('does not render the certificates list', () => {
    renderWithProviders(<Experiencia />)
    expect(screen.queryByText(/^(formación|training)$/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /certificado|certificate/i })).not.toBeInTheDocument()
  })
})
