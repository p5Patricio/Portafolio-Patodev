import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProjectIllustration from './ProjectIllustration'

type Props = {
  images?: string[]
  title: string
  repoId?: string
  /** Milliseconds between auto-advance. Pass 0 to disable auto-play. */
  autoPlayMs?: number
}

function ProjectCarousel({ images = [], title, repoId = '', autoPlayMs = 5000 }: Props) {
  const [index, setIndex] = useState(0)
  const hasImages = images.length > 0
  const multiple = images.length > 1

  const safeIndex = images.length > 0 ? Math.min(index, images.length - 1) : 0

  useEffect(() => {
    if (!multiple || !autoPlayMs) return
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      autoPlayMs,
    )
    return () => window.clearInterval(timer)
  }, [images.length, multiple, autoPlayMs])

  const go = (delta: number) => {
    setIndex((i) => (i + delta + images.length) % images.length)
  }

  if (!hasImages) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#090a0d] border-b border-white/10">
        <ProjectIllustration id={repoId} className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden group/carousel bg-[#090a0d]">
      <AnimatePresence mode="wait">
        <motion.img
          key={safeIndex}
          src={images[safeIndex]}
          alt={`${title} — ${safeIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={900}
          height={506}
          onError={(e) => {
            // Fallback to SVG vector illustration if image file fails to load
            e.currentTarget.style.display = 'none'
          }}
        />
      </AnimatePresence>

      {/* Fallback Vector background rendered underneath img */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <ProjectIllustration id={repoId} className="w-full h-full object-cover" />
      </div>

      {multiple && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-color-papel/80 text-color-tinta/80 hover:text-color-tinta opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Siguiente imagen"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-color-papel/80 text-color-tinta/80 hover:text-color-tinta opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir a la imagen ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === safeIndex
                    ? 'bg-color-tinta w-5'
                    : 'bg-color-tinta/40 w-1.5 hover:bg-color-tinta/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectCarousel
