import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import MotionProvider from './components/MotionProvider'
import { LanguageProvider } from './context/LanguageContext'

const rootElement = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <MotionProvider>
          <App />
        </MotionProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
)

// scripts/prerender.mjs marks the pre-rendered markup with
// data-prerendered="true" so we only hydrate against real SSR output.
// `vite dev` and any other unprerendered load (e.g. a prerender failure)
// serve the raw index.html placeholder instead, which hydrateRoot cannot
// reconcile against — fall back to a normal client render there.
if (rootElement.dataset.prerendered === 'true') {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
