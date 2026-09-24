import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import Contacto from './Contacto'

describe('Contacto', () => {
  it('renders a single section heading ("¿Construimos algo?"), no duplicate title', () => {
    renderWithProviders(<Contacto />)
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(/construimos algo/i)
  })

  it('renders the "05 / Contacto" mono label', () => {
    renderWithProviders(<Contacto />)
    expect(screen.getByText('05')).toBeInTheDocument()
    expect(screen.getByText(/contacto/i)).toBeInTheDocument()
  })

  it('has a submit button', () => {
    renderWithProviders(<Contacto />)
    const submitBtn = screen.getByRole('button', { name: /enviar mensaje/i })
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).not.toBeDisabled()
  })

  it('renders all form inputs', () => {
    renderWithProviders(<Contacto />)
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/asunto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^mensaje/i)).toBeInTheDocument()
  })

  it('renders the email as a mailto link and the location', () => {
    renderWithProviders(<Contacto />)
    const emailLink = screen.getByRole('link', { name: 'patricio16garcia@gmail.com' })
    expect(emailLink).toHaveAttribute('href', 'mailto:patricio16garcia@gmail.com')
    expect(screen.getByText(/guanajuato/i)).toBeInTheDocument()
  })

  it('copies the email to the clipboard', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })

    renderWithProviders(<Contacto />)
    await user.click(screen.getByRole('button', { name: /copiar/i }))

    expect(writeText).toHaveBeenCalledWith('patricio16garcia@gmail.com')
    expect(await screen.findByText(/copiado/i)).toBeInTheDocument()
  })

  it('renders social links and a back-to-top link', () => {
    renderWithProviders(<Contacto />)
    const github = screen.getByRole('link', { name: 'GitHub' })
    const linkedin = screen.getByRole('link', { name: 'LinkedIn' })
    expect(github).toHaveAttribute('href', 'https://github.com/p5Patricio')
    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/patricioagpv/')
    expect(screen.getByRole('link', { name: /volver arriba/i })).toHaveAttribute('href', '#inicio')
  })

  it('submits the form and shows success state', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as Response)
    )

    renderWithProviders(<Contacto />)

    await user.type(screen.getByLabelText(/nombre/i), 'Test User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/asunto/i), 'Test Subject')
    await user.type(screen.getByLabelText(/^mensaje/i), 'Test message content')

    const submitBtn = screen.getByRole('button', { name: /enviar mensaje/i })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalledWith(
      '/api/send-email',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
  })

  it('shows error state on failed submission', async () => {
    const user = userEvent.setup()
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, json: () => Promise.resolve({}) } as Response)
    )

    renderWithProviders(<Contacto />)

    await user.type(screen.getByLabelText(/nombre/i), 'Test User')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/asunto/i), 'Test Subject')
    await user.type(screen.getByLabelText(/^mensaje/i), 'Test message content')

    const submitBtn = screen.getByRole('button', { name: /enviar mensaje/i })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText(/no se pudo enviar/i)).toBeInTheDocument()
    })
  })
})
