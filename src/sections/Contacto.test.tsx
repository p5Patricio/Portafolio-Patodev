import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import Contacto from './Contacto'

describe('Contacto', () => {
  it('renders the contact section', () => {
    renderWithProviders(<Contacto />)
    expect(screen.getByRole('heading', { name: /contacto/i })).toBeInTheDocument()
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

  it('renders contact info rows', () => {
    renderWithProviders(<Contacto />)
    expect(screen.getByText('pa.garciaperezvela@ugto.mx')).toBeInTheDocument()
    expect(screen.getByText(/guanajuato/i)).toBeInTheDocument()
  })

  it('renders contact cards in the preferred order', () => {
    renderWithProviders(<Contacto />)

    const github = screen.getByText('github.com/p5Patricio')
    const linkedin = screen.getByText('linkedin.com/in/patricioagpv')
    const email = screen.getByText('pa.garciaperezvela@ugto.mx')
    const location = screen.getByText(/guanajuato/i)

    expect(github.compareDocumentPosition(linkedin)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(linkedin.compareDocumentPosition(email)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(email.compareDocumentPosition(location)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
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
