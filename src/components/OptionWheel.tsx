import React, { useRef, useState, useCallback, useEffect } from 'react'

export interface OptionWheelItem {
  id: string
  label: string
  sublabel?: string
}

export interface OptionWheelProps {
  items: OptionWheelItem[]
  defaultSelected?: number
  selectedIndex?: number
  onChange?: (index: number) => void
  textColor?: string
  activeColor?: string
  side?: 'left' | 'right'
  fontSize?: number
  spacing?: number
  curve?: number
  tilt?: number
  blur?: number
  fade?: number
  minOpacity?: number
  smoothing?: number
  loop?: boolean
  draggable?: boolean
  className?: string
}

export default function OptionWheel({
  items,
  defaultSelected = 0,
  selectedIndex,
  onChange,
  textColor = 'rgba(255, 255, 255, 0.45)',
  activeColor = '#00D8F0',
  side = 'left',
  fontSize = 2.0,
  spacing = 2.4,
  curve = 1.6,
  tilt = 20,
  blur = 2.5,
  fade = 0.35,
  minOpacity = 0.08,
  smoothing = 180,
  loop = false,
  draggable = true,
  className = '',
}: OptionWheelProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeIndex = selectedIndex !== undefined ? selectedIndex : defaultSelected

  const posRef = useRef(activeIndex)
  const targetRef = useRef(activeIndex)
  const lastRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const onChangeRef = useRef(onChange)
  const isDraggingRef = useRef(false)
  const dragStartYRef = useRef(0)
  const dragStartPosRef = useRef(0)

  const [currentSelected, setCurrentSelected] = useState(activeIndex)

  onChangeRef.current = onChange

  // Sync targetRef when controlled prop selectedIndex changes
  useEffect(() => {
    if (selectedIndex !== undefined && Math.abs(selectedIndex - targetRef.current) > 0.01) {
      targetRef.current = selectedIndex
    }
  }, [selectedIndex])

  const remPx = typeof window !== 'undefined'
    ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    : 16

  const rowH = Math.max(fontSize * spacing * remPx, 1)

  // Single rAF loop for frame-rate independent exponential smoothing and 3D curved layout
  const runFrame = useCallback((now: number) => {
    if (!lastRef.current) lastRef.current = now
    const dt = Math.min((now - lastRef.current) / 1000, 0.05)
    lastRef.current = now

    const tau = Math.max(smoothing, 1) / 1000
    const k = 1 - Math.exp(-dt / tau)

    const target = targetRef.current
    const cur = posRef.current
    let next = cur + (target - cur) * k
    if (Math.abs(target - next) < 0.001) next = target
    posRef.current = next

    // Check integer index change for callback
    const rounded = Math.round(next)
    const count = items.length
    const boundedIndex = loop ? ((rounded % count) + count) % count : Math.max(0, Math.min(count - 1, rounded))
    if (boundedIndex !== currentSelected) {
      setCurrentSelected(boundedIndex)
      onChangeRef.current?.(boundedIndex)
    }

    const els = itemRefs.current
    const mirror = side === 'right' ? -1 : 1
    const tiltRad = (tilt * Math.PI) / 180
    const R = tiltRad > 0.0005 ? rowH / tiltRad : 0

    for (let i = 0; i < count; i++) {
      const el = els[i]
      if (!el) continue

      let d = i - next
      if (loop && count > 1) {
        d = ((d % count) + count) % count
        if (d > count / 2) d -= count
      }

      const dist = Math.abs(d)
      let x = 0
      let y = d * rowH
      let rot = 0

      if (R > 0) {
        const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad))
        y = R * Math.sin(ang)
        x = -mirror * R * (1 - Math.cos(ang)) * curve
        rot = (ang * 180) / Math.PI * mirror
      }

      const scale = Math.max(0.68, 1 - dist * 0.12)
      const op = Math.max(minOpacity, Math.pow(Math.max(0, 1 - dist * fade), 2))
      const blurVal = Math.min(dist * blur, 10)

      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`
      el.style.opacity = op.toFixed(3)
      el.style.filter = blurVal > 0.1 ? `blur(${blurVal.toFixed(1)}px)` : 'none'
      el.style.color = dist < 0.35 ? activeColor : textColor
      el.style.zIndex = `${100 - Math.round(dist * 10)}`
    }

    rafRef.current = requestAnimationFrame(runFrame)
  }, [items.length, side, tilt, curve, rowH, smoothing, loop, fade, blur, minOpacity, activeColor, textColor, currentSelected])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(runFrame)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [runFrame])

  // Mouse wheel scroll listener
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = Math.sign(e.deltaY)
    const count = items.length
    let nextTarget = targetRef.current + delta
    if (!loop) {
      nextTarget = Math.max(0, Math.min(count - 1, nextTarget))
    }
    targetRef.current = nextTarget
  }, [items.length, loop])

  // Pointer Drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return
    isDraggingRef.current = true
    dragStartYRef.current = e.clientY
    dragStartPosRef.current = targetRef.current
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    const dy = e.clientY - dragStartYRef.current
    const deltaItems = -dy / rowH
    let nextTarget = dragStartPosRef.current + deltaItems
    const count = items.length
    if (!loop) {
      nextTarget = Math.max(0, Math.min(count - 1, nextTarget))
    }
    targetRef.current = nextTarget
  }

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    targetRef.current = Math.round(targetRef.current)
  }

  const handleItemClick = (index: number) => {
    targetRef.current = index
    if (index !== currentSelected) {
      setCurrentSelected(index)
      onChangeRef.current?.(index)
    }
  }

  return (
    <div
      ref={rootRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`relative w-full h-[450px] lg:h-[520px] overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center ${
        side === 'left' ? 'justify-start pl-0' : 'justify-end pr-0'
      } ${className}`}
      style={{
        touchAction: 'none',
      }}
    >
      {/* Sleek Active Item Indicator Line & Glow Accent */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10 ${
          side === 'left' ? 'left-0' : 'right-0'
        }`}
      >
        <div className="w-1.5 h-10 rounded-full bg-color-accent shadow-[0_0_15px_rgba(0,216,240,0.8)] glow-cyan" />
      </div>

      {/* Wheel Options Items */}
      <div className="relative w-full h-full flex items-center">
        {items.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[idx] = el
            }}
            onClick={() => handleItemClick(idx)}
            className="absolute top-1/2 left-3 lg:left-4 -translate-y-1/2 transition-colors duration-150 cursor-pointer flex flex-col items-start whitespace-nowrap font-display font-extrabold uppercase tracking-tight"
            style={{
              fontSize: `${fontSize}rem`,
              willChange: 'transform, opacity, filter',
            }}
          >
            <span>{item.label}</span>
            {item.sublabel && (
              <span className="text-[0.65rem] font-sans font-bold tracking-widest text-color-accent-alt opacity-90 -mt-1">
                {item.sublabel}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
