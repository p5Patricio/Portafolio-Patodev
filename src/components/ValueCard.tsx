import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  title: string
  description: string
  index?: number
}

/**
 * Elegant CyberDuck Value Card.
 * Uses a tri-color corner accent and sophisticated glassmorphism.
 */
function ValueCard({ icon: Icon, title, description, index = 0 }: Props) {
  // Use different accents based on index to balance colors
  const accents = ['bg-color-accent', 'bg-color-accent-alt', 'bg-color-danger']
  const accentClass = accents[index % accents.length]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center text-center gap-7 px-4"
    >
      <div className="relative group">
        {/* Elegant Square/Circle hybrid container */}
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:border-white/20"
        >
          <Icon className="w-10 h-10 text-white opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
        </motion.div>
        
        {/* Tri-color corner pixel (The iconic touch) */}
        <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 ${accentClass} rotate-45 shadow-lg`} />
      </div>

      <div className="space-y-3">
        <h3 className="text-color-tinta text-base font-black uppercase tracking-[0.25em]">
          {title}
        </h3>
        <p className="text-color-tinta/90 text-sm leading-relaxed max-w-[16rem]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default ValueCard
