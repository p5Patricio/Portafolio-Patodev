import { useContext } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MotionConfigContext, m, motion } from 'framer-motion'
import MotionProvider from '../MotionProvider'
import { DURATION, EASE } from '../../lib/motion'

function ConfigProbe({ onConfig }: { onConfig: (config: unknown) => void }) {
  onConfig(useContext(MotionConfigContext))
  return null
}

describe('MotionProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders its children', () => {
    render(
      <MotionProvider>
        <p>hello motion</p>
      </MotionProvider>,
    )

    expect(screen.getByText('hello motion')).toBeInTheDocument()
  })

  it('renders an m.div without throwing', () => {
    render(
      <MotionProvider>
        <m.div data-testid="lazy-box" animate={{ opacity: 1 }} />
      </MotionProvider>,
    )

    expect(screen.getByTestId('lazy-box')).toBeInTheDocument()
  })

  it('rejects full motion components (strict LazyMotion)', () => {
    // React logs the thrown render error; keep the test output clean.
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() =>
      render(
        <MotionProvider>
          <motion.div />
        </MotionProvider>,
      ),
    ).toThrow(/LazyMotion/)
  })

  it('honors the reduced-motion preference and uses the shared default transition', () => {
    let config: { reducedMotion?: string; transition?: unknown } | undefined

    render(
      <MotionProvider>
        <ConfigProbe onConfig={(value) => (config = value as typeof config)} />
      </MotionProvider>,
    )

    expect(config?.reducedMotion).toBe('user')
    expect(config?.transition).toEqual({ duration: DURATION.base, ease: EASE.outExpo })
  })
})
