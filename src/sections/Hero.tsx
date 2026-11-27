import { useEffect, useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import Section from '../components/Section'
import Button from '../components/Button'
import TiltCard from '../components/TiltCard'
import TechTitle from '../components/TechTitle'
import { useLanguage } from '../context/LanguageContext'
import type { Lang } from '../data/translations'

// Published via GitHub Pages from p5Patricio/cv-patricio (es/en résumé PDFs).
// Verified reachable and served as application/pdf before wiring this up.
const CV_URLS: Record<Lang, string> = {
  es: 'https://p5patricio.github.io/cv-patricio/es/cv_es.pdf',
  en: 'https://p5patricio.github.io/cv-patricio/en/cv_en.pdf',
}

/**
 * Entrance choreography: one ~1.2s sequence played once per page load.
 * Each value is the element's position on a grid of `--motion-stagger`
 * steps; `src/index.css` turns it into `animation-delay` via
 * `calc(var(--hero-order) * var(--motion-stagger))`. The gap at 3 lets the
 * name land before the supporting copy follows.
 */
const HERO_SEQUENCE = {
  availability: 0,
  nameFirst: 1,
  nameLast: 2,
  positioning: 4,
  ctaPrimary: 5,
  ctaSecondary: 6,
  logo: 7,
  scrollHint: 8,
} as const

const heroStep = (order: number) => ({ '--hero-order': order }) as CSSProperties

/** Set on <html> once the hero has mounted, so later mounts (route changes) skip the intro. */
export const HERO_INTRO_PLAYED_CLASS = 'hero-intro-played'

/**
 * `play` on the first mount of a page load (and always in the prerendered
 * HTML, where `document` does not exist), `skip` on any later mount. Read once
 * at mount, so re-renders and language switches never change it.
 */
function useHeroIntro(): 'play' | 'skip' {
  const [intro] = useState<'play' | 'skip'>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains(HERO_INTRO_PLAYED_CLASS)
      ? 'skip'
      : 'play'
  )

  useEffect(() => {
    document.documentElement.classList.add(HERO_INTRO_PLAYED_CLASS)
  }, [])

  return intro
}

function Hero() {
  const { t, lang } = useLanguage()
  const intro = useHeroIntro()

  const scrollToNext = () => {
    const el = document.getElementById('proyectos')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
    }
  }

  return (
    <Section id="inicio" first ariaLabelledBy="hero-title" innerClassName="py-0!">
      <div
        data-hero-intro={intro}
        className="flex min-h-[78svh] flex-col justify-center gap-8 py-20 md:min-h-[88svh] lg:grid lg:grid-cols-12 lg:items-center lg:gap-10"
      >
        {/* Logo — <lg: centered between the tagline and the CTAs. The text
            column below uses `display: contents` there, so its children and
            this logo share one flex column ordered with `order-*`.
            lg+: right grid column, vertically centered next to the name.
            Single <img> (no duplicate element, no duplicate request). */}
        <div
          className="hero-enter hero-enter-scale order-4 flex justify-center lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1"
          style={heroStep(HERO_SEQUENCE.logo)}
        >
          <TiltCard className="w-[clamp(9rem,40vw,14rem)] lg:w-full lg:max-w-[440px]">
            <span role="img" aria-label={t.hero.logoAlt} className="block">
              <img
                src="/logo-mark-lg.webp"
                alt=""
                aria-hidden="true"
                width={872}
                height={535}
                loading="eager"
                fetchPriority="high"
                draggable={false}
                className="h-auto w-full select-none"
              />
            </span>
          </TiltCard>
        </div>

        <div className="contents lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:gap-10">
          {/* Real, always-readable accessible heading — the giant name below is
              purely decorative (aria-hidden) so its two-line mask-reveal
              animation doesn't need to be parsed as the page's actual h1 text. */}
          <h1 id="hero-title" className="sr-only">
            Patricio García
          </h1>

          <p
            className="hero-enter mono-label order-1 flex items-center gap-2.5 text-xs text-muted lg:order-none"
            style={heroStep(HERO_SEQUENCE.availability)}
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
            {t.hero.availability}
          </p>

          <TechTitle
            as="div"
            aria-hidden="true"
            className="order-2 text-[clamp(3.75rem,17vw,10rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-paper font-stretch-wide [overflow-wrap:anywhere] md:text-[clamp(3rem,12vw,10rem)] lg:text-[clamp(3rem,8.5vw,9rem)] min-[1920px]:text-[clamp(10rem,9vw,14rem)] lg:order-none"
          >
            <div className="hero-line" style={heroStep(HERO_SEQUENCE.nameFirst)}>
              <span>Patricio</span>
            </div>
            <div className="hero-line" style={heroStep(HERO_SEQUENCE.nameLast)}>
              <span>García</span>
            </div>
          </TechTitle>

          <p
            className="hero-enter order-3 max-w-[30ch] text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.3] text-muted lg:order-none"
            style={heroStep(HERO_SEQUENCE.positioning)}
          >
            {t.hero.positioning.prefix}
            <span className="text-paper">{t.hero.positioning.highlight}</span>
            {t.hero.positioning.suffix}
          </p>

          <div className="order-5 flex flex-wrap items-center gap-4 lg:order-none">
            <div className="hero-enter" style={heroStep(HERO_SEQUENCE.ctaPrimary)}>
              <Button href="#contacto" external={false} ariaLabel={t.hero.ctaContactAriaLabel}>
                {t.hero.ctaContact}
              </Button>
            </div>
            <div className="hero-enter" style={heroStep(HERO_SEQUENCE.ctaSecondary)}>
              <Button href={CV_URLS[lang]} variant="secondary" ariaLabel={t.hero.ctaCvAriaLabel}>
                {t.hero.ctaCv}
              </Button>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToNext}
            className="hero-enter group order-6 mt-4 inline-flex min-h-11 w-fit items-center gap-2 self-center outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2 md:self-start lg:order-none"
            style={heroStep(HERO_SEQUENCE.scrollHint)}
          >
            <span className="mono-label text-[12px] text-muted transition-colors group-hover:text-paper">
              {t.hero.scrollHint}
            </span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce text-muted transition-colors group-hover:text-paper" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Section>
  )
}

export default Hero
