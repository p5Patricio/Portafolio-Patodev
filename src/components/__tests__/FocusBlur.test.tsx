import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils'
import FocusBlur from '../FocusBlur'

describe('FocusBlur', () => {
  it('renders default items when no items prop is passed', () => {
    renderWithProviders(<FocusBlur />)
    expect(screen.getByText('@Twitter')).toBeInTheDocument()
    expect(screen.getByText('@Threads')).toBeInTheDocument()
    expect(screen.getByText('@Instagram')).toBeInTheDocument()
    expect(screen.getByText('@GitHub')).toBeInTheDocument()
  })

  it('renders custom items with correct links', () => {
    const customItems = [
      { label: '@GitHub', href: 'https://github.com/p5Patricio' },
      { label: '@LinkedIn', href: 'https://linkedin.com/in/patricioagpv' },
    ]
    renderWithProviders(<FocusBlur items={customItems} />)
    const githubLink = screen.getByRole('link', { name: '@GitHub' })
    const linkedinLink = screen.getByRole('link', { name: '@LinkedIn' })

    expect(githubLink).toHaveAttribute('href', 'https://github.com/p5Patricio')
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/patricioagpv')
  })

  it('applies hover focus/blur effect on mouse enter and leave', async () => {
    const user = userEvent.setup()
    const customItems = [
      { label: 'Item 1', href: '#1' },
      { label: 'Item 2', href: '#2' },
    ]
    renderWithProviders(<FocusBlur items={customItems} />)
    const link1 = screen.getByRole('link', { name: 'Item 1' })
    const link2 = screen.getByRole('link', { name: 'Item 2' })

    await user.hover(link1)
    expect(link1.style.color).toBe('rgb(0, 216, 240)')
    expect(link2.style.filter).toContain('blur(4px)')

    await user.unhover(link1)
    expect(link2.style.filter).toBe('none')
  })
})
