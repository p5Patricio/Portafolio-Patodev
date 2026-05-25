import { motion } from 'framer-motion'
import {
  Home,
  User,
  FolderGit2,
  Wrench,
  Briefcase,
  Mail,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import useActiveSection from '../hooks/useActiveSection'

type NavItem = {
  id: string
  href: string
  icon: LucideIcon
  labelKey: keyof ReturnType<typeof useLanguage>['t']['nav']
}

// Order MUST mirror HomePage's section order so that the IntersectionObserver
// active state lines up with what the user sees on screen.
//   Inicio → Experiencia → Proyectos → Herramientas → Sobre mí → Contacto
const items: NavItem[] = [
  { id: 'inicio',       href: '#inicio',       icon: Home,       labelKey: 'inicio' },
  { id: 'experiencia',  href: '#experiencia',  icon: Briefcase,  labelKey: 'experiencia' },
  { id: 'proyectos',    href: '#proyectos',    icon: FolderGit2, labelKey: 'proyectos' },
  { id: 'herramientas', href: '#herramientas', icon: Wrench,     labelKey: 'herramientas' },
  { id: 'sobre-mi',     href: '#sobre-mi',     icon: User,       labelKey: 'sobreMi' },
  { id: 'contacto',     href: '#contacto',     icon: Mail,       labelKey: 'contacto' },
]

const SECTION_IDS = items.map((i) => i.id)

function MobileNavbar() {
  const active = useActiveSection(SECTION_IDS)
  const { t } = useLanguage()

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
        {items.map(({ id, href, icon: Icon, labelKey }) => {
          const isActive = active === id
          const label = t.nav[labelKey]
          return (
            <li key={id} className="relative">
              <a
                href={href}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-colors ${
                  isActive
                    ? 'text-color-papel'
                    : 'text-color-tinta/50 hover:text-color-accent'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-pill"
                    className="absolute inset-0 rounded-full bg-color-accent shadow-[0_0_15px_rgba(34,213,224,0.5)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  className="relative z-10 w-5 h-5"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}

export default MobileNavbar
