/**
 * Single source of truth for per-route SEO metadata.
 *
 * Consumed by:
 *  - src/App.tsx (client-side <SEO> props per <Route>)
 *  - scripts/prerender.mjs (build-time HTML head injection, via src/entry-server.tsx)
 *
 * Keep route paths as they appear in react-router `path` definitions.
 */
export interface RouteSeoData {
  title: string
  description: string
  canonical: string
}

export const routeSeo: Record<string, RouteSeoData> = {
  '/': {
    title: 'Patricio García | Ingeniero de Software & Desarrollador Full Stack',
    description:
      'Portafolio profesional de Patricio García, Ingeniero de Software y Desarrollador Full Stack especializado en React, TypeScript, Node.js e Inteligencia Artificial en México.',
    canonical: 'https://patodev.com/',
  },
  '/galeria': {
    title: 'Proyectos de Software | Patricio García, Ingeniero de Software',
    description:
      'Galería completa de proyectos de Patricio García: aplicaciones full stack, inteligencia artificial y machine learning construidas con React, Next.js, TypeScript, FastAPI y Python.',
    canonical: 'https://patodev.com/galeria',
  },
}

/** Routes that get a build-time prerendered HTML file. */
export const PRERENDER_ROUTES = Object.keys(routeSeo)
