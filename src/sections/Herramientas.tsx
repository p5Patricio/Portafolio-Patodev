import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Terminal, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { SKILL_CATEGORIES, type SkillCategory } from '../data/skills'
import SectionHeader from '../components/SectionHeader'
import TechIcon, { TECH_LABELS } from '../components/TechIcon'
import OptionWheel, { type OptionWheelItem } from '../components/OptionWheel'
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

function ActiveCategoryDisplay({
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
      key={category.id}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
    >
      {/* Left: Category Info Card */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-4 liquid-glass rounded-2xl p-6 md:p-8 shadow-xl border border-white/10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-color-accent/10 border border-color-accent/20 text-color-accent shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.6rem] uppercase tracking-[0.25em] text-color-accent font-black">
                {lang === 'es' ? 'Categoría Enfocada' : 'Focused Category'}
              </span>
              <h3 className="font-bold text-color-tinta text-2xl md:text-3xl uppercase leading-none tracking-tight">
                {category.title[lang]}
              </h3>
            </div>
          </div>

          <p className="text-xs md:text-sm text-color-accent-alt font-bold uppercase tracking-widest italic opacity-90 mt-1">
            {category.caption[lang]}
          </p>

          <p className="text-sm md:text-base text-color-tinta/90 leading-relaxed mt-2">
            {category.narrative[lang]}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs text-color-tinta/60">
          <Sparkles className="w-4 h-4 text-color-accent" />
          <span>{category.skills.length} {lang === 'es' ? 'tecnologías en esta área' : 'technologies in this area'}</span>
        </div>
      </div>

      {/* Right: Grid of Tech Icons - floating individual chips without outer card */}
      <motion.div
        variants={stackVariants}
        initial="hidden"
        animate="visible"
        className="lg:col-span-7 flex flex-wrap items-center justify-center gap-3.5 md:gap-5 py-2"
      >
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
                y: -6,
                scale: 1.06,
                rotate,
                transition: { type: 'spring', stiffness: 500, damping: 25 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col items-center gap-2.5 overflow-hidden rounded-xl px-4 py-4 sm:px-5 sm:py-5 liquid-glass transition-all duration-200 ease-out ${
                isHighlighted
                  ? 'border-color-accent/50 bg-color-accent/[0.06] shadow-[0_0_20px_rgba(0,216,240,0.2)]'
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
                className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-150 ${
                  isHighlighted
                    ? 'text-color-accent'
                    : `text-color-tinta/70 ${accentStyles.icon}`
                }`}
              />
              <span className="text-center text-[0.65rem] sm:text-xs font-bold uppercase leading-tight tracking-[0.15em] text-color-tinta/70 transition-colors duration-150 group-hover:text-color-tinta">
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
      </motion.div>
    </motion.div>
  )
}

function Herramientas() {
  const { t, lang } = useLanguage()
  const h = t.herramientas
  const [selectedIndex, setSelectedIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const wheelOptions: OptionWheelItem[] = SKILL_CATEGORIES.map((cat) => ({
    id: cat.id,
    label: cat.title[lang],
    sublabel: `${cat.skills.length} ${lang === 'es' ? 'tecnologías' : 'tools'}`,
  }))

  const activeCategory = SKILL_CATEGORIES[selectedIndex] ?? SKILL_CATEGORIES[0]

  // Track scroll progress for sticky section pinning on desktop
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const count = SKILL_CATEGORIES.length
    const nextIndex = Math.min(count - 1, Math.floor(latest * count))
    if (nextIndex !== selectedIndex) {
      setSelectedIndex(nextIndex)
    }
  })

  return (
    <section id="herramientas" className="relative z-10 w-full overflow-hidden">
      {/* Desktop Sticky Scroll Section: Pinned Wheel Storytelling */}
      <div ref={sectionRef} className="hidden lg:block relative w-full h-[210vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 lg:px-12 overflow-hidden">
          <SectionHeader title={h.title} intro={h.intro} />

          {/* 2-Column Grid: OptionWheel on far left + Focused Category on right */}
          <div className="grid grid-cols-12 gap-6 items-center w-full max-w-7xl mt-2">
            {/* Far Left Column: OptionWheel floating flush without card wrapper */}
            <div className="col-span-4 relative flex flex-col items-start justify-center">
              <div className="flex items-center gap-2 mb-1 text-[0.65rem] uppercase tracking-[0.25em] font-black text-color-accent pl-1">
                <Sparkles className="w-3.5 h-3.5 text-color-accent" />
                <span>{lang === 'es' ? 'Rueda de Categorías' : 'Category Wheel'}</span>
              </div>

              <OptionWheel
                items={wheelOptions}
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                side="left"
                fontSize={2.1}
                spacing={2.6}
                tilt={22}
                curve={1.7}
              />
            </div>

            {/* Center/Right Column: Active Category Display */}
            <div className="col-span-8 flex flex-col w-full">
              <AnimatePresence mode="wait">
                <ActiveCategoryDisplay
                  key={activeCategory.id}
                  category={activeCategory}
                  lang={lang}
                  index={selectedIndex}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet View: Clean Category Tabs + Active View */}
      <div className="lg:hidden w-full px-6 py-12 flex flex-col items-center">
        <SectionHeader title={h.title} intro={h.intro} />

        <div className="flex flex-wrap justify-center gap-2 my-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                idx === selectedIndex
                  ? 'bg-color-accent text-color-papel shadow-[0_0_15px_rgba(0,216,240,0.5)]'
                  : 'liquid-glass text-color-tinta/70 hover:text-white'
              }`}
            >
              {cat.title[lang]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <ActiveCategoryDisplay
            key={activeCategory.id}
            category={activeCategory}
            lang={lang}
            index={selectedIndex}
          />
        </AnimatePresence>
      </div>

      {/* Bottom ornament */}
      <div className="flex items-center justify-center gap-3 my-12">
        <span className="h-0.5 w-10 tricolor-separator rounded-full" />
        <div className="w-1.5 h-1.5 rounded-full tricolor-dot" />
        <span className="h-0.5 w-10 tricolor-separator rounded-full" />
      </div>
    </section>
  )
}

export default Herramientas
