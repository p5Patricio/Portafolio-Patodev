import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import MotionProvider from '../MotionProvider'
import ScrollProgress from '../ScrollProgress'

describe('ScrollProgress', () => {
  it('renders a decorative bar hidden from assistive technology', () => {
    render(
      <MotionProvider>
        <ScrollProgress />
      </MotionProvider>,
    )

    const bar = screen.getByTestId('scroll-progress')
    expect(bar).toHaveAttribute('aria-hidden', 'true')
  })

  it('starts empty at the top of the page and grows from the left edge', () => {
    render(
      <MotionProvider>
        <ScrollProgress />
      </MotionProvider>,
    )

    const bar = screen.getByTestId('scroll-progress')
    expect(bar.style.transform).toBe('scaleX(0)')
    expect(bar.className).toMatch(/origin-left/)
  })

  it('is removed for users who prefer reduced motion', () => {
    render(
      <MotionProvider>
        <ScrollProgress />
      </MotionProvider>,
    )

    expect(screen.getByTestId('scroll-progress').className).toMatch(/motion-reduce:hidden/)
  })

  it('prerenders as an empty bar without touching the browser scroll position', () => {
    const html = renderToString(
      <MotionProvider>
        <ScrollProgress />
      </MotionProvider>,
    )

    expect(html).toContain('data-testid="scroll-progress"')
    expect(html).toContain('transform:scaleX(0)')
  })
})
