import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import Reveal from '../Reveal'

type Callback = (entries: Array<Pick<IntersectionObserverEntry, 'isIntersecting'>>) => void

const OriginalObserver = globalThis.IntersectionObserver
let observers: Array<{ callback: Callback; options?: IntersectionObserverInit; disconnected: boolean }> = []

beforeEach(() => {
  observers = []
  globalThis.IntersectionObserver = class {
    private record: (typeof observers)[number]
    constructor(callback: Callback, options?: IntersectionObserverInit) {
      this.record = { callback, options, disconnected: false }
      observers.push(this.record)
    }
    observe() {}
    unobserve() {}
    disconnect() {
      this.record.disconnected = true
    }
    takeRecords() {
      return []
    }
  } as unknown as typeof IntersectionObserver
})

afterEach(() => {
  globalThis.IntersectionObserver = OriginalObserver
})

function intersect(isIntersecting: boolean) {
  act(() => observers[0].callback([{ isIntersecting }]))
}

describe('Reveal', () => {
  it('fades its content up by default (.reveal) and marks it visible once in view', () => {
    render(<Reveal>content</Reveal>)
    const el = screen.getByText('content')

    expect(el).toHaveClass('reveal')
    expect(el).not.toHaveClass('is-visible')

    intersect(true)
    expect(el).toHaveClass('is-visible')
  })

  it('triggers once at ~15% visibility and stops observing', () => {
    render(<Reveal>content</Reveal>)
    expect(observers[0].options?.threshold).toBe(0.15)

    intersect(false)
    expect(screen.getByText('content')).not.toHaveClass('is-visible')

    intersect(true)
    expect(observers[0].disconnected).toBe(true)
  })

  it('in sequence mode, does not fade the wrapper itself but still flags it visible for its children', () => {
    render(<Reveal variant="sequence">content</Reveal>)
    const el = screen.getByText('content')

    expect(el).toHaveClass('reveal-seq')
    expect(el).not.toHaveClass('reveal')

    intersect(true)
    expect(el).toHaveClass('is-visible')
  })
})
