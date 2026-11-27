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

  it('renders a decorative scroll timeline with one node per entry', () => {
    const { container } = renderWithProviders(<Experiencia />)
    const tracks = container.querySelectorAll('[data-timeline="track"]')
    const nodes = container.querySelectorAll('[data-timeline="node"]')

    expect(tracks).toHaveLength(1)
    expect(tracks[0]).toHaveAttribute('aria-hidden', 'true')
    expect(nodes).toHaveLength(2)
    nodes.forEach((node) => expect(node).toHaveAttribute('aria-hidden', 'true'))
  })

  it('keeps the first entry flush with the list top despite the track being its first child', () => {
    renderWithProviders(<Experiencia />)
    const firstEntry = screen.getByText(/2021 — 2025/i).closest('.grid')
    const secondEntry = screen.getByText(/2025 — 2026/i).closest('.grid')

    expect(firstEntry).toHaveClass('pt-0')
    expect(secondEntry).not.toHaveClass('pt-0')
    expect(secondEntry).toHaveClass('border-t')
  })

  it('shows the timeline fully drawn under reduced motion', () => {
    const { container } = renderWithProviders(<Experiencia />)
    const progress = container.querySelector<HTMLElement>('[data-timeline="progress"]')

    expect(progress).not.toBeNull()
    expect(progress?.style.transform).toBe('')
  })

  it('does not render the certificates list', () => {
    renderWithProviders(<Experiencia />)
    expect(screen.queryByText(/^(formación|training)$/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /certificado|certificate/i })).not.toBeInTheDocument()
  })
})
