import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()
const KEY = 'portfolio:likes'
const SITE_URL = process.env.SITE_URL ?? 'https://patodev.com'

/** Simple in-memory rate limiter (resets on cold start). */
const ipLimits = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipLimits.get(ip)
  if (!entry || now > entry.resetAt) {
    ipLimits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_REQUESTS
}

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin
  const allowedOrigins = new Set([
    SITE_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    'http://localhost:5173',
  ])

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res)

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' })
  }

  try {
    if (req.method === 'GET') {
      const value = await redis.get<number>(KEY)
      return res.status(200).json({ count: value ?? 0 })
    }

    // POST: atomically increment the global counter.
    const count = await redis.incr(KEY)
    return res.status(200).json({ count })
  } catch (err) {
    console.error('Redis error:', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}
