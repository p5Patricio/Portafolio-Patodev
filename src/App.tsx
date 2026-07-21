import './index.css'
import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import MobileNavbar from './components/MobileNavbar'
import HomePage from './pages/HomePage'
import SEO from './components/SEO'

const GaleriaPage = lazy(() => import('./pages/GaleriaPage'))

function App() {
  const { pathname } = useLocation()
  // Hide the section-anchor navbars on the standalone gallery page —
  // it has its own "back to home" floating chip and ID-based nav links
  // (e.g. #sobre-mi) wouldn't resolve there anyway.
  const isHome = pathname === '/'

  return (
    <>
      {/* Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-5 focus:py-3 focus:bg-color-tinta focus:text-color-papel focus:rounded-full focus:shadow-lg focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:font-semibold"
      >
        Saltar al contenido
      </a>

      <main id="main-content" className="pb-24 lg:pb-0">
        {/* Navbar and MobileNavbar mounted at the top */}
        {isHome && <Navbar />}
        {isHome && <MobileNavbar />}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SEO
                  title="Patricio García | Ingeniero de Software & Desarrollador Full Stack"
                  description="Portafolio profesional de Patricio García, Ingeniero de Software y Desarrollador Full Stack especializado en React, TypeScript, Node.js e Inteligencia Artificial en México."
                  canonical="https://patodev.com/"
                />
                <HomePage />
              </>
            }
          />
          <Route
            path="/galeria"
            element={
              <Suspense fallback={null}>
                <SEO
                  title="Galería de Certificados y Logros | Patricio García"
                  description="Explora los certificados profesionales, títulos académicos y acreditaciones de Inteligencia Artificial de Patricio García, Ingeniero de Software."
                  canonical="https://patodev.com/galeria"
                />
                <GaleriaPage />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
