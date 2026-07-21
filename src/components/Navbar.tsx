import { motion } from 'framer-motion'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
import { useLanguage } from '../context/LanguageContext'
import useActiveSection from '../hooks/useActiveSection'

const linkDefs = [
  { id: 'inicio',       href: '#inicio',       labelKey: 'inicio' },
  { id: 'experiencia',  href: '#experiencia',  labelKey: 'experiencia' },
  { id: 'proyectos',    href: '#proyectos',    labelKey: 'proyectos' },
  { id: 'herramientas', href: '#herramientas', labelKey: 'herramientas' },
  { id: 'sobre-mi',     href: '#sobre-mi',     labelKey: 'sobreMi' },
  { id: 'contacto',     href: '#contacto',     labelKey: 'contacto' },
] as const

const SECTION_IDS = linkDefs.map((l) => l.id)

const CAPSULE =
  'h-11 rounded-full liquid-glass border border-white/15 shadow-xl'

function Navbar() {
  const active = useActiveSection(SECTION_IDS)
  const { t } = useLanguage()

  return (
    <>
      {/* Brand */}
      <motion.a
        href="#inicio"
        className={`hidden lg:flex fixed top-6 left-8 xl:left-12 z-40 items-center gap-3 group pl-1.5 pr-4 ${CAPSULE}`}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        aria-label={t.brand.title}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 border border-white/10">
          <Logo
            alt={t.brand.title}
            className="h-6 w-auto transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="leading-tight">
          <p className="font-black text-color-tinta tracking-widest text-[0.7rem] uppercase">
            {t.brand.title}
          </p>
          <p className="text-[0.55rem] text-color-danger font-bold tracking-widest uppercase">
            {t.brand.subtitle}
          </p>
        </div>
      </motion.a>

      {/* Center nav links capsule */}
      <motion.nav
        className="hidden lg:block fixed top-6 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        aria-label="Primary"
      >
        <ul className={`flex items-center gap-0.5 px-2 ${CAPSULE}`}>
          {linkDefs.map(({ id, href, labelKey }) => {
            const isActive = active === id
            return (
              <li key={id} className="relative">
                <a
                  href={href}
                  className={`relative block whitespace-nowrap px-3.5 xl:px-4 py-1 text-[0.65rem] xl:text-[0.7rem] tracking-[0.2em] uppercase font-bold rounded-full transition-colors ${
                    isActive
                      ? 'text-color-papel'
                      : 'text-color-tinta/70 hover:text-color-accent'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-color-accent shadow-[0_0_15px_rgba(34,213,224,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t.nav[labelKey]}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </motion.nav>

      {/* Language selector — right floating */}
      <motion.div
        className="hidden lg:block fixed top-6 right-8 xl:right-12 z-40"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        <LanguageSelector size="lg" accent="yellow" layoutKey="lang-pill-desktop" />
      </motion.div>

      {/* Mobile / tablet language selector */}
      <motion.div
        className="fixed top-5 right-5 md:top-6 md:right-7 z-40 lg:hidden"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        <LanguageSelector size="md" accent="yellow" layoutKey="lang-pill-mobile" />
      </motion.div>
    </>
  )
}

export default Navbar
