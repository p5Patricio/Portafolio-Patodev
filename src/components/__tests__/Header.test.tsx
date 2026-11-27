import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils'
import Header from '../Header'
import MotionProvider from '../MotionProvider'

describe('Header', () => {
  it('renders the brand link', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('link', { name: /portafolio/i })).toBeInTheDocument()
  })

  it('renders primary navigation links', () => {
    renderWithProviders(<Header />)
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Trabajo' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Experiencia' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sobre mí' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Estudio' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contacto' })).toBeInTheDocument()
  })

  it('renders language selectors', () => {
    renderWithProviders(<Header />)
    const selectors = screen.getAllByRole('group', { name: /language selector/i })
    expect(selectors.length).toBeGreaterThanOrEqual(1)
  })

  it('opens the mobile menu, closes it on Escape, and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    const menuButton = screen.getByRole('button', { name: /menú/i })
    await user.click(menuButton)

    const dialog = await screen.findByRole('dialog', { name: /menu/i })
    expect(dialog).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Trabajo' }).length).toBeGreaterThanOrEqual(1)

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(menuButton).toHaveFocus()
  })

  it('closes the mobile menu when a link is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    await user.click(screen.getByRole('button', { name: /menú/i }))
    const dialog = await screen.findByRole('dialog', { name: /menu/i })

    await user.click(within(dialog).getByRole('link', { name: 'Contacto' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  describe('scroll progress bar', () => {
    it('shows the page progress bar on the home page', () => {
      renderWithProviders(
        <MotionProvider>
          <Header />
        </MotionProvider>,
      )
      expect(screen.getByTestId('scroll-progress')).toBeInTheDocument()
    })

    it('omits the progress bar on the galeria page', () => {
      renderWithProviders(
        <MotionProvider>
          <Header variant="galeria" />
        </MotionProvider>,
      )
      expect(screen.queryByTestId('scroll-progress')).not.toBeInTheDocument()
    })
  })

  describe('active link indicator', () => {
    // jsdom has no layout: give each desktop nav link a fake box keyed by its label.
    const LINK_BOXES: Record<string, { left: number; width: number }> = {
      Trabajo: { left: 0, width: 60 },
      Contacto: { left: 400, width: 70 },
    }
    const LINK_TOP = 10
    const LINK_HEIGHT = 20
    const boxOf = (el: HTMLElement) => LINK_BOXES[el.textContent ?? '']

    const sections: HTMLElement[] = []

    function addSection(id: string, top: number, bottom: number) {
      const el = document.createElement('section')
      el.id = id
      el.getBoundingClientRect = () => ({ top, bottom }) as DOMRect
      document.body.appendChild(el)
      sections.push(el)
      return el
    }

    beforeEach(() => {
      vi.spyOn(HTMLElement.prototype, 'offsetLeft', 'get').mockImplementation(function (this: HTMLElement) {
        return boxOf(this)?.left ?? 0
      })
      vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
        return boxOf(this)?.width ?? 0
      })
      vi.spyOn(HTMLElement.prototype, 'offsetTop', 'get').mockImplementation(function (this: HTMLElement) {
        return boxOf(this) ? LINK_TOP : 0
      })
      vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (this: HTMLElement) {
        return boxOf(this) ? LINK_HEIGHT : 0
      })
    })

    afterEach(() => {
      vi.restoreAllMocks()
      sections.splice(0).forEach((el) => el.remove())
    })

    it('is decorative', () => {
      renderWithProviders(
        <MotionProvider>
          <Header />
        </MotionProvider>,
      )
      expect(screen.getByTestId('nav-indicator')).toHaveAttribute('aria-hidden', 'true')
    })

    it('stays hidden while the hero is in view and no nav link is active', async () => {
      renderWithProviders(
        <MotionProvider>
          <Header />
        </MotionProvider>,
      )
      const indicator = screen.getByTestId('nav-indicator')
      await waitFor(() => expect(indicator.style.opacity).toBe('0'))
    })

    it('slides under the link of the section that reaches the viewport center', async () => {
      const center = window.innerHeight / 2
      addSection('inicio', -2000, center - 1)
      addSection('proyectos', center, center + 1000)
      const contacto = addSection('contacto', center + 2000, center + 3000)

      renderWithProviders(
        <MotionProvider>
          <Header />
        </MotionProvider>,
      )
      const indicator = screen.getByTestId('nav-indicator')

      await waitFor(() => {
        // Framer omits the zero translateX: "Trabajo" sits at the left edge.
        expect(indicator.style.transform).not.toContain('translateX')
        expect(indicator.style.transform).toContain('scaleX(60)')
        expect(indicator.style.opacity).toBe('1')
      })

      contacto.getBoundingClientRect = () => ({ top: 0, bottom: center + 1 }) as DOMRect
      sections[1].getBoundingClientRect = () => ({ top: -3000, bottom: -1000 }) as DOMRect
      fireEvent.scroll(window)

      await waitFor(() => {
        expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('aria-current', 'page')
        expect(indicator.style.transform).toContain('translateX(400px)')
        expect(indicator.style.transform).toContain(`translateY(${LINK_TOP + LINK_HEIGHT - 1}px)`)
        expect(indicator.style.transform).toContain('scaleX(70)')
      })
    })

    it('marks "Trabajo" on the galeria page', async () => {
      renderWithProviders(
        <MotionProvider>
          <Header variant="galeria" />
        </MotionProvider>,
      )
      const indicator = screen.getByTestId('nav-indicator')
      await waitFor(() => {
        expect(indicator.style.transform).toContain('scaleX(60)')
        expect(indicator.style.opacity).toBe('1')
      })
    })
  })

  describe('galeria variant', () => {
    it('points the brand link and nav links back at the home page', () => {
      renderWithProviders(<Header variant="galeria" />)
      expect(screen.getByRole('link', { name: /portafolio/i })).toHaveAttribute('href', '/')
      expect(screen.getByRole('link', { name: 'Trabajo' })).toHaveAttribute('href', '/#proyectos')
      expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/#contacto')
    })

    it('statically highlights "Trabajo" as the active link', () => {
      renderWithProviders(<Header variant="galeria" />)
      expect(screen.getByRole('link', { name: 'Trabajo' })).toHaveAttribute('aria-current', 'page')
      expect(screen.getByRole('link', { name: 'Contacto' })).not.toHaveAttribute('aria-current')
    })

    describe('route view transitions', () => {
      afterEach(() => {
        Reflect.deleteProperty(document, 'startViewTransition')
      })

      function mockStartViewTransition() {
        const start = vi.fn(() => ({
          finished: Promise.resolve(),
          ready: Promise.resolve(),
          updateCallbackDone: Promise.resolve(),
        }))
        Object.defineProperty(document, 'startViewTransition', { configurable: true, writable: true, value: start })
        return start
      }

      it('runs nav links and the brand link back home inside a view transition', () => {
        const start = mockStartViewTransition()
        renderWithProviders(<Header variant="galeria" />, { route: '/galeria' })

        expect(fireEvent.click(screen.getByRole('link', { name: 'Experiencia' }))).toBe(false)
        expect(fireEvent.click(screen.getByRole('link', { name: /portafolio/i }))).toBe(false)
        expect(start).toHaveBeenCalledTimes(2)
      })

      it('keeps the plain full-page navigation when the API is missing', () => {
        renderWithProviders(<Header variant="galeria" />, { route: '/galeria' })
        // Not default-prevented: the browser follows /#experiencia as before.
        expect(fireEvent.click(screen.getByRole('link', { name: 'Experiencia' }))).toBe(true)
      })

      it('leaves in-page anchors on home alone', () => {
        const start = mockStartViewTransition()
        renderWithProviders(<Header />)
        fireEvent.click(screen.getByRole('link', { name: 'Experiencia' }))
        expect(start).not.toHaveBeenCalled()
      })

      it('names the header so it stays in place while the page cross-fades', () => {
        const { container } = renderWithProviders(<Header variant="galeria" />)
        expect(container.querySelector('header')!.style.viewTransitionName).toBe('site-header')
      })
    })
  })
})
