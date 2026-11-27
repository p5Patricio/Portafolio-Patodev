import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import TechTitle from '../TechTitle'

vi.mock('../TechText', async () => {
  const { useEffect } = await import('react')

  return {
    default: function MockTechText({
      onReady,
      layout,
    }: {
      onReady?: () => void
      layout?: { lines: { top: number }[] } | null
    }) {
      useEffect(() => {
        onReady?.()
      }, [onReady])

      return <canvas data-testid="tech-text-canvas" data-first-line-top={layout?.lines[0]?.top} />
    },
  }
})

const mockMotionPreference = (reduced: boolean) => {
  vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reduced : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

const mockRangeMeasurement = () => {
  vi.spyOn(document, 'createRange').mockImplementation(
    () =>
      ({
        setStart: vi.fn(),
        setEnd: vi.fn(),
        getClientRects: () => [
          {
            left: 0,
            top: 0,
            right: 10,
            bottom: 20,
            width: 10,
            height: 20,
            x: 0,
            y: 0,
            toJSON: () => ({}),
          },
        ],
      }) as unknown as Range
  )
}

describe('TechTitle', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('keeps the real heading accessible without canvas under reduced motion', () => {
    mockMotionPreference(true)
    const { container } = renderWithProviders(
      <TechTitle as="h2" id="projects-heading" className="text-2xl">
        Proyectos
      </TechTitle>
    )

    const heading = screen.getByRole('heading', { name: /proyectos/i })
    const source = container.querySelector('.tech-title-source')

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'projects-heading')
    expect(heading.tagName.toLowerCase()).toBe('h2')
    expect(source).toHaveAttribute('data-tech-text-ready', 'false')
    expect((source as HTMLElement).style.color).toBe('')
    expect(container.querySelector('canvas')).not.toBeInTheDocument()
  })

  it('hides DOM glyphs only after the decorative canvas reports ready', async () => {
    mockMotionPreference(false)
    mockRangeMeasurement()
    const { container } = renderWithProviders(<TechTitle as="h2">Proyectos</TechTitle>)
    const source = container.querySelector('.tech-title-source')

    expect(source).toHaveAttribute('data-tech-text-ready', 'false')
    expect((source as HTMLElement).style.color).toBe('')

    await waitFor(() => {
      expect(source).toHaveAttribute('data-tech-text-ready', 'true')
    })

    expect((source as HTMLElement).style.color).toBe('transparent')
    expect(source).toHaveTextContent('Proyectos')
    expect(screen.getAllByText('Proyectos')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Proyectos' })).toBeInTheDocument()
    expect(screen.getByTestId('tech-text-canvas').parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('pads the canvas by 0.25em without shifting the rendered glyphs', async () => {
    mockMotionPreference(false)
    mockRangeMeasurement()
    const originalGetComputedStyle = window.getComputedStyle
    vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudo) => {
      if (element instanceof HTMLElement && element.tagName === 'H2') {
        return { fontSize: '51px' } as CSSStyleDeclaration
      }
      return originalGetComputedStyle(element, pseudo)
    })

    const { container } = renderWithProviders(<TechTitle as="h2">algo?</TechTitle>)

    const canvas = await screen.findByTestId('tech-text-canvas')
    const overlay = canvas.parentElement as HTMLElement
    const heading = container.querySelector('h2') as HTMLElement

    expect(canvas).toHaveAttribute('data-first-line-top', '12.75')
    expect(overlay).toHaveClass('absolute', 'inset-0')
    expect(overlay.style.top).toBe('-12.75px')
    expect(overlay.style.bottom).toBe('-12.75px')
    expect(heading.style.overflow).toBe('visible')
  })
})
