import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { renderWithProviders } from '../../test-utils'
import TextLink from '../TextLink'

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

describe('TextLink', () => {
  it('renders a plain anchor and forwards anchor attributes', () => {
    renderWithProviders(
      <TextLink href="https://github.com/x" target="_blank" rel="noopener noreferrer">
        GitHub
      </TextLink>,
    )
    const link = screen.getByRole('link', { name: 'GitHub' })
    expect(link).toHaveAttribute('href', 'https://github.com/x')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders a router link when `to` is provided', () => {
    renderWithProviders(<TextLink to="/galeria">View all</TextLink>)
    expect(screen.getByRole('link', { name: 'View all' })).toHaveAttribute('href', '/galeria')
  })

  it('uses the animated underline and keeps the paper/sky color tokens for hover and focus', () => {
    renderWithProviders(
      <TextLink href="#contacto" className="mono-label text-xs">
        Contact
      </TextLink>,
    )
    const link = screen.getByRole('link', { name: 'Contact' })
    expect(link).toHaveClass('link-underline', 'text-paper', 'hover:text-sky', 'focus-visible:text-sky')
    expect(link).toHaveClass('mono-label', 'text-xs')
    expect(link).toHaveClass('focus-visible:outline-2', 'focus-visible:outline-sky')
  })

  it('underlines only the label, not the icon, when an icon is passed', () => {
    renderWithProviders(
      <TextLink href="https://github.com/x" icon={<svg data-testid="icon" aria-hidden="true" />}>
        GitHub
      </TextLink>,
    )
    const link = screen.getByRole('link', { name: 'GitHub' })
    expect(link).not.toHaveClass('link-underline')
    expect(screen.getByTestId('icon').parentElement).toBe(link)
    expect(screen.getByText('GitHub')).toHaveClass('link-underline')
    // The label's underline still reacts to hover/focus on the whole link.
    expect(css).toMatch(/a:focus-visible\s*>\s*\.link-underline::after/)
    expect(mediaBlockContaining('(hover: hover)', 'a:hover > .link-underline::after')).toBeDefined()
  })

  it('sweeps the underline in on hover only for hover-capable pointers, and on keyboard focus everywhere', () => {
    const hoverBlock = mediaBlockContaining('(hover: hover)', '.link-underline:hover::after')
    expect(hoverBlock).toBeDefined()
    expect(css).toMatch(/\.link-underline:focus-visible::after/)
    expect(css).toMatch(/\.link-underline::after\s*\{[^}]*transform:\s*scaleX\(0\)/)
    expect(css).toMatch(/\.link-underline::after\s*\{[^}]*var\(--motion-duration-base\)\s+var\(--ease-out-expo\)/)
  })

  it('drops the sweep transition under prefers-reduced-motion', () => {
    const reducedBlock = mediaBlockContaining('(prefers-reduced-motion: reduce)', '.link-underline::after')
    expect(reducedBlock).toMatch(/transition:\s*none/)
  })

  describe('view transitions', () => {
    afterEach(() => {
      Reflect.deleteProperty(document, 'startViewTransition')
    })

    function renderRoutes() {
      return render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <TextLink to="/galeria" viewTransition>
                  View all
                </TextLink>
              }
            />
            <Route path="/galeria" element={<h1>Gallery</h1>} />
          </Routes>
        </MemoryRouter>,
      )
    }

    it('navigates inside document.startViewTransition when the link opts in', async () => {
      const start = vi.fn((update: () => unknown) => {
        const done = Promise.resolve(update())
        return { finished: done, ready: done, updateCallbackDone: done }
      })
      Object.defineProperty(document, 'startViewTransition', { configurable: true, writable: true, value: start })
      vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

      renderRoutes()
      fireEvent.click(screen.getByRole('link', { name: 'View all' }))

      expect(start).toHaveBeenCalledTimes(1)
      expect(await screen.findByRole('heading', { name: 'Gallery' })).toBeInTheDocument()
    })

    it('falls back to a normal client navigation without the View Transitions API', async () => {
      renderRoutes()
      fireEvent.click(screen.getByRole('link', { name: 'View all' }))
      expect(await screen.findByRole('heading', { name: 'Gallery' })).toBeInTheDocument()
    })

    it('leaves modified clicks (new tab / window) to the browser', () => {
      const start = vi.fn()
      Object.defineProperty(document, 'startViewTransition', { configurable: true, writable: true, value: start })

      renderRoutes()
      fireEvent.click(screen.getByRole('link', { name: 'View all' }), { ctrlKey: true })

      expect(start).not.toHaveBeenCalled()
    })
  })
})
