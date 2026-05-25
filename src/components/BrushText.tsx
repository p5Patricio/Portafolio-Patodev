import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import Logo from './Logo'

/**
 * Elegant Hero Title.
 * Split layout with a massive colorful logo on the left and 
 * sophisticated layered typography on the right.
 */
function BrushText() {
  const { t, lang } = useLanguage()

  // Typography configurations for the right side
  // ES: "Soy" (0), "Ingeniero" (1), "de" (2), "Software" (3)
  const configs = [
    { font: 'font-technical', size: 'text-lg md:text-xl tracking-[0.4em] opacity-80', color: 'text-color-accent' },
    { font: 'font-elegant', size: 'text-6xl md:text-8xl lg:text-9xl tracking-tightest', color: 'text-white' },
    { font: 'font-technical', size: 'text-lg md:text-xl tracking-[0.4em] opacity-80', color: 'text-color-accent' },
    { font: 'font-elegant', size: 'text-6xl md:text-8xl lg:text-9xl tracking-tightest', color: 'text-white' },
  ]

  return (
    <div className="relative w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 px-6 py-20 lg:py-0 min-h-[80vh]">
      {/* --- Left Side: Massive Colorful Logo (Clean & Static) --- */}
      <motion.div
        initial={{ opacity: 0, x: -50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
        className="relative flex-1 flex items-center justify-center lg:justify-start"
      >
        <Logo className="w-[18rem] h-[18rem] md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] relative z-10" />
      </motion.div>

      {/* --- Right Side: Sophisticated Typography --- */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-2 md:gap-4">
        {t.hero.words.map(({ text }, i) => {
          const cfg = configs[i] || configs[0]
          return (
            <motion.span
              key={`${lang}-${i}-${text}`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.4 + i * 0.15,
              }}
              className={`block uppercase leading-[0.85] ${cfg.font} ${cfg.size} ${cfg.color}`}
            >
              {text}
            </motion.span>
          )
        })}

        {/* --- Micro-accent (The Red Touch) --- */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-8 flex items-center gap-4"
        >
          <span className="h-px w-16 tricolor-separator rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full tricolor-dot" />
          <span className="h-px w-16 tricolor-separator rounded-full" />
        </motion.div>
      </div>
    </div>
  )
}

export default BrushText
