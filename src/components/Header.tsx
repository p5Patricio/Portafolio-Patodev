import { useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
import MobileMenu from './MobileMenu'
import { useLanguage } from '../context/LanguageContext'
import useActiveSection from '../hooks/useActiveSection'

const NAV_LINKS = [
  { id: 'proyectos', href: '#proyectos', labelKey: 'trabajo' },
  { id: 'experiencia', href: '#experiencia', labelKey: 'experiencia' },
  { id: 'sobre-mi', href: '#sobre-mi', labelKey: 'sobreMi' },
  { id: 'symmetrical-code', href: '#symmetrical-code', labelKey: 'symmetricalCode' },
  { id: 'contacto', href: '#contacto', labelKey: 'contacto' },
] as const

// 'inicio' is tracked too (but not rendered as a nav link) so that while the
// hero is in view, none of the nav links are incorrectly highlighted.
const SECTION_IDS = ['inicio', ...NAV_LINKS.map((l) => l.id)]

const FOCUS_RING =
  'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2'

type Props = {
  /** "home" tracks scroll position to highlight the active section. "galeria"
   *  (any other route) points every nav link back at the home page's
   *  anchors and statically highlights "Trabajo" instead. */
  variant?: 'home' | 'galeria'
}

/**
 * Shared site header: compact top bar (logo/wordmark, mono nav, ES/EN
 * toggle) on lg+, condensing to a slightly shorter, more opaque bar on
 * scroll. Below lg, the nav links collapse into a "Menú" button that opens
 * the full-screen MobileMenu overlay.
 */
function Header({ variant = 'home' }: Props) {
  const isHome = variant === 'home'
  const active = useActiveSection(SECTION_IDS)
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkHref = (href: string) => (isHome ? href : `/${href}`)
  const isLinkActive = (id: string) => (isHome ? active === id : id === 'proyectos')

  const mobileMenuItems = NAV_LINKS.map((link) => ({
    id: link.id,
    href: linkHref(link.href),
    label: t.nav[link.labelKey],
  }))

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[height,background-color,border-color] duration-300 ${
          scrolled ? 'h-14 border-line bg-ink' : 'h-20 border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto h-full frame-width px-4 md:px-6 lg:px-10">
          <div className="flex h-full items-center justify-between md:px-[clamp(1.5rem,3vw,3rem)]">
            {isHome ? (
              <a href="#inicio" className={`inline-flex items-center gap-3 ${FOCUS_RING}`} aria-label={t.brand.title}>
                <Logo alt="" className="h-8 w-auto shrink-0 md:h-9" />
                <span className="mono-label text-xs text-paper">PATODEV</span>
              </a>
            ) : (
              <Link to="/" className={`inline-flex items-center gap-3 ${FOCUS_RING}`} aria-label={t.brand.title}>
                <Logo alt="" className="h-8 w-auto shrink-0 md:h-9" />
                <span className="mono-label text-xs text-paper">PATODEV</span>
              </Link>
            )}

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {NAV_LINKS.map(({ id, href, labelKey }) => {
                  const isActive = isLinkActive(id)
                  return (
                    <li key={id}>
                      <a
                        href={linkHref(href)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`mono-label border-b pb-0.5 text-xs transition-colors ${FOCUS_RING} ${
                          isActive ? 'border-sky text-paper' : 'border-transparent text-muted hover:text-paper'
                        }`}
                      >
                        {t.nav[labelKey]}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-6">
              <LanguageSelector className="hidden lg:flex" />
              <LanguageSelector className="lg:hidden" />
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                className={`mono-label relative inline-flex min-h-11 items-center gap-2 text-xs text-paper lg:hidden ${FOCUS_RING}`}
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
                {t.nav.menuOpen}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={mobileMenuItems}
        closeAriaLabel={t.nav.menuClose}
        returnFocusRef={menuButtonRef}
      />
    </>
  )
}

export default Header
