import { useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useSyncExternalStore, type PointerEvent } from 'react'
import { SPRING } from '../lib/motion'

/** Maximum distance, in px, the magnetic element itself travels toward the pointer. */
export const MAGNETIC_PULL = 6

/**
 * Extra distance, in px, the inner content (label/arrow) travels on top of the
 * element's own pull, so the label reads as floating a layer above the surface.
 */
export const MAGNETIC_DEPTH = 3

/** Only devices that can hover with a precise pointer (mouse, trackpad) get the pull. */
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

function subscribeFinePointer(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER_QUERY)
  query.addEventListener?.('change', onChange)
  return () => query.removeEventListener?.('change', onChange)
}

const getFinePointer = () => window.matchMedia(FINE_POINTER_QUERY).matches
// Prerender and hydration assume no fine pointer, so the markup never differs.
const getServerFinePointer = () => false

type Options = {
  /** Max travel of the element in px. */
  pull?: number
  /** Extra travel of the inner content in px. */
  depth?: number
  /** Freeze the effect (e.g. a disabled button) and return to rest. */
  disabled?: boolean
}

type Offset = { x: MotionValue<number>; y: MotionValue<number> }

export type Magnetic = {
  /** Spread into the magnetic element's `style` (an `m.*` component). */
  style: Offset
  /** Spread into the inner content's `style` (an `m.*` component inside it). */
  innerStyle: Offset
  handlers: {
    onPointerMove: (event: PointerEvent<HTMLElement>) => void
    onPointerLeave: () => void
    onPointerCancel: () => void
  }
}

/**
 * Subtle "magnetic" pull: while a fine pointer moves over the element, the
 * element drifts up to `pull` px toward it and its inner content up to
 * `depth` px further, then both spring back to rest when the pointer leaves.
 *
 * Transform-only (the layout box never changes) and driven by motion values,
 * so pointer frames never re-render React. Inert on touch/coarse pointers,
 * under prefers-reduced-motion and while `disabled`.
 */
export function useMagnetic({ pull = MAGNETIC_PULL, depth = MAGNETIC_DEPTH, disabled = false }: Options = {}): Magnetic {
  const reduceMotion = useReducedMotion()
  const finePointer = useSyncExternalStore(subscribeFinePointer, getFinePointer, getServerFinePointer)
  const enabled = finePointer && !reduceMotion && !disabled

  // Pointer position relative to the element's center, normalized to -1..1.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  // The surface responds tightly; the content lags a touch with a soft spring,
  // which is what sells the depth.
  const x = useSpring(useTransform(pointerX, [-1, 1], [-pull, pull]), SPRING.snappy)
  const y = useSpring(useTransform(pointerY, [-1, 1], [-pull, pull]), SPRING.snappy)
  const innerX = useSpring(useTransform(pointerX, [-1, 1], [-depth, depth]), SPRING.soft)
  const innerY = useSpring(useTransform(pointerY, [-1, 1], [-depth, depth]), SPRING.soft)

  const reset = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  // Losing the capability mid-hover (e.g. the button becomes disabled on
  // submit) must not leave the element stuck off-center.
  useEffect(() => {
    if (!enabled) {
      pointerX.set(0)
      pointerY.set(0)
    }
  }, [enabled, pointerX, pointerY])

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!enabled || event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    pointerX.set((event.clientX - rect.left) / (rect.width / 2) - 1)
    pointerY.set((event.clientY - rect.top) / (rect.height / 2) - 1)
  }

  return {
    style: { x, y },
    innerStyle: { x: innerX, y: innerY },
    handlers: { onPointerMove, onPointerLeave: reset, onPointerCancel: reset },
  }
}
