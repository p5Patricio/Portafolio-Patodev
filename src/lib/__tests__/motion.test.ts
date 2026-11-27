import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { DURATION, EASE, STAGGER } from '../motion'

/**
 * Parity guard: the CSS motion tokens in src/index.css and the Framer Motion
 * constants in src/lib/motion.ts must describe the same rhythm.
 */
// Vitest runs from the project root (where vitest.config.ts lives).
const css = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8')

/** Every declared value of a custom property (it may be declared in more than one block). */
function declarations(name: string): string[] {
  const pattern = new RegExp(`(?<![\\w-])${name.replace(/-/g, '\\-')}\\s*:\\s*([^;]+);`, 'g')
  return [...css.matchAll(pattern)].map((match) => match[1].trim())
}

function parseCubicBezier(value: string): number[] {
  const match = /^cubic-bezier\(([^)]+)\)$/.exec(value)
  if (!match) throw new Error(`Not a cubic-bezier(): ${value}`)
  return match[1].split(',').map((part) => Number(part.trim()))
}

/** Parses a CSS time (`ms` or `s`) into seconds. */
function parseSeconds(value: string): number {
  const match = /^(-?[\d.]+)(ms|s)$/.exec(value)
  if (!match) throw new Error(`Not a CSS time: ${value}`)
  const amount = Number(match[1])
  return match[2] === 'ms' ? amount / 1000 : amount
}

const easeTokens = {
  '--ease-out-expo': EASE.outExpo,
  '--ease-in-out-quart': EASE.inOutQuart,
  '--ease-out-quart': EASE.outQuart,
} as const

const timeTokens = {
  '--motion-duration-fast': DURATION.fast,
  '--motion-duration-base': DURATION.base,
  '--motion-duration-slow': DURATION.slow,
  '--motion-duration-slower': DURATION.slower,
  '--motion-stagger': STAGGER,
} as const

describe('motion tokens parity (src/index.css <-> src/lib/motion.ts)', () => {
  it.each(Object.entries(easeTokens))('%s matches EASE', (token, expected) => {
    const values = declarations(token)
    expect(values, `${token} is not declared in src/index.css`).not.toHaveLength(0)
    for (const value of values) {
      expect(parseCubicBezier(value)).toEqual([...expected])
    }
  })

  it.each(Object.entries(timeTokens))('%s matches its seconds constant', (token, expected) => {
    const values = declarations(token)
    expect(values, `${token} is not declared in src/index.css`).not.toHaveLength(0)
    for (const value of values) {
      expect(parseSeconds(value)).toBeCloseTo(expected, 6)
    }
  })
})
