import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ChevronDown, Terminal } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { SKILL_CATEGORIES, type SkillCategory } from '../data/skills'
import SectionHeader from '../components/SectionHeader'
import TechIcon, { TECH_LABELS } from '../components/TechIcon'
import type { Lang } from '../data/translations'

const stackVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

type ToolAccent = 'cyan' | 'yellow' | 'red'

const TOOL_ACCENTS: ToolAccent[] = ['cyan', 'yellow', 'red']

const TOOL_ACCENT_STYLES: Record<
  ToolAccent,
  {
    card: string
    icon: string
    line: string
    dot: string
  }
> = {
  cyan: {
    card:
      'hover:border-color-accent/50 hover:bg-color-accent/[0.05]',
    icon: 'group-hover:text-color-accent',
    line: 'bg-color-accent shadow-[0_0_12px_rgba(0,216,240,0.48)]',
    dot: 'bg-color-accent shadow-[0_0_12px_rgba(0,216,240,0.62)]',
  },
  yellow: {
    card:
      'hover:border-color-accent-alt/50 hover:bg-color-accent-alt/[0.05]',
    icon: 'group-hover:text-color-accent-alt',
    line: 'bg-color-accent-alt shadow-[0_0_12px_rgba(255,220,60,0.48)]',
    dot: 'bg-color-accent-alt shadow-[0_0_12px_rgba(255,220,60,0.62)]',
  },
  red: {
    card:
      'hover:border-color-danger/50 hover:bg-color-danger/[0.05]',
    icon: 'group-hover:text-color-danger',
    line: 'bg-color-danger shadow-[0_0_12px_rgba(255,76,76,0.48)]',
    dot: 'bg-color-danger shadow-[0_0_12px_rgba(255,76,76,0.62)]',
  },
}

function getToolAccent(categoryIndex: number, skillIndex: number): ToolAccent {
  return TOOL_ACCENTS[(categoryIndex + skillIndex) % TOOL_ACCENTS.length]
}

function DesktopToolStack({
  category,
  lang,
  index,
}: {
  category: SkillCategory
  lang: Lang
  index: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stackVariants}
      className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center py-8 border-b border-white/5 last:border-b-0"
    >
      {/* Left: narrative */}
      <div className={`flex flex-col gap-3 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-color-accent/10 border border-color-accent/20">
            <Terminal className="w-4 h-4 text-color-accent" />
          </div>
          <h3 className="font-bold text-color-tinta text-2xl md:text-3xl uppercase leading-none tracking-tight">
            {category.title[lang]}
          </h3>
        </div>
        <p className="text-xs md:text-sm text-color-accent font-bold uppercase tracking-widest italic opacity-80">
          {category.caption[lang]}
        </p>
        <p className="text-xs md:text-sm text-color-tinta/85 leading-relaxed max-w-xl liquid-glass rounded-xl px-6 py-4 shadow-md">
          {category.narrative[lang]}
        </p>
      </div>

      {/* Right: animated tool pile */}
      <div className={`flex flex-wrap items-center justify-center gap-3 md:gap-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        {category.skills.map((skillId, skillIndex) => {
          const isHighlighted = skillId === category.highlight
          const accent = isHighlighted ? 'cyan' : getToolAccent(index, skillIndex)
          const accentStyles = TOOL_ACCENT_STYLES[accent]
          const rotate = accent === 'red' ? -1 : accent === 'yellow' ? 1 : 0.6

          return (
            <motion.div
              key={skillId}
              variants={chipVariants}
              whileHover={{
                y: -5,
                scale: 1.04,
                rotate,
                transition: { type: 'spring', stiffness: 500, damping: 25 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col items-center gap-2 overflow-hidden rounded-xl px-4 py-4 sm:px-4 sm:py-4 liquid-glass transition-all duration-200 ease-out ${
                isHighlighted
                  ? 'border-color-accent/40 bg-color-accent/[0.04]'
                  : accentStyles.card
              }`}
            >
              <span
                className={`pointer-events-none absolute inset-x-3 top-2 h-px origin-left scale-x-0 rounded-full opacity-0 transition-all duration-150 ease-out group-hover:scale-x-100 group-hover:opacity-100 ${
                  isHighlighted ? 'scale-x-100 opacity-90' : ''
                } ${accentStyles.line}`}
              />

              <TechIcon
                id={skillId}
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-150 ${
                  isHighlighted
                    ? 'text-color-accent'
                    : `text-color-tinta/60 ${accentStyles.icon}`
                }`}
              />
              <span className="text-center text-[0.6rem] font-bold uppercase leading-tight tracking-[0.15em] text-color-tinta/60 transition-colors duration-150 group-hover:text-color-tinta">
                {TECH_LABELS[skillId]}
              </span>

              <span
                className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full transition-all duration-150 ease-out ${
                  isHighlighted
                    ? `scale-100 opacity-100 ${TOOL_ACCENT_STYLES.cyan.dot}`
                    : `scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${accentStyles.dot}`
                }`}
              />
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

function MobileAccordion({
  category,
  lang,
  isOpen,
  onToggle,
}: {
  category: SkillCategory
  lang: Lang
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-color-accent/10 border border-color-accent/20">
            <Terminal className="w-3.5 h-3.5 text-color-accent" />
          </div>
          <h3 className="font-bold text-color-tinta text-xl uppercase leading-none tracking-tight">
            {category.title[lang]}
          </h3>
          {category.highlight && (
            <div className="w-1.5 h-1.5 rounded-full bg-color-accent glow-cyan" />
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center w-7 h-7 rounded-lg liquid-glass"
        >
          <ChevronDown className="w-4 h-4 text-color-accent" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={category.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 space-y-4">
              <p className="text-xs text-color-accent font-bold uppercase tracking-widest opacity-80 italic">
                {category.caption[lang]}
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {category.skills.map((skillId) => (
                  <div
                    key={skillId}
                    className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg liquid-glass transition-colors duration-200 ${
                      skillId === category.highlight
                        ? 'border-color-accent/40'
                        : ''
                    }`}
                  >
                    <TechIcon
                      id={skillId}
                      className={`w-6 h-6 ${
                        skillId === category.highlight
                          ? 'text-color-accent'
                          : 'text-color-tinta/60'
                      }`}
                    />
                    <span className="text-[0.55rem] font-bold uppercase tracking-widest text-color-tinta/60 text-center leading-tight">
                      {TECH_LABELS[skillId]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Herramientas() {
  const { t, lang } = useLanguage()
  const h = t.herramientas
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <section
      id="herramientas"
      className="relative z-10 px-6 py-12 md:py-16 lg:py-20 md:px-12 lg:px-24 flex flex-col items-center overflow-hidden"
    >
      <SectionHeader title={h.title} intro={h.intro} />

      {/* Desktop: workbench layout */}
      <div className="hidden lg:block w-full max-w-6xl mt-12">
        {SKILL_CATEGORIES.map((category, i) => (
          <DesktopToolStack
            key={category.id}
            category={category}
            lang={lang}
            index={i}
          />
        ))}
      </div>

      {/* Mobile: accordion */}
      <div className="lg:hidden w-full max-w-xl mt-10">
        {SKILL_CATEGORIES.map((category, i) => (
          <MobileAccordion
            key={category.id}
            category={category}
            lang={lang}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* Bottom ornament */}
      <div className="flex items-center gap-3 mt-16">
        <span className="h-0.5 w-10 tricolor-separator rounded-full" />
        <div className="w-1.5 h-1.5 rounded-full tricolor-dot" />
        <span className="h-0.5 w-10 tricolor-separator rounded-full" />
      </div>
    </section>
  )
}

export default Herramientas
