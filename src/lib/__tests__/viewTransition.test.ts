import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { notifyRouteCommitted, startRouteTransition, supportsViewTransitions } from '../viewTransition'

// Vitest runs from the project root (where vitest.config.ts lives).
const css = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8')

/** Body of the first `@media <query> { ... }` block whose body mentions `needle` (brace-balanced). */
function mediaBlockContaining(query: string, needle: string): string | undefined {
  let from = 0
  for (;;) {
    const start = css.indexOf(`@media ${query}`, from)
    if (start === -1) return undefined
    let depth = 0
    let end = start
    for (let i = css.indexOf('{', start); i < css.length; i++) {
      if (css[i] === '{') depth++
      if (css[i] === '}') depth--
      if (depth === 0) {
        end = i
        break
      }
    }
    const body = css.slice(start, end + 1)
    if (body.includes(needle)) return body
    from = end
  }
}

/** Declarations of the first top-level rule whose selector list is exactly `selector`. */
function ruleBody(selector: string): string | undefined {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`).exec(css)?.[1]
}

type FakeTransition = { finished: Promise<void>; ready: Promise<void>; updateCallbackDone: Promise<void> }

/** Minimal `document.startViewTransition` stand-in: runs the update callback right away. */
function mockStartViewTransition() {
  const mock = vi.fn((update: () => Promise<void> | void): FakeTransition => {
    const done = Promise.resolve(update())
    return { finished: done, ready: done, updateCallbackDone: done }
  })
  Object.defineProperty(document, 'startViewTransition', { configurable: true, writable: true, value: mock })
  return mock
}

beforeEach(() => {
  // window.scrollTo is a shared vi.fn from setupTests; start each test with a clean call log.
  vi.clearAllMocks()
})

afterEach(() => {
  Reflect.deleteProperty(document, 'startViewTransition')
  vi.useRealTimers()
  document.body.innerHTML = ''
})

describe('supportsViewTransitions', () => {
  it('is false without document.startViewTransition and true with it', () => {
    expect(supportsViewTransitions()).toBe(false)
    mockStartViewTransition()
    expect(supportsViewTransitions()).toBe(true)
  })
})

describe('startRouteTransition', () => {
  it('navigates inside the view transition and waits for the route commit', async () => {
    const start = mockStartViewTransition()
    const navigate = vi.fn()
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    startRouteTransition('/galeria', navigate)

    expect(start).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/galeria')
    // The new state is captured only once the route has committed, at the top.
    expect(scrollTo).not.toHaveBeenCalled()
    notifyRouteCommitted()
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' })
    await start.mock.results[0].value.finished
  })

  it('lands on the hash target instead of the top for section links', () => {
    mockStartViewTransition()
    const section = document.createElement('section')
    section.id = 'proyectos'
    section.scrollIntoView = vi.fn()
    document.body.append(section)
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    startRouteTransition('/#proyectos', vi.fn())
    notifyRouteCommitted()

    expect(section.scrollIntoView).toHaveBeenCalledWith({ block: 'start', behavior: 'instant' })
    expect(scrollTo).not.toHaveBeenCalled()
  })

  it('still captures the new state if the commit signal never arrives', () => {
    vi.useFakeTimers()
    mockStartViewTransition()
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    startRouteTransition('/galeria', vi.fn())
    expect(scrollTo).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1000)
    expect(scrollTo).toHaveBeenCalledTimes(1)
  })
})

describe('route transition CSS', () => {
  it('cross-fades the page, offsetting the incoming one, with the shared motion tokens', () => {
    const oldRoot = ruleBody('::view-transition-old(root)')
    const newRoot = ruleBody('::view-transition-new(root)')
    expect(oldRoot).toMatch(/var\(--motion-duration-[a-z]+\)/)
    expect(oldRoot).toMatch(/var\(--ease-[a-z-]+\)/)
    expect(newRoot).toMatch(/var\(--motion-duration-[a-z]+\)/)
    expect(newRoot).toMatch(/var\(--ease-[a-z-]+\)/)

    const outName = /animation:[^;]*\b(vt-[a-z-]+)/.exec(oldRoot ?? '')?.[1]
    const inName = /animation:[^;]*\b(vt-[a-z-]+)/.exec(newRoot ?? '')?.[1]
    expect(css).toMatch(new RegExp(`@keyframes ${outName}\\s*\\{[^}]*opacity:\\s*0`))
    expect(css).toMatch(new RegExp(`@keyframes ${inName}\\s*\\{[^}]*opacity:\\s*0[^}]*translateY\\(`))
  })

  it('moves the named fixed chrome (header, like capsule) on the shared rhythm', () => {
    const group = ruleBody('::view-transition-group(*)')
    expect(group).toMatch(/animation-duration:\s*var\(--motion-duration-[a-z]+\)/)
    expect(group).toMatch(/animation-timing-function:\s*var\(--ease-[a-z-]+\)/)
  })

  it('turns every view transition animation off under prefers-reduced-motion', () => {
    const block = mediaBlockContaining('(prefers-reduced-motion: reduce)', '::view-transition')
    expect(block).toBeDefined()
    for (const pseudo of ['::view-transition-group(*)', '::view-transition-old(*)', '::view-transition-new(*)']) {
      expect(block).toContain(pseudo)
    }
    expect(block).toMatch(/::view-transition-new\(\*\)\s*\{[^}]*animation:\s*none/)
  })
})
