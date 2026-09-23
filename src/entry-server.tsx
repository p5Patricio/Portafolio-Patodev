import { StrictMode } from 'react'
import { StaticRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext'

/**
 * Server render entry point, used only by scripts/prerender.mjs (via the
 * `vite build --ssr` bundle at dist-ssr/entry-server.js). Mirrors the
 * provider tree in src/main.tsx, swapping BrowserRouter for StaticRouter.
 */
// eslint-disable-next-line react-refresh/only-export-components -- server-only entry, never part of the client HMR graph
export function render(url: string) {
  return (
    <StrictMode>
      <StaticRouter location={url}>
        <LanguageProvider>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </LanguageProvider>
      </StaticRouter>
    </StrictMode>
  )
}

// Re-exported so the plain-Node prerender script doesn't need its own
// TypeScript-aware import of src/data/seo.ts.
// eslint-disable-next-line react-refresh/only-export-components -- server-only entry, never part of the client HMR graph
export { routeSeo, PRERENDER_ROUTES } from './data/seo'
