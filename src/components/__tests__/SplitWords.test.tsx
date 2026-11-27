import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import SplitWords from '../SplitWords'

function words(container: HTMLElement) {
  return [...container.querySelectorAll('.split-mask > .split-word')] as HTMLElement[]
}

describe('SplitWords', () => {
  it('wraps every word in its own clipping mask', () => {
    const { container } = render(<SplitWords text="Proyectos seleccionados recientes" />)
    const masks = container.querySelectorAll('.split-mask')

    expect(masks).toHaveLength(3)
    expect(words(container).map((w) => w.textContent)).toEqual(['Proyectos', 'seleccionados', 'recientes'])
  })

  it('keeps the real whitespace between words so text content, wrapping and copy/paste stay natural', () => {
    const text = 'Hablemos  de tu\nproyecto'
    const { container } = render(
      <p>
        <SplitWords text={text} />
      </p>,
    )
    expect(container.querySelector('p')?.textContent).toBe(text)
  })

  it('does not split on non-breaking spaces (they must keep words together)', () => {
    const { container } = render(<SplitWords text={'Sobre mí hoy'} />)
    expect(words(container).map((w) => w.textContent)).toEqual(['Sobre mí', 'hoy'])
  })

  it('numbers each word on the sequence, starting at startOrder', () => {
    const { container } = render(<SplitWords text="Uno dos tres" startOrder={2} />)
    expect(words(container).map((w) => w.style.getPropertyValue('--seq-order'))).toEqual(['2', '3', '4'])
  })

  it('applies the given class to every word', () => {
    const { container } = render(<SplitWords text="Uno dos" wordClassName="seq-rise" />)
    for (const word of words(container)) expect(word).toHaveClass('seq-rise')
  })
})
