import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import SymmetricalCode from '../SymmetricalCode'

describe('SymmetricalCode', () => {
  it('renders section with id symmetrical-code', () => {
    renderWithProviders(<SymmetricalCode />)
    expect(document.getElementById('symmetrical-code')).toBeInTheDocument()
  })

  it('renders the title', () => {
    renderWithProviders(<SymmetricalCode />)
    expect(screen.getByRole('heading', { name: /symmetrical/i })).toBeInTheDocument()
  })

  it('is labelled by its heading', () => {
    renderWithProviders(<SymmetricalCode />)
    const section = document.getElementById('symmetrical-code')
    expect(section).toHaveAttribute('aria-labelledby', 'symmetrical-code-heading')
  })

  it('renders all four service highlights', () => {
    renderWithProviders(<SymmetricalCode />)
    expect(screen.getByText(/sitios y apps que venden/i)).toBeInTheDocument()
    expect(screen.getByText(/automatización y sistemas/i)).toBeInTheDocument()
    expect(screen.getByText(/tu negocio siempre en línea/i)).toBeInTheDocument()
    expect(screen.getByText(/ciberseguridad/i)).toBeInTheDocument()
  })

  it('renders the primary CTA as an external link to the studio site', () => {
    renderWithProviders(<SymmetricalCode />)
    const link = screen.getByRole('link', { name: /visitar symmetrical code/i })
    expect(link).toHaveAttribute('href', 'https://symmetrical-code.vercel.app')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the secondary CTA linking to the contact section', () => {
    renderWithProviders(<SymmetricalCode />)
    const link = screen.getByRole('link', { name: /hablemos/i })
    expect(link).toHaveAttribute('href', '#contacto')
  })

  it('renders the studio logo with a descriptive alt text', () => {
    renderWithProviders(<SymmetricalCode />)
    const logo = screen.getByRole('img', { name: /logo de symmetrical code/i })
    expect(logo).toHaveAttribute('src', '/symmetrical-code-logo.webp')
  })
})
