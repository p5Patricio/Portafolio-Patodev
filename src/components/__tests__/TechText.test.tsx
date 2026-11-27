import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, render } from '@testing-library/react'
import TechText, { type TechTextLayout } from '../TechText'

type FakeContext = {
  font: string
  fontStretch: string
  letterSpacing: string
  textAlign: CanvasTextAlign
  textBaseline: CanvasTextBaseline
  fillStyle: string | CanvasGradient | CanvasPattern
  strokeStyle: string | CanvasGradient | CanvasPattern
  globalAlpha: number
  globalCompositeOperation: GlobalCompositeOperation
  lineWidth: number
  lineJoin: CanvasLineJoin
  lineCap: CanvasLineCap
  setTransform: ReturnType<typeof vi.fn>
  clearRect: ReturnType<typeof vi.fn>
  drawImage: ReturnType<typeof vi.fn>
  fillRect: ReturnType<typeof vi.fn>
  fillText: ReturnType<typeof vi.fn>
  strokeText: ReturnType<typeof vi.fn>
  setLineDash: ReturnType<typeof vi.fn>
  measureText: ReturnType<typeof vi.fn>
}

const createContext = (): FakeContext => ({
  font: '10px sans-serif',
  fontStretch: 'normal',
  letterSpacing: '0px',
  textAlign: 'left',
  textBaseline: 'alphabetic',
  fillStyle: '#000000',
  strokeStyle: '#000000',
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  lineWidth: 1,
  lineJoin: 'round',
  lineCap: 'butt',
  setTransform: vi.fn(),
  clearRect: vi.fn(),
  drawImage: vi.fn(),
  fillRect: vi.fn(),
  fillText: vi.fn(),
  strokeText: vi.fn(),
  setLineDash: vi.fn(),
  measureText: vi.fn((text: string) => ({
    width: text.length * 40,
    actualBoundingBoxLeft: 0,
    actualBoundingBoxRight: text.length * 40,
    actualBoundingBoxAscent: 60,
    actualBoundingBoxDescent: 20,
    fontBoundingBoxAscent: 75,
    fontBoundingBoxDescent: 25,
  })),
})

describe('TechText', () => {
  afterEach(() => {
    document.querySelectorAll('[data-tech-text-host]').forEach((node) => node.remove())
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('inherits host typography and preserves measured line baselines', () => {
    const contexts: FakeContext[] = []
    const frames: FrameRequestCallback[] = []
    const originalGetComputedStyle = window.getComputedStyle
    const host = document.createElement('h2')
    host.dataset.techTextHost = 'true'
    document.body.appendChild(host)

    vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudo) => {
      if (element !== host) return originalGetComputedStyle(element, pseudo)
      return {
        fontFamily: 'Archivo',
        fontWeight: '800',
        fontStretch: '112%',
        fontSize: '80px',
        lineHeight: '73.6px',
        letterSpacing: '-2.4px',
        color: 'rgb(237, 234, 226)',
      } as CSSStyleDeclaration
    })
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(((type: string) => {
      if (type !== '2d') return null
      const context = createContext()
      contexts.push(context)
      return context as unknown as CanvasRenderingContext2D
    }) as typeof HTMLCanvasElement.prototype.getContext)
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        private readonly callback: IntersectionObserverCallback

        constructor(callback: IntersectionObserverCallback) {
          this.callback = callback
        }

        observe(target: Element) {
          this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this as never)
        }

        disconnect() {}
        unobserve() {}
      }
    )
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      }
    )
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        frames.push(callback)
        return frames.length
      })
    )
    vi.stubGlobal('cancelAnimationFrame', vi.fn())

    const layout: TechTextLayout = {
      lines: [
        { top: 0, height: 73.6, glyphs: [{ char: 'A', x: 0, index: 0 }] },
        { top: 73.6, height: 73.6, glyphs: [{ char: 'B', x: 4, index: 1 }] },
      ],
    }
    const onReady = vi.fn()

    render(
      <TechText
        text="A B"
        hostRef={{ current: host }}
        layout={layout}
        inheritTypography
        fontSize={150}
        fontWeight={600}
        letterSpacing={-0.05}
        color="#ffffff"
        accentColor="#ffffff"
        align="left"
        reveal="off"
        sweep={false}
        selection={false}
        labels={false}
        specks={0}
        draggable={false}
        clickKick={false}
        onReady={onReady}
      />
    )

    expect(frames.length).toBeGreaterThan(0)
    act(() => {
      frames.shift()?.(performance.now())
    })

    expect(onReady).toHaveBeenCalledTimes(1)
    expect(
      contexts.some(
        (context) =>
          context.font === '800 semi-expanded 80px Archivo' &&
          context.fontStretch === 'semi-expanded' &&
          context.letterSpacing === '-2.4px'
      )
    ).toBe(true)
    expect(contexts.some((context) => context.fillStyle === 'rgb(237, 234, 226)')).toBe(true)

    const glyphCalls = contexts.flatMap((context) =>
      context.fillText.mock.calls.map((call: [string, number, number]) => ({ char: call[0], baseline: call[2] }))
    )
    const first = glyphCalls.find((call: { char: string; baseline: number }) => call.char === 'A')
    const second = glyphCalls.find((call: { char: string; baseline: number }) => call.char === 'B')
    expect(first).toBeDefined()
    expect(second).toBeDefined()
    if (!first || !second) throw new Error('Expected both measured glyphs to be drawn')
    expect(second.baseline - first.baseline).toBeCloseTo(73.6)
  })
})
