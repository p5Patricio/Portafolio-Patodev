import { motion } from 'framer-motion'

type Size = 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<Size, string> = {
  sm: 'text-4xl md:text-6xl lg:text-7xl',
  md: 'text-5xl md:text-7xl lg:text-[8rem]',
  lg: 'text-6xl md:text-8xl lg:text-[9rem]',
  xl: 'text-6xl md:text-9xl lg:text-[10rem]',
}

type SectionHeaderProps = {
  title: string
  /** Size for the title text */
  size?: Size
  /** Optional intro text rendered below the divider */
  intro?: string
  /** Extra delay (seconds) for the intro paragraph animation */
  introDelay?: number
}

/**
 * Elegant CyberDuck section header.
 * Uses a looser geometric display face with a gradient accent.
 */
function SectionHeader({
  title,
  size = 'md',
  intro,
  introDelay = 0.2,
}: SectionHeaderProps) {
  return (
    <>
      {/* Title + Elegant Accent */}
      <div className="relative flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className={`font-display text-white ${SIZE_MAP[size]} uppercase leading-[0.92] tracking-display text-center`}
        >
          {title}
        </motion.h2>

        {/* Tri-color Accent Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '140px', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="flex items-center gap-4 mt-10"
        >
          <span className="h-0.5 flex-1 tricolor-separator rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full tricolor-dot" />
          <span className="h-0.5 flex-1 tricolor-separator rounded-full" />
        </motion.div>
      </div>

      {/* Intro paragraph with Elegant Glassmorphism */}
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: introDelay }}
          className="max-w-2xl mt-16 text-center text-color-tinta/90 text-fluid-body glass-card rounded-[2rem] px-10 py-8 shadow-2xl"
        >
          {intro}
        </motion.p>
      )}
    </>
  )
}

export default SectionHeader
