import { motion } from 'framer-motion'
import { useState } from 'react'
import { GraduationCap, Briefcase, ImageIcon, Award, type LucideIcon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SectionHeader from '../components/SectionHeader'
import ImageModal from '../components/ImageModal'

type TimelineEntry = {
  id: string
  icon: LucideIcon
  image: string | null
}

const ENTRIES: TimelineEntry[] = [
  {
    id: 'universidad',
    icon: GraduationCap,
    image: '/titulo.webp',
  },
  {
    id: 'mazda',
    icon: Briefcase,
    image: '/mazda-new-logo.jpg',
  },
]

const CERTIFICACIONES = [
  { id: 'ia', image: '/certificacion-ia.webp' }
]

type ImageSlotProps = {
  src: string | null
  alt: string
  placeholderLabel: string
  position?: string
  onClick?: () => void
}

function ImageSlot({ src, alt, placeholderLabel, position = 'center', onClick }: ImageSlotProps) {
  return (
    <div 
      className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass-card shadow-2xl ${onClick && src ? 'cursor-zoom-in hover:glow-cyan transition-all duration-300 group' : ''}`}
      onClick={() => { if (onClick && src) onClick() }}
    >
      {/* Hover overlay for zoom icon */}
      {onClick && src && (
        <div className="absolute inset-0 bg-color-accent/0 group-hover:bg-color-accent/5 transition-colors duration-300 z-20 flex items-center justify-center">
          <motion.div 
            initial={false}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-color-accent/80 p-3 rounded-xl backdrop-blur-md shadow-lg"
          >
            <ImageIcon className="w-6 h-6 text-color-papel" />
          </motion.div>
        </div>
      )}

      {/* Decorative accent lines */}
      <div className="absolute inset-4 border border-color-accent/10 rounded-xl pointer-events-none z-10" />

      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain p-6"
          style={{ objectPosition: position }}
          loading="lazy"
        />
      ) : (
        // Placeholder
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-color-accent/5">
          <ImageIcon
            aria-hidden="true"
            className="w-10 h-10 text-color-accent/30"
            strokeWidth={1.5}
          />
          <span className="text-[0.65rem] uppercase tracking-widest text-color-accent/40 font-bold">
            {placeholderLabel}
          </span>
        </div>
      )}

      {/* Modern accent in corner */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-color-accent glow-cyan rounded-full z-10" />
    </div>
  )
}

type TimelineCardProps = {
  index: number
  align: 'left' | 'right'
  icon: LucideIcon
  period: string
  title: string
  institution: string
  description: string
  image: string | null
  imageAlt: string
  placeholderLabel: string
  imagePosition?: string
  onImageClick?: () => void
}

function TimelineCard({
  index,
  align,
  icon: Icon,
  period,
  title,
  institution,
  description,
  image,
  imageAlt,
  placeholderLabel,
  imagePosition,
  onImageClick,
}: TimelineCardProps) {
  const desktopOrder =
    align === 'left'
      ? 'lg:flex-row-reverse'
      : 'lg:flex-row'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.33, 1, 0.68, 1] }}
      className={`relative flex flex-col gap-8 ${desktopOrder} lg:flex-row lg:items-stretch lg:gap-12`}
    >
      <div
        className={`relative w-full lg:w-[46%] pl-16 lg:pl-0 ${
          align === 'left' ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'
        }`}
      >
        <div className={`glass-card rounded-2xl px-8 py-7 h-full flex flex-col justify-center shadow-xl ${index % 3 === 0 ? 'hover:glow-cyan' : index % 3 === 1 ? 'hover:shadow-[0_0_25px_rgba(255,220,60,0.15)] hover:border-color-accent-alt/40' : 'hover:shadow-[0_0_25px_rgba(255,76,76,0.15)] hover:border-color-danger/40'} transition-all duration-300`}>
          <span className={`inline-block text-xs md:text-sm uppercase tracking-[0.4em] ${index % 3 === 0 ? 'text-color-accent' : index % 3 === 1 ? 'text-color-accent-alt' : 'text-color-danger'} font-black mb-4`}>
            {period}
          </span>

          <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl text-color-tinta uppercase leading-tight tracking-tight">
            {title}
          </h3>

          <p className={`mt-3 text-sm ${index % 3 === 1 ? 'text-color-accent' : index % 3 === 2 ? 'text-color-accent-alt' : 'text-color-accent'} font-bold uppercase tracking-widest opacity-80 italic`}>
            {institution}
          </p>

          <p className="mt-6 text-color-tinta text-fluid-body leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div
        className={`w-full lg:w-[46%] pl-16 lg:pl-0 ${
          align === 'left' ? 'lg:pl-12' : 'lg:pr-12'
        }`}
      >
        <ImageSlot
          src={image}
          alt={imageAlt}
          placeholderLabel={placeholderLabel}
          position={imagePosition}
          onClick={onImageClick}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10"
      >
        <div className="relative w-11 h-11 rounded-xl glass-card flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 hover:glow-cyan">
          <Icon className="w-5 h-5 text-color-accent" strokeWidth={2} />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-color-accent glow-cyan border border-color-papel" />
        </div>
      </div>
    </motion.div>
  )
}

function MinimalTimelineCard({
  index,
  align,
  icon: Icon,
  period,
  title,
  institution,
  buttonLabel,
  onButtonClick,
}: {
  index: number
  align: 'left' | 'right'
  icon: LucideIcon
  period: string
  title: string
  institution: string
  buttonLabel: string
  onButtonClick: () => void
}) {
  const desktopOrder = align === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      className={`relative flex flex-col gap-6 ${desktopOrder} lg:flex-row lg:items-center lg:gap-10`}
    >
      <div
        className={`relative w-full lg:w-[46%] pl-16 lg:pl-0 ${
          align === 'left' ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'
        }`}
      >
        <div className="glass-card rounded-xl px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-white/5 w-full hover:glow-cyan transition-all duration-300 shadow-lg">
          <div className={`${align === 'left' ? 'sm:text-right' : 'sm:text-left'} text-left flex-1`}>
            <span className="block text-[0.65rem] uppercase tracking-[0.4em] text-color-accent font-black mb-2">
              {period}
            </span>
            <h3 className="font-bold text-xl text-color-tinta uppercase tracking-tight">{title}</h3>
            <p className="text-xs text-color-accent font-bold uppercase tracking-widest opacity-70 italic mt-1">{institution}</p>
          </div>
          <button
            onClick={onButtonClick}
            className="text-[0.65rem] uppercase tracking-[0.25em] font-black text-color-papel bg-color-accent hover:glow-cyan transition-all rounded-lg px-5 py-2.5 shrink-0"
          >
            {buttonLabel}
          </button>
        </div>
      </div>

      <div className="hidden lg:block lg:w-[46%]" />

      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 z-10"
      >
        <div className="relative w-9 h-9 rounded-xl glass-card flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 hover:glow-cyan">
          <Icon className="w-4 h-4 text-color-accent" strokeWidth={2} />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-color-accent glow-cyan border border-color-papel" />
        </div>
      </div>
    </motion.div>
  )
}

function Experiencia() {
  const { t } = useLanguage()
  const e = t.experiencia
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  return (
    <section
      id="experiencia"
      className="relative z-10 min-h-screen px-6 py-12 md:py-16 lg:py-20 md:px-12 lg:px-24 flex flex-col items-center overflow-hidden"
    >
      <div className="relative z-10 w-full flex flex-col items-center">
        <SectionHeader title={e.title} intro={e.intro} />

      <div className="relative w-full max-w-5xl mt-24">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-5 lg:left-1/2 lg:-translate-x-1/2 w-0.5 tricolor-separator-y rounded-full"
        />

        <div className="flex flex-col gap-24 lg:gap-32">
          {ENTRIES.map((entry, i) => {
            const item = e.items[i]
            if (!item) return null
            const canExpandImage = entry.id !== 'mazda'
            return (
              <TimelineCard
                key={entry.id}
                index={i}
                align={i % 2 === 0 ? 'right' : 'left'}
                icon={entry.icon}
                period={item.period}
                title={item.title}
                institution={item.institution}
                description={item.description}
                image={entry.image}
                imageAlt={item.title}
                placeholderLabel={e.placeholderImage}
                imagePosition={entry.id === 'universidad' ? 'top' : 'center'}
                onImageClick={canExpandImage ? () => setSelectedImg(entry.image) : undefined}
              />
            )
          })}
          
          {e.certificaciones.map((cert, j) => (
            <MinimalTimelineCard
              key={`cert-${j}`}
              index={ENTRIES.length + j}
              align={(ENTRIES.length + j) % 2 === 0 ? 'right' : 'left'}
              icon={Award}
              period={cert.period}
              title={cert.name}
              institution={cert.institution}
              buttonLabel={e.viewCert}
              onButtonClick={() => setSelectedImg(CERTIFICACIONES[j].image)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-28">
        <span className="h-0.5 w-12 tricolor-separator rounded-full" />
        <div className="w-2 h-2 rounded-full tricolor-dot" />
        <span className="h-0.5 w-12 tricolor-separator rounded-full" />
      </div>
      </div>

      <ImageModal src={selectedImg} onClose={() => setSelectedImg(null)} />
    </section>
  )
}

export default Experiencia
