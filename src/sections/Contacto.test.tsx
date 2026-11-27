import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import MotionProvider from '../components/MotionProvider'
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

  describe('feedback states', () => {
    async function fillForm(user: ReturnType<typeof userEvent.setup>) {
      await user.type(screen.getByLabelText(/nombre/i), 'Test User')
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/asunto/i), 'Test Subject')
      await user.type(screen.getByLabelText(/^mensaje/i), 'Test message content')
    }

    it('draws a sky focus underline under every field', () => {
      renderWithProviders(<Contacto />)
      for (const label of [/nombre/i, /email/i, /asunto/i, /^mensaje/i]) {
        const field = screen.getByLabelText(label)
        const underline = field.parentElement?.querySelector('[data-focus-line]')
        expect(underline, `no focus underline for ${label}`).not.toBeNull()
        expect(underline).toHaveAttribute('aria-hidden', 'true')
        expect(underline).toHaveClass('bg-sky', 'scale-x-0', 'origin-left')
      }
    })

    it('shows an inline sending state without swapping the button label out of the layout', async () => {
      const user = userEvent.setup()
      let resolve!: (value: Response) => void
      global.fetch = vi.fn(() => new Promise<Response>((r) => (resolve = r)))

      renderWithProviders(<Contacto />)
      await fillForm(user)

      const button = screen.getByRole('button', { name: /enviar mensaje/i })
      // Both labels stay mounted so the button width never changes.
      expect(within(button).getByText('Enviar mensaje')).not.toHaveAttribute('aria-hidden')
      expect(within(button).getByText('Enviando...').parentElement).toHaveAttribute('aria-hidden', 'true')

      await user.click(button)

      const sending = await screen.findByRole('button', { name: /enviando/i })
      expect(sending).toBe(button)
      expect(sending).toBeDisabled()
      expect(sending.closest('form')).toHaveAttribute('aria-busy', 'true')
      expect(within(button).getByText('Enviar mensaje')).toHaveAttribute('aria-hidden', 'true')
      expect(within(button).getByText('Enviando...').parentElement).not.toHaveAttribute('aria-hidden')
      expect(within(button).getByTestId('submit-spinner')).toBeInTheDocument()

      resolve({ ok: true, json: () => Promise.resolve({}) } as Response)
      await screen.findByText(/mensaje enviado/i)
      expect(button.closest('form')).toHaveAttribute('aria-busy', 'false')
    })

    it('announces success inside the polite live region', async () => {
      const user = userEvent.setup()
      global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) } as Response))

      renderWithProviders(
        <MotionProvider>
          <Contacto />
        </MotionProvider>,
      )
      await fillForm(user)
      await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

      const message = await screen.findByText(/mensaje enviado/i)
      const region = message.closest('[aria-live]')
      expect(region).toHaveAttribute('aria-live', 'polite')
      expect(region).toHaveAttribute('aria-atomic', 'true')
      // The form resets after a successful send.
      expect(screen.getByLabelText(/nombre/i)).toHaveValue('')
    })

    it('replaces the error with the success message on retry', async () => {
      const user = userEvent.setup()
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({ ok: false, json: () => Promise.resolve({}) } as Response)
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) } as Response)

      renderWithProviders(
        <MotionProvider>
          <Contacto />
        </MotionProvider>,
      )
      await fillForm(user)
      await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))
      const error = await screen.findByText(/no se pudo enviar/i)
      expect(error.closest('[aria-live]')).toHaveAttribute('aria-live', 'polite')

      // Error keeps the form filled and the button enabled for a retry.
      const button = screen.getByRole('button', { name: /enviar mensaje/i })
      expect(button).not.toBeDisabled()
      await user.click(button)

      await screen.findByText(/mensaje enviado/i)
      await waitFor(() => expect(screen.queryByText(/no se pudo enviar/i)).not.toBeInTheDocument())
      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })
})
