import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils'
import OptionWheel from '../OptionWheel'

const sampleOptions = [
  { id: 'frontend', label: 'Frontend', sublabel: '9 tools' },
  { id: 'backend', label: 'Backend', sublabel: '11 tools' },
  { id: 'ai', label: 'AI & ML', sublabel: '12 tools' },
  { id: 'devops', label: 'DevOps', sublabel: '9 tools' },
]

describe('OptionWheel', () => {
  it('renders options correctly', () => {
    renderWithProviders(
      <OptionWheel items={sampleOptions} selectedIndex={0} onChange={vi.fn()} />
    )
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
  })

  it('calls onChange when clicking on an option', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    renderWithProviders(
      <OptionWheel items={sampleOptions} selectedIndex={0} onChange={handleChange} />
    )

    const backendBtn = screen.getByText('Backend')
    await user.click(backendBtn)

    expect(handleChange).toHaveBeenCalledWith(1)
  })
})
