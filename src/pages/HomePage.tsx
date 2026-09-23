import Hero from '../sections/Hero'
import Proyectos from '../sections/Proyectos'
import Experiencia from '../sections/Experiencia'
import SobreMi from '../sections/SobreMi'
import SymmetricalCode from '../sections/SymmetricalCode'
import Contacto from '../sections/Contacto'

/**
 * Single-page home — blueprint structure, Swiss typographic voice:
 *   Inicio → Trabajo (#proyectos) → Experiencia → Sobre mí (incl. Stack) →
 *   Estudio (#symmetrical-code) → Contacto
 *
 * The Header is mounted at the App level so it persists across route
 * transitions (and stays off the /galeria route).
 */
function HomePage() {
  return (
    <>
      <Hero />
      <Proyectos />
      <Experiencia />
      <SobreMi />
      <SymmetricalCode />
      <Contacto />
    </>
  )
}

export default HomePage
