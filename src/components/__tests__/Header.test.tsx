import { describe, it, expect } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../test-utils'
import Header from '../Header'

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
  })
})
