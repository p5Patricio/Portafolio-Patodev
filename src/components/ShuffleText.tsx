import { useState, useEffect, useRef } from 'react'

export interface ShuffleTextProps {
  text: string
  className?: string
  characters?: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: 'start' | 'end' | 'center'
  useOriginalCharsOnly?: boolean
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div'
  loop?: boolean
  loopInterval?: number
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/'

export default function ShuffleText({
  text = '',
  className = '',
  characters = DEFAULT_CHARS,
  speed = 70,
  maxIterations = 12,
  sequential = true,
  tag: Tag = 'h1',
  loop = true,
  loopInterval = 4000,
}: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const isHoveredRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const triggerShuffle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    let iteration = 0
    const length = text.length

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '

            if (sequential) {
              const currentProgress = (iteration / maxIterations) * length
              if (index < currentProgress) {
                return text[index]
              }
            } else if (iteration >= maxIterations) {
              return text[index]
            }

            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      })

      iteration += 1

      if (iteration > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(text)
      }
    }, speed)
  }

  useEffect(() => {
    triggerShuffle()

    if (loop) {
      const loopTimer = setInterval(() => {
        triggerShuffle()
      }, loopInterval)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        clearInterval(loopTimer)
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, speed, maxIterations, loop, loopInterval])

  return (
    <Tag
      className={className}
      onMouseEnter={() => {
        if (!isHoveredRef.current) {
          isHoveredRef.current = true
          triggerShuffle()
        }
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
      }}
    >
      {displayText}
    </Tag>
  )
}
