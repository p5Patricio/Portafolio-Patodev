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
      {/* Content */}
      <div className="relative z-20 w-full px-6 py-12 md:py-16 lg:py-20 md:px-12 lg:px-24 flex flex-col items-center">
        <SectionHeader title={t.sobreMi.title} size="lg" />

        <div className="max-w-4xl mt-8 md:mt-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
          {/* Logo container */}
          <div className="w-36 h-36 md:w-48 md:h-48 shrink-0 relative flex items-center justify-center overflow-hidden p-6 liquid-glass rounded-full shadow-xl">
            <div className="absolute inset-3 border border-white/10 rounded-full pointer-events-none z-10" />
            <img
              src="/LogoDark.png"
              alt="Logo de Patricio García"
              className="w-full h-full object-contain relative z-20"
              loading="lazy"
              decoding="async"
              width={192}
              height={192}
            />
          </div>

          {/* Text container */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-color-tinta/90 text-xs md:text-sm leading-relaxed liquid-glass rounded-2xl px-6 py-5 md:px-7 md:py-6 shadow-lg">
              {t.sobreMi.para1}
            </p>
          </div>
        </div>

        {/* Philosophy / Homage */}
        <div className="max-w-2xl mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 px-4 group">
          {/* Avatar / Portrait Container */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center bg-color-accent/5 rounded-full overflow-hidden liquid-glass transition-all duration-300 group-hover:border-color-accent group-hover:glow-cyan z-10">
              <img
                src="/garou-2.jpg"
                alt="Garou"
                className="w-full h-full object-cover object-top mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500 scale-110 group-hover:scale-125"
                loading="lazy"
                decoding="async"
                width={112}
                height={112}
              />
            </div>
            {/* Mobile Quote Icon */}
            <Quote className="absolute -right-8 sm:hidden w-6 h-6 text-color-accent/40" />
          </div>

          {/* Quote Text */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Quote className="hidden sm:block w-5 h-5 text-color-accent/40 mb-2" />
            <blockquote className="font-bold text-lg sm:text-xl text-color-tinta tracking-tight leading-relaxed">
              {t.sobreMi.philosophyQuote}
            </blockquote>
            <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-color-accent font-black">
              {t.sobreMi.philosophyAuthor}
            </span>
          </div>
        </div>

        <div className="max-w-3xl mt-12 text-center">
          <GamingRanks />
        </div>
      </div>
    </section>
  )
}

export default SobreMi
