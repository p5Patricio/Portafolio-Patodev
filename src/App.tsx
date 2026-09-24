import './index.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import GaleriaPage from './pages/GaleriaPage'
import SEO from './components/SEO'
import { routeSeo } from './data/seo'

// GaleriaPage is imported eagerly (not React.lazy + Suspense) on purpose.
// react-dom's server renderer emits *any* <Suspense> boundary's content
// through its streaming "segment" format — a pending "$?" placeholder in
// <main>, the real markup parked in a `hidden` sibling <div>, and a
// $RC(...) reveal <script> that swaps it into place at parse time —
// regardless of whether the boundary actually suspends server-side (see
// scripts/prerender.mjs output for /galeria before this change). That's
// fine for a live streaming HTTP response, but wrong for a prerendered
// SEO page for two reasons: (1) it makes the real content depend on that
// inline script executing correctly before hydration, which is extra
// fragility a static file doesn't need, and (2) crawlers/bots that fetch
// the HTML without executing JS would see the empty "$?" placeholder
// instead of the actual gallery content, defeating the point of
// prerendering. Importing GaleriaPage eagerly removes the Suspense
// boundary so the prerendered HTML has the content inline and plain, and
// keeps the client/server element trees identical for a clean hydration.
// The trade-off is that GaleriaPage (a few KB) is no longer a separate
// lazy chunk on the client.

function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      {/* Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded focus:bg-paper focus:px-5 focus:py-3 focus:text-xs focus:font-medium focus:uppercase focus:tracking-[0.08em] focus:text-ink focus:shadow-lg"
      >
        Saltar al contenido
      </a>

      <Header variant={isHome ? 'home' : 'galeria'} />

      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SEO {...routeSeo['/']} />
                <HomePage />
              </>
            }
          />
          <Route
            path="/galeria"
            element={
              <>
                <SEO {...routeSeo['/galeria']} />
                <GaleriaPage />
              </>
            }
          />
        </Routes>
      </main>

      {/* Vercel Web Analytics + Speed Insights: client-only scripts, render nothing in SSR. */}
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App
