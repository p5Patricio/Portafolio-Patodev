import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import type { Lang } from '../data/translations'

const OPTIONS: Lang[] = ['es', 'en']

type Size = 'md' | 'lg'
type Accent = 'cyan' | 'yellow'

type Props = {
  size?: Size
  accent?: Accent
  /** Show a small "Languages" icon at the left for extra presence. Defaults to true on lg. */
  showIcon?: boolean
  /** Unique key for the layoutId so multiple selectors don't share the same pill. */
  layoutKey?: string
}

const SIZE_STYLES: Record<Size, {
  container: string
  button: string
  text: string
  icon: string
}> = {
  md: {
    container: 'p-1 gap-0',
    button:    'px-4 py-1.5',
    text:      'text-xs tracking-[0.25em]',
    icon:      'w-3.5 h-3.5 mx-1.5',
  },
  lg: {
    // Force the same total height (h-12 = 48px) as the brand and nav capsules.
    container: 'h-12 px-2 gap-0',
    button:    'px-5 py-1.5',
    text:      'text-sm tracking-[0.35em]',
    icon:      'w-4 h-4 ml-2 mr-1',
  },
}

const ACCENT_STYLES: Record<Accent, {
  container: string
  icon: string
  pill: string
  divider: string
  hoverText: string
}> = {
  cyan: {
    container: 'bg-black/65 border-white/15 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]',
    icon: 'text-color-accent/60',
    pill: 'bg-color-accent shadow-[0_0_15px_rgba(34,213,224,0.4)]',
    divider: 'tricolor-separator-y',
    hoverText: 'hover:text-color-accent',
  },
  yellow: {
    container: 'bg-black/65 border-white/15 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]',
    icon: 'text-color-tinta/75',
    pill: 'bg-color-accent-alt shadow-[0_0_16px_rgba(255,220,60,0.34)]',
    divider: 'bg-white/10',
    hoverText: 'hover:text-color-tinta',
  },
}

function LanguageSelector({
  size = 'md',
  accent = 'cyan',
  showIcon,
  layoutKey = 'lang-pill',
}: Props) {
  const { lang, setLang } = useLanguage()
  const styles = SIZE_STYLES[size]
  const accentStyles = ACCENT_STYLES[accent]
  const showIconResolved = showIcon ?? true

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [pillRect, setPillRect] = useState({ left: 0, width: 0 })

  // Measure the active button relative to the container so the pill sits
  // exactly on top of it. This avoids Framer Motion's layoutId bug with
  // position:fixed parents + scroll, which causes the "bounce" artefact.
  useEffect(() => {
    function measure() {
      const container = containerRef.current
      const activeBtn = buttonRefs.current[OPTIONS.indexOf(lang)]
      if (!container || !activeBtn) return

      const containerRect = container.getBoundingClientRect()
      const btnRect = activeBtn.getBoundingClientRect()

      setPillRect({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [lang])

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Language selector"
      className={`relative flex items-center rounded-full backdrop-blur-xl border ${accentStyles.container} ${styles.container}`}
    >
      {showIconResolved && (
        <Languages
          aria-hidden="true"
          className={`${accentStyles.icon} flex-shrink-0 ${styles.icon}`}
          strokeWidth={2}
        />
      )}

      {/* Single animated pill — positioned absolutely inside the container */}
      <motion.div
        key={layoutKey}
        className={`absolute top-1 bottom-1 rounded-full pointer-events-none ${accentStyles.pill}`}
        initial={false}
        animate={{
          left: pillRect.left,
          width: pillRect.width,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />

      {OPTIONS.map((opt, i) => {
        const isActive = lang === opt
        return (
          <div key={opt} className="relative flex items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className={`w-px h-4 mx-0.5 opacity-60 ${accentStyles.divider}`}
              />
            )}
            <button
              ref={(el) => { buttonRefs.current[i] = el }}
              type="button"
              aria-pressed={isActive}
              onClick={() => setLang(opt)}
              className={`relative uppercase font-black rounded-full transition-colors ${styles.button} ${styles.text} ${
                isActive
                  ? accent === 'yellow' ? 'text-color-papel' : 'text-color-tinta'
                  : `text-color-tinta/50 ${accentStyles.hoverText}`
              }`}
            >
              <span className="relative z-10">{opt}</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default LanguageSelector
