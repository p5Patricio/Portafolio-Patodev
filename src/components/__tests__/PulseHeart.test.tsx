import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PulseHeart from '../PulseHeart'
import { DURATION } from '../../lib/motion'

describe('PulseHeart', () => {
  it('takes its timing and easing from the shared motion tokens', () => {
    render(<PulseHeart label="Like" count={3} />)
    const button = screen.getByRole('button', { name: 'Like, 3' })

    expect(button.style.getPropertyValue('--ph-ease-out')).toBe('var(--ease-out-expo)')
    expect(button.style.getPropertyValue('--ph-roll')).toBe(`${DURATION.base * 1000}ms`)
    expect(button.className).toContain('duration-(--motion-duration-fast)')
    expect(button.className).not.toMatch(/\d+ms/)
    expect(button.innerHTML).not.toMatch(/\d+ms|cubic-bezier/)
  })

  it('still toggles and reports the new count (uncontrolled)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<PulseHeart label="Like" count={3} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Like, 3' }))

    expect(onChange).toHaveBeenCalledWith(true, 4)
    expect(screen.getByRole('button', { name: 'Like, 4' })).toHaveAttribute('aria-pressed', 'true')
  })
})
