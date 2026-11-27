import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useSpring, type MotionValue } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
import MobileMenu from './MobileMenu'
import ScrollProgress from './ScrollProgress'
import { useLanguage } from '../context/LanguageContext'
import useActiveSection from '../hooks/useActiveSection'
import { SPRING } from '../lib/motion'

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

/** Height in px of the active-link underline (matches its `h-px` class and the links' 1px border). */
const INDICATOR_THICKNESS = 1

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
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>())
  const placeIndicatorRef = useRef<(animate: boolean) => void>(() => {})
  const indicatorPlacedRef = useRef(false)
  const reduceMotion = useReducedMotion()

  // Active-link underline: one shared hairline that glides between links.
  // Motion values (not state) so moving it never re-renders the header.
  // `domAnimation` has no layout animations (`layoutId` needs `domMax`), so
  // the line is positioned with transforms measured from the active link.
  const indicatorX = useSpring(0, SPRING.snappy)
  const indicatorY = useSpring(0, SPRING.snappy)
  const indicatorWidth = useSpring(0, SPRING.snappy)
  const indicatorOpacity = useSpring(0, SPRING.snappy)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkHref = (href: string) => (isHome ? href : `/${href}`)
  const isLinkActive = (id: string) => (isHome ? active === id : id === 'proyectos')
  const activeLinkId = NAV_LINKS.find(({ id }) => isLinkActive(id))?.id

  useLayoutEffect(() => {
    placeIndicatorRef.current = (animate) => {
      const glide = animate && !reduceMotion
      const to = (value: MotionValue<number>, target: number, smooth: boolean) =>
        smooth ? value.set(target) : value.jump(target)

      const link = activeLinkId ? linkRefs.current.get(activeLinkId) : undefined
      if (!link) {
        to(indicatorOpacity, 0, glide)
        return
      }

      // Slide only between two real positions; the first placement appears in place.
      const slide = glide && indicatorPlacedRef.current
      to(indicatorX, link.offsetLeft, slide)
      to(indicatorY, link.offsetTop + link.offsetHeight - INDICATOR_THICKNESS, slide)
      to(indicatorWidth, link.offsetWidth, slide)
      to(indicatorOpacity, 1, glide)
      indicatorPlacedRef.current = true
    }

    placeIndicatorRef.current(true)
    // From now on the shared line marks the active link, so the per-link
    // underline (the prerender / no-JS fallback) steps aside.
    navRef.current?.setAttribute('data-indicator', 'ready')
  }, [activeLinkId, reduceMotion, indicatorX, indicatorY, indicatorWidth, indicatorOpacity])

  // Link widths change with the language, web-font loading and the lg breakpoint.
  useEffect(() => {
    const nav = navRef.current
    if (!nav || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => placeIndicatorRef.current(false))
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  const mobileMenuItems = NAV_LINKS.map((link) => ({
    id: link.id,
    href: linkHref(link.href),
    label: t.nav[link.labelKey],
  }))

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[height,background-color,border-color] duration-(--motion-duration-base) ease-in-out-quart ${
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

            <nav ref={navRef} aria-label="Primary" className="group/nav relative hidden lg:block">
              <ul className="flex items-center gap-8">
                {NAV_LINKS.map(({ id, href, labelKey }) => {
                  const isActive = isLinkActive(id)
                  return (
                    <li key={id}>
                      <a
                        ref={(el) => {
                          if (el) linkRefs.current.set(id, el)
                          else linkRefs.current.delete(id)
                        }}
                        href={linkHref(href)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`mono-label border-b pb-0.5 text-xs transition-colors duration-(--motion-duration-base) ease-out-quart group-data-[indicator=ready]/nav:border-transparent ${FOCUS_RING} ${
                          isActive ? 'border-sky text-paper' : 'border-transparent text-muted hover:text-paper'
                        }`}
                      >
                        {t.nav[labelKey]}
                      </a>
                    </li>
                  )
                })}
              </ul>
              <m.span
                data-testid="nav-indicator"
                aria-hidden="true"
                style={{ x: indicatorX, y: indicatorY, scaleX: indicatorWidth, opacity: indicatorOpacity }}
                className="pointer-events-none absolute left-0 top-0 h-px w-px origin-left bg-sky"
              />
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
        {isHome && <ScrollProgress className="absolute inset-x-0 -bottom-px" />}
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
