import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../test-utils'
import SectionHeader from '../SectionHeader'

/** Reads the `--seq-order` CSS variable the scroll sequence keys its delay on. */
function seqOrder(el: Element | null): number {
  expect(el, 'element is missing its sequence hook').not.toBeNull()
  const value = (el as HTMLElement).style.getPropertyValue('--seq-order')
  expect(value, 'element has no --seq-order').not.toBe('')
  return Number(value)
}

/** Every top-level CSS rule in index.css as { selector, body }, plus the reduced-motion blocks. */
function cssRules() {
  const css = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8')
  const rules = [...css.matchAll(/([^{}@]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
    selector: selector.trim(),
    body,
  }))
  const reducedMotion = [...css.matchAll(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/g)]
    .map(([, block]) => block)
    .join('\n')
  return { rules, reducedMotion }
}

const SEQ_SELECTOR = /reveal-seq|seq-rise|seq-fade|split-word|split-mask/

describe('SectionHeader', () => {
  it('renders the title as a heading', () => {
    renderWithProviders(<SectionHeader index="01" label="Trabajo" title="Proyectos" />)
    expect(screen.getByRole('heading', { name: /proyectos/i })).toBeInTheDocument()
  })

  it('renders the mono index / label line', () => {
    renderWithProviders(<SectionHeader index="01" label="Trabajo" title="Proyectos" />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText(/trabajo/i)).toBeInTheDocument()
  })

  it('keeps the index / label line as plain text ("01 / LABEL")', () => {
    renderWithProviders(<SectionHeader index="01" label="Trabajo" title="Proyectos" />)
    expect(screen.getByText('01').closest('p')?.textContent).toBe('01 / Trabajo')
  })

  it('renders optional right-aligned meta', () => {
    renderWithProviders(<SectionHeader index="01" label="Trabajo" title="Proyectos" meta="3 PROYECTOS" />)
    expect(screen.getByText('3 PROYECTOS')).toBeInTheDocument()
  })

  it('renders intro when provided', () => {
    renderWithProviders(<SectionHeader index="05" label="Contacto" title="Contacto" intro="Hablemos pronto." />)
    expect(screen.getByText('Hablemos pronto.')).toBeInTheDocument()
  })

  it('does not render intro when omitted', () => {
    renderWithProviders(<SectionHeader index="00" label="Inicio" title="Hero" />)
    expect(screen.queryByText(/hablemos/i)).not.toBeInTheDocument()
  })

  describe('scroll typography sequence', () => {
    const title = 'Proyectos que construí últimamente'

    it('keeps the heading accessible name and text exactly equal to the title', () => {
      renderWithProviders(<SectionHeader index="02" label="Trabajo" title={title} />)
      const heading = screen.getByRole('heading', { level: 2, name: title })
      expect(heading.textContent).toBe(title)
    })

    it('keeps the accessible name when rendered as the page h1', () => {
      renderWithProviders(<SectionHeader index="01" label="Galería" title={title} as="h1" />)
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
      expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
    })

    it('splits the title into one clipping mask per word', () => {
      renderWithProviders(<SectionHeader index="02" label="Trabajo" title={title} />)
      const heading = screen.getByRole('heading', { name: title })
      const words = heading.querySelectorAll('.split-mask > .split-word.seq-rise')
      expect([...words].map((w) => w.textContent)).toEqual(title.split(' '))
    })

    it('orchestrates label → title words → intro instead of fading the whole header', () => {
      const { container } = renderWithProviders(
        <SectionHeader index="02" label="Trabajo" title={title} meta="4 PROYECTOS" intro="Una selección." />,
      )
      // The old whole-header fade is gone: one orchestrated sequence instead.
      expect(container.querySelector('.reveal')).toBeNull()
      expect(container.querySelector('.reveal-seq')).not.toBeNull()

      const index = seqOrder(screen.getByText('02'))
      const label = seqOrder(screen.getByText(/\/ trabajo/i))
      const meta = seqOrder(screen.getByText('4 PROYECTOS'))
      const words = [...screen.getByRole('heading', { name: title }).querySelectorAll('.split-word')].map(seqOrder)
      const intro = seqOrder(screen.getByText('Una selección.'))

      expect(index).toBe(0)
      expect(label).toBeGreaterThan(index)
      expect(meta).toBeLessThan(words[0])
      expect(words[0]).toBeGreaterThan(label)
      for (let i = 1; i < words.length; i++) expect(words[i]).toBeGreaterThan(words[i - 1])
      expect(intro).toBeGreaterThan(words[words.length - 1])
    })

    it('never hides anything without the .js class (prerender / no-JS safe)', () => {
      const { container } = renderWithProviders(
        <SectionHeader index="02" label="Trabajo" title={title} meta="4 PROYECTOS" intro="Una selección." />,
      )
      expect(document.documentElement).not.toHaveClass('js')

      // Nothing is hidden through markup: no inline opacity/transform/visibility.
      const animated = container.querySelectorAll('.seq-rise, .seq-fade, .seq-fade-up')
      expect(animated.length).toBeGreaterThan(0)
      for (const el of animated) {
        const style = (el as HTMLElement).style
        expect(style.opacity).toBe('')
        expect(style.transform).toBe('')
        expect(style.visibility).toBe('')
        expect(el).not.toHaveAttribute('hidden')
        expect(el.closest('[aria-hidden="true"]')).toBeNull()
      }

      // Every CSS rule that hides or animates part of the sequence is gated by `.js`.
      const hiding = cssRules()
        .rules.filter(({ selector }) => SEQ_SELECTOR.test(selector))
        .filter(({ body }) => /opacity:\s*0[;\s]|transform:\s*translate|transition/.test(body))

      expect(hiding.length).toBeGreaterThan(0)
      for (const { selector } of hiding) {
        for (const part of selector.split(',')) {
          expect(part.trim(), `"${part.trim()}" hides header content without the .js gate`).toMatch(/^\.js\s/)
        }
      }
    })

    it('shows every sequence element immediately under prefers-reduced-motion', () => {
      const { reducedMotion } = cssRules()
      for (const cls of ['.seq-rise', '.seq-fade', '.seq-fade-up']) {
        expect(reducedMotion, `reduced-motion block does not reset ${cls}`).toContain(`.js .reveal-seq ${cls}`)
      }
    })
  })
})
