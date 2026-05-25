import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type ImageModalProps = {
  src: string | null
  alt?: string
  onClose: () => void
}

function ImageModal({ src, alt = 'Imagen a pantalla completa', onClose }: ImageModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (src) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [src])

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {src && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          data-testid="image-modal"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-color-papel cursor-zoom-out"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
            className="relative w-full max-w-5xl max-h-full flex items-center justify-center pointer-events-none"
          >
            {/* Image Wrapper */}
            <div className="relative pointer-events-auto">
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-10 h-10 md:w-12 md:h-12 bg-color-accent text-color-papel rounded-full flex items-center justify-center shadow-lg hover:glow-cyan transition-all z-20 group"
                aria-label="Cerrar imagen"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-90" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default ImageModal
