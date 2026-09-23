import { useEffect, useRef, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export type MobileMenuItem = {
  id: string
  href: string
  label: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  items: MobileMenuItem[]
  closeAriaLabel: string
  /** Element to return focus to once the menu closes (the trigger button). */
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Full-screen mobile/tablet nav overlay. Traps focus, closes on Escape,
 * locks body scroll while open, and returns focus to the trigger button
 * on close — standard modal a11y pattern (native <dialog> isn't used here
 * because we need custom enter/exit styling driven by `isOpen`, not the
 * top-layer).
 */
function MobileMenu({ isOpen, onClose, items, closeAriaLabel, returnFocusRef }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    const triggerEl = returnFocusRef.current
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      triggerEl?.focus()
    }
  }, [isOpen, onClose, returnFocusRef])

  if (typeof document === 'undefined' || !isOpen) return null

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col bg-ink"
    >
      <div className="flex items-center justify-end px-4 py-5 md:px-6">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={closeAriaLabel}
          className="relative inline-flex min-h-11 min-w-11 items-center justify-center text-paper outline-none transition-colors hover:text-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-6 pb-16 md:px-12">
        <ol className="flex flex-col gap-1">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-3 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2"
              >
                <span aria-hidden="true" className="mono-label text-xs text-sky">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-stretch-wide text-[clamp(2rem,8vw,3.5rem)] font-extrabold tracking-[-0.03em] text-paper transition-colors group-hover:text-sky">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>,
    document.body,
  )
}

export default MobileMenu
