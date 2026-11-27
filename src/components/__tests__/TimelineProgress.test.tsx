import { useRef } from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import MotionProvider from '../MotionProvider'
import TimelineProgress, { TimelineNode } from '../TimelineProgress'

// setupTests forces prefers-reduced-motion ON; this flag lets a test opt
// into the full-motion path without touching the global matchMedia mock.
const motionPref = vi.hoisted(() => ({ reduced: true }))

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>()
  return { ...actual, useReducedMotion: () => motionPref.reduced }
})

function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="relative">
      <TimelineProgress target={ref} />
      <p className="relative">
        2021 — 2025
        <TimelineNode />
      </p>
    </div>
  )
}

function renderTimeline() {
  return render(
    <MotionProvider>
      <Timeline />
    </MotionProvider>,
  )
}

function parts(root: ParentNode) {
  return {
    track: root.querySelector<HTMLElement>('[data-timeline="track"]'),
    progress: root.querySelector<HTMLElement>('[data-timeline="progress"]'),
    node: root.querySelector<HTMLElement>('[data-timeline="node"]'),
    nodeFill: root.querySelector<HTMLElement>('[data-timeline="node-fill"]'),
  }
}

describe('TimelineProgress', () => {
  afterEach(() => {
    motionPref.reduced = true
  })

  it('renders a decorative track and node hidden from assistive tech', () => {
    const { container } = renderTimeline()
    const { track, progress, node, nodeFill } = parts(container)

    expect(track).toHaveAttribute('aria-hidden', 'true')
    expect(node).toHaveAttribute('aria-hidden', 'true')
    expect(track).toHaveClass('bg-line')
    expect(progress).toHaveClass('bg-sky', 'origin-top')
    expect(nodeFill).toHaveClass('bg-sky')
  })

  it('shows the line fully drawn and the node lit under reduced motion', () => {
    const { container } = renderTimeline()
    const { progress, nodeFill } = parts(container)

    expect(progress?.style.transform).toBe('')
    expect(nodeFill?.style.opacity).toBe('')
  })

  it('drives the line and node from scroll when motion is allowed', () => {
    motionPref.reduced = false
    const { container } = renderTimeline()
    const { progress, nodeFill } = parts(container)

    // jsdom never scrolls, so the scroll-linked values sit at their start.
    expect(progress?.style.transform).toMatch(/scaleY\(0\)/)
    expect(nodeFill?.style.opacity).toBe('0')
  })

  it('server-renders the final, fully drawn state even when motion is allowed', () => {
    motionPref.reduced = false
    const html = renderToString(
      <MotionProvider>
        <Timeline />
      </MotionProvider>,
    )
    const host = document.createElement('div')
    host.innerHTML = html
    const { track, progress, nodeFill } = parts(host)

    expect(track).not.toBeNull()
    expect(progress?.getAttribute('style') ?? '').not.toMatch(/scale|transform/)
    expect(nodeFill?.getAttribute('style') ?? '').not.toMatch(/opacity/)
  })
})
