import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { SKILL_CATEGORIES, type SkillCategory } from '../data/skills'
import SectionHeader from '../components/SectionHeader'
import TechIcon, { TECH_LABELS } from '../components/TechIcon'
import type { Lang } from '../data/translations'

import { Terminal } from 'lucide-react'

// ---------- Desktop: animated tool stack ----------

const stackVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: 'easeOut' },
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
      'hover:border-color-accent/50 hover:bg-color-accent/[0.055] hover:shadow-[0_18px_44px_-24px_rgba(0,216,240,0.76)]',
    icon: 'group-hover:text-color-accent',
    line: 'bg-color-accent shadow-[0_0_16px_rgba(0,216,240,0.48)]',
    dot: 'bg-color-accent shadow-[0_0_16px_rgba(0,216,240,0.62)]',
  },
  yellow: {
    card:
      'hover:border-color-accent-alt/50 hover:bg-color-accent-alt/[0.055] hover:shadow-[0_18px_44px_-24px_rgba(255,220,60,0.72)]',
    icon: 'group-hover:text-color-accent-alt',
    line: 'bg-color-accent-alt shadow-[0_0_16px_rgba(255,220,60,0.48)]',
    dot: 'bg-color-accent-alt shadow-[0_0_16px_rgba(255,220,60,0.62)]',
  },
  red: {
    card:
      'hover:border-color-danger/50 hover:bg-color-danger/[0.055] hover:shadow-[0_18px_44px_-24px_rgba(255,76,76,0.7)]',
    icon: 'group-hover:text-color-danger',
    line: 'bg-color-danger shadow-[0_0_16px_rgba(255,76,76,0.48)]',
    dot: 'bg-color-danger shadow-[0_0_16px_rgba(255,76,76,0.62)]',
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
      viewport={{ once: true, amount: 0.25 }}
      variants={stackVariants}
      className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 border-b border-white/5 last:border-b-0"
    >
      {/* Left: narrative */}
      <div className={`flex flex-col gap-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-color-accent/10 border border-color-accent/20">
            <Terminal className="w-5 h-5 text-color-accent" />
          </div>
          <h3 className="font-black text-color-tinta text-3xl md:text-4xl uppercase leading-none tracking-tight">
            {category.title[lang]}
          </h3>
        </div>
        <p className="text-sm md:text-base text-color-accent font-bold uppercase tracking-widest italic opacity-80">
          {category.caption[lang]}
        </p>
        <p className="text-sm md:text-[1.05rem] text-color-tinta/80 leading-relaxed max-w-xl glass-card rounded-2xl px-8 py-6 shadow-xl">
          {category.narrative[lang]}
        </p>
      </div>

      {/* Right: animated tool pile */}
      <div className={`flex flex-wrap items-center justify-center gap-4 md:gap-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        {category.skills.map((skillId, skillIndex) => {
          const isHighlighted = skillId === category.highlight
          const accent = isHighlighted ? 'cyan' : getToolAccent(index, skillIndex)
          const accentStyles = TOOL_ACCENT_STYLES[accent]
          const rotate = accent === 'red' ? -1.2 : accent === 'yellow' ? 1.2 : 0.8

          return (
            <motion.div
              key={skillId}
              variants={chipVariants}
              whileHover={{
                y: -7,
                scale: 1.045,
                rotate,
                transition: { type: 'spring', stiffness: 520, damping: 28, mass: 0.55 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl px-4 py-5 sm:px-5 sm:py-6 glass-card transition-[border-color,background-color,box-shadow] duration-150 ease-out will-change-transform ${
                isHighlighted
                  ? 'border-color-accent/45 bg-color-accent/[0.04] shadow-[0_16px_42px_-24px_rgba(0,216,240,0.72)]'
                  : accentStyles.card
              }`}
            >
              <span
                className={`pointer-events-none absolute inset-x-4 top-3 h-px origin-left scale-x-0 rounded-full opacity-0 transition-all duration-150 ease-out group-hover:scale-x-100 group-hover:opacity-100 ${
                  isHighlighted ? 'scale-x-100 opacity-90' : ''
                } ${accentStyles.line}`}
              />

              <TechIcon
                id={skillId}
                className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-150 ${
                  isHighlighted
                    ? 'text-color-accent'
                    : `text-color-tinta/60 ${accentStyles.icon}`
                }`}
              />
              <span className="text-center text-[0.65rem] font-bold uppercase leading-tight tracking-[0.2em] text-color-tinta/50 transition-colors duration-150 group-hover:text-color-tinta sm:text-[0.7rem]">
                {TECH_LABELS[skillId]}
              </span>

              <span
                className={`absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full transition-all duration-150 ease-out ${
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

// ---------- Mobile: accordion with ink reveal ----------

const accordionContentVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

const inkStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

const inkItem: Variants = {
  hidden: { opacity: 0, scaleY: 0, originY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
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
        className="w-full flex items-center justify-between py-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-color-accent/10 border border-color-accent/20">
            <Terminal className="w-4 h-4 text-color-accent" />
          </div>
          <h3 className="font-black text-color-tinta text-2xl uppercase leading-none tracking-tight">
            {category.title[lang]}
          </h3>
          {category.highlight && (
            <div className="w-2 h-2 rounded-full bg-color-accent glow-cyan" />
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center w-8 h-8 rounded-lg glass-card"
        >
          <ChevronDown className="w-5 h-5 text-color-accent" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={category.id}
            variants={accordionContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="pb-8 space-y-5">
              <p className="text-sm text-color-accent font-bold uppercase tracking-widest opacity-80 italic">
                {category.caption[lang]}
              </p>

              <motion.ul
                variants={inkStagger}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-3 pt-2"
              >
                {category.skills.map((skillId) => (
                  <motion.li
                    key={skillId}
                    variants={inkItem}
                    className={`group relative flex flex-col items-center gap-2 px-3 py-4 rounded-xl glass-card transition-colors duration-300 ${
                      skillId === category.highlight
                        ? 'border-color-accent/40 shadow-[0_0_15px_rgba(34,213,224,0.1)]'
                        : ''
                    }`}
                  >
                    <TechIcon
                      id={skillId}
                      className={`w-7 h-7 ${
                        skillId === category.highlight
                          ? 'text-color-accent'
                          : 'text-color-tinta/60'
                      }`}
                    />
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest text-color-tinta/50 text-center leading-tight">
                      {TECH_LABELS[skillId]}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------- Section ----------

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
      className="relative z-10 px-6 py-28 md:py-32 lg:py-36 md:px-12 lg:px-24 flex flex-col items-center overflow-hidden"
    >
      {/* Background handled by ScrollBackground component */}

      <SectionHeader title={h.title} intro={h.intro} />

      {/* Desktop: workbench layout */}
      <div className="hidden lg:block w-full max-w-6xl mt-24">
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
      <div className="lg:hidden w-full max-w-xl mt-16">
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
      <div className="flex items-center gap-4 mt-24">
        <span className="h-0.5 w-12 tricolor-separator rounded-full" />
        <div className="w-2 h-2 rounded-full tricolor-dot" />
        <span className="h-0.5 w-12 tricolor-separator rounded-full" />
      </div>
    </section>
  )
}

export default Herramientas
