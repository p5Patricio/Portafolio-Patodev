import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils'
import PillButton from '../PillButton'

describe('PillButton', () => {
  it('renders as external link when href is provided', () => {
    renderWithProviders(
      <PillButton href="https://example.com">Link</PillButton>
    )
    const link = screen.getByRole('link', { name: /link/i })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders as internal link when to is provided', () => {
    renderWithProviders(
      <PillButton to="/galeria">Galería</PillButton>
    )
    const link = screen.getByRole('link', { name: /galería/i })
    expect(link).toHaveAttribute('href', '/galeria')
  })

  it('renders as button when type is provided', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    renderWithProviders(
      <PillButton type="button" onClick={handleClick}>
        Click me
      </PillButton>
    )
    const btn = screen.getByRole('button', { name: /click me/i })
    expect(btn).toBeInTheDocument()
    await user.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    renderWithProviders(
      <PillButton type="submit" disabled>
        Submit
      </PillButton>
    )
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('defaults to the solid variant', () => {
    renderWithProviders(<PillButton href="https://example.com">Link</PillButton>)
    const link = screen.getByRole('link', { name: /link/i })
    expect(link.classList.contains('bg-white')).toBe(true)
  })

  it('applies the outline variant for secondary CTAs', () => {
    renderWithProviders(
      <PillButton href="https://example.com" variant="outline">
        Secondary
      </PillButton>
    )
    const link = screen.getByRole('link', { name: /secondary/i })
    expect(link.classList.contains('bg-transparent')).toBe(true)
    expect(link.classList.contains('bg-white')).toBe(false)
  })
})
