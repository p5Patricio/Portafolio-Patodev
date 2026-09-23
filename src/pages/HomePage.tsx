import Hero from '../sections/Hero'
import SobreMi from '../sections/SobreMi'
import Experiencia from '../sections/Experiencia'
import Proyectos from '../sections/Proyectos'
import Herramientas from '../sections/Herramientas'
import SymmetricalCode from '../sections/SymmetricalCode'
import Contacto from '../sections/Contacto'
import ScrollBackground from '../components/ScrollBackground'

/**
 * Single-page home — every section in the original order from the design
 * roadmap:
 *   Inicio → Experiencia → Proyectos → Herramientas → Sobre mí →
 *   Symmetrical Code → Contacto
 *
 * Symmetrical Code sits right before Contacto: it closes with its own CTAs
 * (visit the studio site / jump to Contacto), so it reads as a bridge into
 * the contact form rather than a detour from the personal portfolio flow.
 *
 * The Navbar / MobileNavbar are mounted at the App level so they persist
 * across route transitions.
 */
function HomePage() {
  return (
    <ScrollBackground>
      <Hero />
      <Experiencia />
      <Proyectos />
      <Herramientas />
      <SobreMi />
      <SymmetricalCode />
      <Contacto />
    </ScrollBackground>
  )
}

export default HomePage
