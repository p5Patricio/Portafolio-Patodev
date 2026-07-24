import { motion, type HTMLMotionProps } from 'framer-motion'
import { useMemo } from 'react'

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number // delay between characters in ms
  duration?: number // duration of each letter animation in seconds
  splitType?: 'chars' | 'words'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  textAlign?: 'left' | 'center' | 'right'
  onComplete?: () => void
}

export default function SplitText({
  text = '',
  className = '',
  delay = 35,
  duration = 0.55,
  splitType = 'chars',
  tag: Tag = 'h2',
  textAlign = 'center',
  onComplete,
}: SplitTextProps) {
  const items = useMemo(() => {
    if (splitType === 'words') {
      return text.split(' ')
    }
    return text.split('')
  }, [text, splitType])

  const MotionTag = motion[Tag as keyof typeof motion] as React.ComponentType<HTMLMotionProps<any>>

  return (
    <MotionTag
      className={`inline-flex flex-wrap items-center ${
        textAlign === 'center'
          ? 'justify-center text-center'
          : textAlign === 'right'
          ? 'justify-end text-right'
          : 'justify-start text-left'
      } ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onAnimationComplete={onComplete}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration,
                delay: i * (delay / 1000),
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className={
            splitType === 'words'
              ? 'mr-[0.25em] inline-block'
              : item === ' '
              ? 'mr-[0.25em] inline-block'
              : 'inline-block'
          }
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </MotionTag>
  )
}
