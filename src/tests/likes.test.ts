import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import handler from '../../api/likes'

const redisMock = vi.hoisted(() => ({
  get: vi.fn(),
  incr: vi.fn(),
}))

vi.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: vi.fn(() => redisMock),
  },
}))

type MockResponse = VercelResponse & {
  headers: Record<string, string>
  statusCode?: number
  jsonBody?: unknown
  ended?: boolean
}

function createRequest(method: string, ip = `127.0.0.${Math.floor(Math.random() * 200) + 1}`): VercelRequest {
  return {
    method,
    body: {},
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

describe('likes API', () => {
  beforeEach(() => {
    redisMock.get.mockReset()
    redisMock.incr.mockReset()
  })

  it('rejects unsupported methods', async () => {
    const res = createResponse()

    await handler(createRequest('DELETE'), res)

    expect(res.statusCode).toBe(405)
    expect(res.jsonBody).toEqual({ error: 'Method not allowed' })
    expect(redisMock.get).not.toHaveBeenCalled()
    expect(redisMock.incr).not.toHaveBeenCalled()
  })

  it('returns the current count on GET', async () => {
    redisMock.get.mockResolvedValue(42)
    const res = createResponse()

    await handler(createRequest('GET'), res)

    expect(res.statusCode).toBe(200)
    expect(res.jsonBody).toEqual({ count: 42 })
    expect(redisMock.get).toHaveBeenCalledWith('portfolio:likes')
    expect(redisMock.incr).not.toHaveBeenCalled()
  })

  it('returns 0 when no likes have been stored yet', async () => {
    redisMock.get.mockResolvedValue(null)
    const res = createResponse()

    await handler(createRequest('GET'), res)

    expect(res.statusCode).toBe(200)
    expect(res.jsonBody).toEqual({ count: 0 })
  })

  it('atomically increments and returns the new count on POST', async () => {
    redisMock.incr.mockResolvedValue(7)
    const res = createResponse()

    await handler(createRequest('POST'), res)

    expect(res.statusCode).toBe(200)
    expect(res.jsonBody).toEqual({ count: 7 })
    expect(redisMock.incr).toHaveBeenCalledWith('portfolio:likes')
    expect(redisMock.get).not.toHaveBeenCalled()
  })

  it('rate-limits repeated POSTs from the same IP', async () => {
    redisMock.incr.mockResolvedValue(1)
    const ip = '192.168.1.50'

    for (let i = 0; i < 5; i++) {
      const res = createResponse()
      await handler(createRequest('POST', ip), res)
      expect(res.statusCode).toBe(200)
    }

    const blocked = createResponse()
    await handler(createRequest('POST', ip), blocked)
    expect(blocked.statusCode).toBe(429)
    expect(blocked.jsonBody).toEqual({ error: 'Too many requests. Please try again later.' })
  })

  it('handles Redis failures gracefully', async () => {
    redisMock.get.mockRejectedValue(new Error('connection refused'))
    const res = createResponse()

    await handler(createRequest('GET'), res)

    expect(res.statusCode).toBe(500)
    expect(res.jsonBody).toEqual({ error: 'Internal server error.' })
  })
})
