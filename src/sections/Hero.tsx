import { ChevronDown } from 'lucide-react'
import Section from '../components/Section'
import Button from '../components/Button'
import { useLanguage } from '../context/LanguageContext'
import type { Lang } from '../data/translations'

// Published via GitHub Pages from p5Patricio/cv-patricio (es/en résumé PDFs).
// Verified reachable and served as application/pdf before wiring this up.
const CV_URLS: Record<Lang, string> = {
  es: 'https://p5patricio.github.io/cv-patricio/es/cv_es.pdf',
  en: 'https://p5patricio.github.io/cv-patricio/en/cv_en.pdf',
}

function Hero() {
  const { t, lang } = useLanguage()

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
      <div className="flex min-h-[78svh] flex-col justify-center gap-8 py-20 md:min-h-[88svh] md:gap-10">
        {/* Real, always-readable accessible heading — the giant name below is
            purely decorative (aria-hidden) so its two-line mask-reveal
            animation doesn't need to be parsed as the page's actual h1 text. */}
        <h1 id="hero-title" className="sr-only">
          Patricio García
        </h1>

        <p className="mono-label flex items-center gap-2.5 text-xs text-muted">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-beak" />
          {t.hero.availability}
        </p>

        <div
          aria-hidden="true"
          className="text-[clamp(3.75rem,17vw,10rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-paper font-stretch-wide [overflow-wrap:anywhere] md:text-[clamp(3rem,12vw,10rem)]"
        >
          <div className="hero-line">
            <span>Patricio</span>
          </div>
          <div className="hero-line">
            <span>García</span>
          </div>
        </div>

        <p className="max-w-[42ch] text-base text-muted md:text-lg">
          {t.hero.positioning.prefix}
          <span className="text-paper">{t.hero.positioning.highlight}</span>
          {t.hero.positioning.suffix}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Button href="#contacto" external={false} ariaLabel={t.hero.ctaContactAriaLabel}>
            {t.hero.ctaContact}
          </Button>
          <Button href={CV_URLS[lang]} variant="secondary" ariaLabel={t.hero.ctaCvAriaLabel}>
            {t.hero.ctaCv}
          </Button>
        </div>

        <button
          type="button"
          onClick={scrollToNext}
          className="group mt-4 inline-flex min-h-11 w-fit items-center gap-2 self-center outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2 md:self-start"
        >
          <span className="mono-label text-[11px] text-muted transition-colors group-hover:text-paper">
            {t.hero.scrollHint}
          </span>
          <ChevronDown className="h-3.5 w-3.5 animate-bounce text-muted transition-colors group-hover:text-paper" aria-hidden="true" />
        </button>
      </div>
    </Section>
  )
}

export default Hero
