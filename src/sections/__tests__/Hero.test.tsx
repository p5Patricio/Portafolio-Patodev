import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeEach, describe, it, expect } from 'vitest'
import { act, screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import { useLanguage } from '../../context/LanguageContext'
import Hero, { HERO_INTRO_PLAYED_CLASS } from '../Hero'

/** Reads the `--hero-order` CSS variable the entrance choreography keys its delay on. */
function heroOrder(el: Element | null): number {
  expect(el, 'element is missing its .hero-enter/.hero-line choreography hook').not.toBeNull()
  const value = (el as HTMLElement).style.getPropertyValue('--hero-order')
  expect(value, 'element has no --hero-order').not.toBe('')
  return Number(value)
}

/** The ordered choreography hooks: availability → name → positioning → CTAs → logo → scroll hint. */
function choreographySteps() {
  const lines = document.querySelectorAll('.hero-line')
  return [
    screen.getByText(/disponible para nuevos proyectos/i).closest('.hero-enter'),
    lines[0],
    lines[1],
    screen.getByText(/full.?stack/i).closest('.hero-enter'),
    screen.getByRole('link', { name: /contactar/i }).closest('.hero-enter'),
    screen.getByRole('link', { name: /descargar cv/i }).closest('.hero-enter'),
    screen.getAllByRole('img', { name: /logo de patodev/i })[0].closest('.hero-enter'),
    screen.getByRole('button', { name: /desliza|scroll/i }).closest('.hero-enter'),
  ]
}

function LanguageToggle() {
  const { toggleLang } = useLanguage()
  return (
    <button type="button" onClick={toggleLang}>
      toggle-language
    </button>
  )
}

describe('Hero', () => {
  beforeEach(() => {
    // The "intro already played" flag lives on <html>; isolate each test.
    document.documentElement.classList.remove(HERO_INTRO_PLAYED_CLASS)
  })

  it('renders the hero section with id inicio', () => {
    renderWithProviders(<Hero />)
    const section = document.getElementById('inicio')
    expect(section).toBeInTheDocument()
  })

  it('renders a single accessible h1 with the full name', () => {
    renderWithProviders(<Hero />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('Patricio García')
  })

  it('restores the two animated decorative hero lines without adding another h1', () => {
    const { container } = renderWithProviders(<Hero />)
    const lines = container.querySelectorAll('.hero-line')

    expect(lines).toHaveLength(2)
    expect(lines[0]).toHaveTextContent('Patricio')
    expect(lines[1]).toHaveTextContent('García')
    expect(lines[0].closest('[aria-hidden="true"]')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('renders the availability line and positioning statement', () => {
    renderWithProviders(<Hero />)
    expect(screen.getByText(/disponible para nuevos proyectos/i)).toBeInTheDocument()
    expect(screen.getByText(/full.?stack/i)).toBeInTheDocument()
  })

  it('renders the decorative hero logo with a descriptive alt/label', () => {
    renderWithProviders(<Hero />)
    expect(screen.getAllByRole('img', { name: /logo de patodev/i }).length).toBeGreaterThan(0)
  })

  it('renders a primary "Contactar" CTA that links to #contacto', () => {
    renderWithProviders(<Hero />)
    const cta = screen.getByRole('link', { name: /contactar/i })
    expect(cta).toHaveAttribute('href', '#contacto')
    // In-page anchor: must not force a new tab like the external CV link does
    expect(cta).not.toHaveAttribute('target')
  })

  it('renders a secondary "Descargar CV" CTA that opens the résumé PDF in a new tab', () => {
    renderWithProviders(<Hero />)
    const cta = screen.getByRole('link', { name: /descargar cv/i })
    expect(cta).toHaveAttribute('href', 'https://p5patricio.github.io/cv-patricio/es/cv_es.pdf')
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
  })

  describe('entrance choreography', () => {
    it('hooks every hero element into one sequence in the agreed order', () => {
      renderWithProviders(<Hero />)
      const orders = choreographySteps().map(heroOrder)

      // availability → Patricio → García → positioning → CTA → CTA → logo → scroll hint
      for (let i = 1; i < orders.length; i++) {
        expect(orders[i], `step ${i} must come after step ${i - 1}`).toBeGreaterThan(orders[i - 1])
      }
      // The availability label opens the sequence and the name (the likely LCP
      // element) starts within two stagger steps (~140ms) of first paint.
      expect(orders[0]).toBe(0)
      expect(orders[1]).toBeLessThanOrEqual(2)
    })

    it('plays the intro on the first mount of the page load', () => {
      const { container } = renderWithProviders(<Hero />)
      expect(container.querySelector('[data-hero-intro]')).toHaveAttribute('data-hero-intro', 'play')
    })

    it('does not replay on a language switch or re-render', () => {
      const { container } = renderWithProviders(
        <>
          <LanguageToggle />
          <Hero />
        </>
      )
      const root = container.querySelector('[data-hero-intro]')

      act(() => screen.getByRole('button', { name: 'toggle-language' }).click())

      // The hero re-rendered in English...
      expect(screen.getByRole('link', { name: /download cv/i })).toBeInTheDocument()
      // Same element, still in the "play" state: nothing was remounted or re-keyed.
      expect(container.querySelector('[data-hero-intro]')).toBe(root)
      expect(root).toHaveAttribute('data-hero-intro', 'play')
    })

    it('skips the intro when the hero mounts again later in the same page load', () => {
      const first = renderWithProviders(<Hero />)
      first.unmount()

      const { container } = renderWithProviders(<Hero />)
      expect(container.querySelector('[data-hero-intro]')).toHaveAttribute('data-hero-intro', 'skip')
    })

    it('never hides anything without the .js class (prerender / no-JS safe)', () => {
      renderWithProviders(<Hero />)
      expect(document.documentElement).not.toHaveClass('js')

      // Nothing is hidden through markup: no inline opacity/transform/visibility.
      for (const el of choreographySteps()) {
        const style = (el as HTMLElement).style
        expect(style.opacity).toBe('')
        expect(style.transform).toBe('')
        expect(style.visibility).toBe('')
        expect(el).not.toHaveAttribute('hidden')
      }

      // Every CSS rule that hides or animates a hero element is gated by `.js`.
      const css = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8')
      const rules = [...css.matchAll(/([^{}@]+)\{([^{}]*)\}/g)]
        .map(([, selector, body]) => ({ selector: selector.trim(), body }))
        .filter(({ selector }) => /hero-enter|hero-line/.test(selector))
        .filter(({ body }) => /opacity:\s*0[;\s]|translateY\(100%\)|animation(-name)?:\s*hero-/.test(body))

      expect(rules.length).toBeGreaterThan(0)
      for (const { selector } of rules) {
        for (const part of selector.split(',')) {
          expect(part.trim(), `"${part.trim()}" hides hero content without the .js gate`).toMatch(/^\.js\s/)
        }
      }
    })
  })
})
