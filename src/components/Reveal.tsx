import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Stagger delay in ms — keep stagger increments to 70ms max, per design spec. */
  delay?: number
  /**
   * "fade" (default): the wrapper itself fades up (`.reveal`).
   * "sequence": the wrapper does not animate (`.reveal-seq`); it only gets
   * `.is-visible` so its children (`.seq-rise`, `.seq-fade`, `.seq-fade-up`)
   * can play an orchestrated, `--seq-order`-staggered entrance instead.
   */
  variant?: 'fade' | 'sequence'
}

/**
 * SSR/no-JS-safe scroll reveal.
 *
 * The `.reveal` CSS class (src/index.css) renders content fully visible by
 * default — that's what the prerendered HTML and any no-JS crawler see.
 * Only once the inline bootstrap script in index.html tags <html> with
 * `.js` does the hidden→visible transition apply, driven here by an
 * IntersectionObserver (once: true, ~15% visible).
 */
function Reveal({ children, className = '', delay = 0, variant = 'fade' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${variant === 'sequence' ? 'reveal-seq' : 'reveal'} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

export default Reveal
