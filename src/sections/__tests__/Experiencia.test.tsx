import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils'
import Experiencia from '../Experiencia'

describe('Experiencia', () => {
  it('renders section with id experiencia', () => {
    renderWithProviders(<Experiencia />)
    expect(document.getElementById('experiencia')).toBeInTheDocument()
  })

  it('renders the title', () => {
    renderWithProviders(<Experiencia />)
    expect(screen.getByRole('heading', { name: /experiencia/i })).toBeInTheDocument()
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

  it('renders timeline images', () => {
    renderWithProviders(<Experiencia />)
    const images = screen.getAllByRole('img')
    const ugto = images.find((img) => img.getAttribute('src') === '/titulo.webp')
    const mazda = images.find((img) => img.getAttribute('src') === '/mazda-new-logo.jpg')
    expect(ugto).toBeDefined()
    expect(mazda).toBeDefined()
  })

  it('opens the university image in a modal above fixed navigation', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Experiencia />)

    await user.click(screen.getByRole('img', { name: 'Graduación Universitaria' }))

    expect(screen.getByTestId('image-modal')).toHaveClass('z-[9999]')
    expect(screen.getByRole('button', { name: /cerrar imagen/i })).toBeInTheDocument()
  })

  it('does not open the Mazda logo image in a modal', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Experiencia />)

    await user.click(screen.getByRole('img', { name: 'Prácticas Profesionales' }))

    expect(screen.queryByTestId('image-modal')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /cerrar imagen/i })).not.toBeInTheDocument()
  })
})
