import React, { useRef, useEffect, useCallback } from 'react'

export interface ClickSparkProps {
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
  extraScale?: number
  children?: React.ReactNode
}

interface Spark {
  x: number
  y: number
  angle: number
  startTime: number
}

export default function ClickSpark({
  sparkColor = '#22d5e0',
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sparksRef = useRef<Spark[]>([])
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    let resizeObserver: ResizeObserver | undefined
    const updateCanvasSize = () => {
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(updateCanvasSize)
      resizeObserver.observe(parent)
    } else {
      updateCanvasSize()
      window.addEventListener('resize', updateCanvasSize)
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener('resize', updateCanvasSize)
      }
    }
  }, [])

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t
        case 'ease-in':
          return t * t
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        case 'ease-out':
        default:
          return t * (2 - t)
      }
    },
    [easing],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animationFrameId: number

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) return false

        const progress = elapsed / duration
        const eased = easeFunc(progress)
        const distance = eased * sparkRadius * extraScale
        const lineLength = sparkSize * (1 - eased)

        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.stroke()

        return true
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [sparkColor, sparkSize, sparkRadius, duration, easeFunc, extraScale])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const now = performance.now()
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }))

    sparksRef.current.push(...newSparks)
  }

  return (
    <div
      className="relative w-full min-h-full"
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[9999]"
      />
      {children}
    </div>
  )
}
