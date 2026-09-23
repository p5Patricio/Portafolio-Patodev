import { describe, it, expect } from 'vitest'
import { routeSeo, PRERENDER_ROUTES } from '../seo'

describe('seo data', () => {
  it('defines SEO data for the home and gallery routes', () => {
    expect(Object.keys(routeSeo).sort()).toEqual(['/', '/galeria'].sort())
  })

  it('every route has a non-empty title, description and canonical URL', () => {
    for (const [route, data] of Object.entries(routeSeo)) {
      expect(data.title, `title for ${route}`).toBeTruthy()
      expect(data.description, `description for ${route}`).toBeTruthy()
      expect(data.canonical, `canonical for ${route}`).toMatch(/^https:\/\/patodev\.com/)
    }
  })

  it('canonical URLs match their route path', () => {
    expect(routeSeo['/'].canonical).toBe('https://patodev.com/')
    expect(routeSeo['/galeria'].canonical).toBe('https://patodev.com/galeria')
  })

  it('PRERENDER_ROUTES matches the routeSeo keys (used by scripts/prerender.mjs)', () => {
    expect(PRERENDER_ROUTES.sort()).toEqual(Object.keys(routeSeo).sort())
  })
})
