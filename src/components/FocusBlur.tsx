import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface FocusBlurItem {
  id?: string
  label: string
  sublabel?: string
  href?: string
  target?: string
  rel?: string
  icon?: React.ReactNode
  actionIcon?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export interface FocusBlurProps {
  items?: FocusBlurItem[]
  blurAmount?: number
  opacityAmount?: number
  showBrackets?: boolean
  className?: string
  hoverColor?: string
  direction?: 'horizontal' | 'vertical'
}

export default function FocusBlur({
  items = [
    { label: '@Twitter', href: '#' },
    { label: '@Threads', href: '#' },
    { label: '@Instagram', href: '#' },
    { label: '@GitHub', href: '#' },
  ],
  blurAmount = 4,
  opacityAmount = 0.4,
  showBrackets = true,
  className = '',
  hoverColor = '#00D8F0',
  direction = 'vertical',
}: FocusBlurProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const isVertical = direction === 'vertical'

  const containerClasses = isVertical
    ? `flex flex-col gap-3 py-2 px-2 sm:px-3 cursor-default w-full ${className}`
    : `flex flex-wrap justify-center items-center gap-6 py-6 px-10 cursor-default ${className}`

  return (
    <div className={containerClasses}>
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index
        const isAnyHovered = hoveredIndex !== null
        const isInactive = isAnyHovered && !isHovered

        const Component = item.href ? 'a' : 'button'
        const compProps = item.href
          ? {
              href: item.href,
              target: item.target,
              rel: item.rel,
            }
          : {
              type: 'button' as const,
            }

        return (
          <Component
            key={item.id || index}
            {...compProps}
            onClick={item.onClick}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative no-underline transition-all duration-300 select-none outline-none cursor-pointer flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl border border-transparent ${
              isHovered ? 'bg-color-accent/5 border-color-accent/30' : ''
            }`}
            style={{
              filter: isInactive ? `blur(${blurAmount}px)` : 'none',
              opacity: isInactive ? opacityAmount : 1,
              color: isHovered ? hoverColor : 'inherit',
            }}
          >
            {item.icon && (
              <span className="relative z-10 flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-lg bg-color-accent/10 flex items-center justify-center text-color-accent border border-color-accent/20 transition-transform duration-300">
                {item.icon}
              </span>
            )}

            <div className="relative z-10 flex flex-col items-start text-left flex-1 min-w-0">
              {item.sublabel && (
                <span className="text-[0.6rem] uppercase tracking-[0.25em] text-color-accent font-black">
                  {item.sublabel}
                </span>
              )}
              <span className="font-semibold text-xs sm:text-sm md:text-base text-color-tinta truncate w-full">
                {item.label}
              </span>
            </div>

            {item.actionIcon && (
              <span className="relative z-10 flex-shrink-0 text-color-tinta/40 group-hover:text-color-accent transition-colors">
                {item.actionIcon}
              </span>
            )}

            {showBrackets && (
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="absolute inset-0 border-2 border-dashed border-color-accent/60 rounded-xl pointer-events-none z-0"
                  />
                )}
              </AnimatePresence>
            )}
          </Component>
        )
      })}
    </div>
  )
}
