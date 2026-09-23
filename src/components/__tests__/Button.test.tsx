import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils'
import Button from '../Button'

describe('Button', () => {
  it('renders as an external link when href is provided', () => {
    renderWithProviders(<Button href="https://example.com">Link</Button>)
    const link = screen.getByRole('link', { name: /link/i })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders as an in-page anchor without target when external is false', () => {
    renderWithProviders(
      <Button href="#contacto" external={false}>
        Contactar
      </Button>
    )
    const link = screen.getByRole('link', { name: /contactar/i })
    expect(link).toHaveAttribute('href', '#contacto')
    expect(link).not.toHaveAttribute('target')
  })

  it('renders as an internal router link when to is provided', () => {
    renderWithProviders(<Button to="/galeria">Galería</Button>)
    const link = screen.getByRole('link', { name: /galería/i })
    expect(link).toHaveAttribute('href', '/galeria')
  })

  it('renders as a button and handles clicks', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    renderWithProviders(
      <Button type="button" onClick={handleClick}>
        Click me
      </Button>
    )
    const btn = screen.getByRole('button', { name: /click me/i })
    await user.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    renderWithProviders(
      <Button type="submit" disabled>
        Submit
      </Button>
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('defaults to the primary variant', () => {
    renderWithProviders(<Button href="https://example.com">Link</Button>)
    const link = screen.getByRole('link', { name: /link/i })
    expect(link.classList.contains('bg-paper')).toBe(true)
  })

  it('applies the secondary variant', () => {
    renderWithProviders(
      <Button href="https://example.com" variant="secondary">
        Secondary
      </Button>
    )
    const link = screen.getByRole('link', { name: /secondary/i })
    expect(link.classList.contains('bg-paper')).toBe(false)
    expect(link.classList.contains('border')).toBe(true)
  })
})
