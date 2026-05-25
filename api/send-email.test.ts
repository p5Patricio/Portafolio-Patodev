import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import handler from './send-email'

const sendEmailMock = vi.hoisted(() => vi.fn())

vi.mock('resend', () => ({
  Resend: vi.fn(function ResendMock() {
    return {
      emails: {
        send: sendEmailMock,
      },
    }
  }),
}))

type MockResponse = VercelResponse & {
  headers: Record<string, string>
  statusCode?: number
  jsonBody?: unknown
  ended?: boolean
}

function createRequest(
  method: string,
  body?: Record<string, unknown>,
  ip = `127.0.0.${Math.floor(Math.random() * 200) + 1}`,
): VercelRequest {
  return {
    method,
    body,
    headers: {
      'x-forwarded-for': ip,
      origin: 'http://localhost:5173',
    },
  } as unknown as VercelRequest
}

function createResponse(): MockResponse {
  const res = {
    headers: {},
    status(code: number) {
      res.statusCode = code
      return res
    },
    json(body: unknown) {
      res.jsonBody = body
      return res
    },
    end() {
      res.ended = true
      return res
    },
    setHeader(name: string, value: string) {
      res.headers[name] = value
      return res
    },
  } as MockResponse

  return res
}

describe('send-email API', () => {
  beforeEach(() => {
    sendEmailMock.mockReset()
    sendEmailMock.mockResolvedValue({ data: { id: 'email_123' }, error: null })
  })

  it('rejects unsupported methods', async () => {
    const res = createResponse()

    await handler(createRequest('GET'), res)

    expect(res.statusCode).toBe(405)
    expect(res.jsonBody).toEqual({ error: 'Method not allowed' })
    expect(sendEmailMock).not.toHaveBeenCalled()
  })

  it('rejects missing required fields', async () => {
    const res = createResponse()

    await handler(createRequest('POST', { name: 'Patricio' }), res)

    expect(res.statusCode).toBe(400)
    expect(res.jsonBody).toEqual({ error: 'All fields are required.' })
    expect(sendEmailMock).not.toHaveBeenCalled()
  })

  it('accepts honeypot submissions without sending email', async () => {
    const res = createResponse()

    await handler(
      createRequest('POST', {
        name: 'Bot',
        email: 'bot@example.com',
        subject: 'Spam',
        message: 'Spam message',
        website: 'filled-by-bot',
      }),
      res,
    )

    expect(res.statusCode).toBe(200)
    expect(res.jsonBody).toEqual({ success: true })
    expect(sendEmailMock).not.toHaveBeenCalled()
  })

  it('sends valid contact messages through Resend', async () => {
    const res = createResponse()

    await handler(
      createRequest('POST', {
        name: ' Patricio ',
        email: 'patricio@example.com',
        subject: ' Nuevo proyecto ',
        message: ' Hola desde el portafolio ',
        website: '',
      }),
      res,
    )

    expect(res.statusCode).toBe(200)
    expect(res.jsonBody).toEqual({ success: true, id: 'email_123' })
    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: 'patricio@example.com',
        subject: 'Nuevo proyecto',
        text: expect.stringContaining('Hola desde el portafolio'),
      }),
    )
  })
})
