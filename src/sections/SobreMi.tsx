import { Quote } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import GamingRanks from '../components/GamingRanks'
import { useLanguage } from '../context/LanguageContext'

function SobreMi() {
  const { t } = useLanguage()

  return (
    <section
      id="sobre-mi"
      className="relative z-10 min-h-screen overflow-hidden flex flex-col items-center"
    >
      {/* Background handled by ScrollBackground component */}

      {/* Content */}
      <div className="relative z-20 w-full px-6 py-28 md:py-32 lg:py-36 md:px-12 lg:px-24 flex flex-col items-center">
        <SectionHeader title={t.sobreMi.title} size="lg" />

        <div className="max-w-4xl mt-10 md:mt-16 flex flex-col md:flex-row items-center gap-10 md:gap-14 w-full">
          {/* Logo container */}
          <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 relative flex items-center justify-center overflow-hidden p-6 md:p-8 glass-card rounded-full shadow-2xl">
            <div className="absolute inset-4 border border-color-accent/10 rounded-full pointer-events-none z-10" />
            <img
              src="/LogoDark.png"
              alt="Logo de Patricio García"
              className="w-full h-full object-contain relative z-20"
              loading="lazy"
              decoding="async"
              width={224}
              height={224}
            />
          </div>

          {/* Text container */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-color-tinta/90 text-fluid-body leading-relaxed glass-card rounded-2xl px-8 py-7 shadow-xl">
              {t.sobreMi.para1}
            </p>
          </div>
        </div>

        {/* Philosophy / Homage (Modern Tech) */}
        <div className="max-w-2xl mt-24 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 px-6 group">
          {/* Avatar / Portrait Container */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center bg-color-accent/5 rounded-full overflow-hidden border border-color-accent/20 transition-all duration-300 group-hover:border-color-accent group-hover:glow-cyan z-10">
              <img
                src="/garou-2.jpg"
                alt="Garou"
                className="w-full h-full object-cover object-top mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500 scale-110 group-hover:scale-125"
                loading="lazy"
                decoding="async"
                width={128}
                height={128}
              />
            </div>
            {/* Mobile Quote Icon */}
            <Quote className="absolute -right-10 sm:hidden w-7 h-7 text-color-accent/40" />
          </div>

          {/* Quote Text */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Desktop Quote Icon */}
            <Quote className="hidden sm:block w-6 h-6 text-color-accent/40 mb-4" />
            <blockquote className="font-bold text-xl sm:text-2xl text-color-tinta tracking-tight leading-relaxed">
              {t.sobreMi.philosophyQuote}
            </blockquote>
            <span className="mt-4 text-[11px] sm:text-xs uppercase tracking-[0.4em] text-color-accent font-black">
              {t.sobreMi.philosophyAuthor}
            </span>
          </div>
        </div>

        <div className="max-w-3xl mt-20 text-center">
          <GamingRanks />
        </div>
      </div>
    </section>
  )
}

export default SobreMi
