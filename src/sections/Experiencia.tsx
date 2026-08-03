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
  { id: 'ia-profesional', image: '/certificacion-ia.webp' },
  { id: 'tecnm-ia', image: '/cert-tecnm-ia.webp' },
  { id: 'mouredev-ia', image: '/cert-mouredev-ia.webp' },
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
      className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden liquid-glass shadow-lg ${onClick && src ? 'cursor-zoom-in hover:border-color-accent/50 transition-all duration-300 group' : ''}`}
      onClick={() => { if (onClick && src) onClick() }}
    >
      {onClick && src && (
        <div className="absolute inset-0 bg-color-accent/0 group-hover:bg-color-accent/5 transition-colors duration-300 z-20 flex items-center justify-center">
          <motion.div 
            initial={false}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-color-accent/80 p-2 rounded-lg backdrop-blur-md shadow-md"
          >
            <ImageIcon className="w-4 h-4 text-color-papel" />
          </motion.div>
        </div>
      )}

      <div className="absolute inset-2 border border-white/10 rounded-lg pointer-events-none z-10" />

      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain p-3"
          style={{ objectPosition: position }}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-white/[0.02]">
          <ImageIcon
            aria-hidden="true"
            className="w-6 h-6 text-color-accent/40"
            strokeWidth={1.5}
          />
          <span className="text-[0.55rem] uppercase tracking-widest text-color-accent/50 font-bold">
            {placeholderLabel}
          </span>
        </div>
      )}

      <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-color-accent glow-cyan rounded-full z-10" />
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className={`relative flex flex-col gap-4 ${desktopOrder} lg:flex-row lg:items-stretch lg:gap-6`}
    >
      <div
        className={`relative w-full lg:w-[48%] pl-10 lg:pl-0 ${
          align === 'left' ? 'lg:pr-6 lg:text-right' : 'lg:pl-6 lg:text-left'
        }`}
      >
        <div className="liquid-glass rounded-xl px-5 py-5 md:px-7 md:py-6 h-full flex flex-col justify-center shadow-lg transition-all duration-300 hover:border-color-accent/40">
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.2em] text-color-accent font-black mb-1.5">
            {period}
          </span>

          <h3 className="font-bold text-xl md:text-2xl text-color-tinta uppercase leading-tight tracking-tight">
            {title}
          </h3>

          <p className="mt-1 text-xs md:text-sm text-color-accent-alt font-bold uppercase tracking-widest opacity-95 italic">
            {institution}
          </p>

          <p className="mt-3 text-color-tinta/90 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div
        className={`w-full lg:w-[48%] pl-10 lg:pl-0 ${
          align === 'left' ? 'lg:pl-6' : 'lg:pr-6'
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
        <div className="relative w-8 h-8 rounded-lg liquid-glass flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110 hover:border-color-accent/50">
          <Icon className="w-3.5 h-3.5 text-color-accent" strokeWidth={2} />
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-color-accent glow-cyan border border-color-papel" />
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className={`relative flex flex-col gap-3 ${desktopOrder} lg:flex-row lg:items-center lg:gap-6`}
    >
      <div
        className={`relative w-full lg:w-[48%] pl-10 lg:pl-0 ${
          align === 'left' ? 'lg:pr-6 lg:text-right' : 'lg:pl-6 lg:text-left'
        }`}
      >
        <div className="liquid-glass rounded-xl px-5 py-4 md:px-6 md:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 w-full hover:border-color-accent/40 transition-all duration-300 shadow-md">
          <div className={`${align === 'left' ? 'sm:text-right' : 'sm:text-left'} text-left flex-1`}>
            <span className="block text-xs uppercase tracking-[0.2em] text-color-accent font-black mb-1">
              {period}
            </span>
            <h3 className="font-bold text-base md:text-lg text-color-tinta uppercase tracking-tight leading-snug">{title}</h3>
            <p className="text-xs md:text-sm text-color-accent-alt font-bold uppercase tracking-widest opacity-90 italic mt-1">{institution}</p>
          </div>
          <button
            onClick={onButtonClick}
            className="text-xs uppercase tracking-[0.18em] font-black text-color-papel bg-color-accent hover:glow-cyan transition-all rounded-md px-3.5 py-2 shrink-0 cursor-pointer"
          >
            {buttonLabel}
          </button>
        </div>
      </div>

      <div className="hidden lg:block lg:w-[48%]" />

      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 z-10"
      >
        <div className="relative w-7 h-7 rounded-lg liquid-glass flex items-center justify-center shadow-sm transition-transform duration-300 hover:scale-110 hover:border-color-accent/50">
          <Icon className="w-3 h-3 text-color-accent" strokeWidth={2} />
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-color-accent glow-cyan border border-color-papel" />
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
      className="relative z-10 min-h-screen px-6 py-8 md:py-12 lg:py-14 md:px-12 lg:px-24 flex flex-col items-center overflow-hidden"
    >
      <div className="relative z-10 w-full flex flex-col items-center">
        <SectionHeader title={e.title} intro={e.intro} />

        <div className="relative w-full max-w-5xl mt-10">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-3.5 lg:left-1/2 lg:-translate-x-1/2 w-0.5 tricolor-separator-y rounded-full"
          />

          <div className="flex flex-col gap-8 lg:gap-10">
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
                onButtonClick={() => setSelectedImg(CERTIFICACIONES[j]?.image ?? null)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-12">
          <span className="h-0.5 w-10 tricolor-separator rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full tricolor-dot" />
          <span className="h-0.5 w-10 tricolor-separator rounded-full" />
        </div>
      </div>

      <ImageModal src={selectedImg} onClose={() => setSelectedImg(null)} />
    </section>
  )
}

export default Experiencia
