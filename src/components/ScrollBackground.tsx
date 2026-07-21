import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import ColorBends from './ColorBends'

type LaserFieldVariant = 'home' | 'gallery'

type LaserFieldProps = {
  variant?: LaserFieldVariant
  className?: string
}

type TraceColor = 'cyan' | 'yellow' | 'red'

type LightBandProps = {
  y: number
  scale?: number
  delay?: number
  idSuffix: string
  flip?: boolean
}

type LuminousCurveProps = {
  d: string
  color: TraceColor
  idSuffix: string
  delay: number
  glowWidth?: number
  coreWidth?: number
  shimmerWidth?: number
  opacity?: number
}

const pathTransition: Transition = { duration: 3.2, ease: 'easeInOut' }

const pathAnimation = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
}

function LuminousCurve({
  d,
  color,
  idSuffix,
  delay,
  glowWidth = 18,
  coreWidth = 1.15,
  shimmerWidth = 0.7,
  opacity = 1,
}: LuminousCurveProps) {
  return (
    <g opacity={opacity}>
      <path
        d={d}
        fill="none"
        stroke={`url(#laser-${color}-aura-${idSuffix})`}
        strokeWidth={glowWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#laser-airy-glow-${idSuffix})`}
      />
      <path
        d={d}
        fill="none"
        stroke={`url(#laser-${color}-core-${idSuffix})`}
        strokeWidth={coreWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#laser-line-glow-${idSuffix})`}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#laser-${color}-shimmer-${idSuffix})`}
        strokeWidth={shimmerWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#laser-line-glow-${idSuffix})`}
        {...pathAnimation}
        transition={{ ...pathTransition, delay }}
      />
    </g>
  )
}

function LightBand({ y, scale = 1, delay = 0, idSuffix, flip = false }: LightBandProps) {
  const transform = flip
    ? `translate(1440 ${y}) scale(${-scale} ${scale})`
    : `translate(0 ${y}) scale(${scale})`

  return (
    <g transform={transform} style={{ mixBlendMode: 'screen' }}>
      <LuminousCurve
        color="cyan"
        idSuffix={idSuffix}
        delay={delay}
        glowWidth={16}
        coreWidth={1.08}
        shimmerWidth={0.64}
        d="M -128 318 C 104 424 382 462 616 386 C 782 332 918 254 1088 244"
      />

      <path
        d="M 360 430 C 568 458 740 410 894 332"
        fill="none"
        stroke={`url(#laser-cyan-ghost-${idSuffix})`}
        strokeWidth="0.52"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#laser-line-glow-${idSuffix})`}
        opacity="0.45"
      />

      <LuminousCurve
        color="yellow"
        idSuffix={idSuffix}
        delay={delay + 0.18}
        glowWidth={14}
        coreWidth={0.98}
        shimmerWidth={0.58}
        opacity={0.9}
        d="M 800 310 C 944 262 1054 184 1198 124 C 1328 70 1450 48 1558 28"
      />

      <LuminousCurve
        color="red"
        idSuffix={idSuffix}
        delay={delay + 0.34}
        glowWidth={17}
        coreWidth={0.98}
        shimmerWidth={0.58}
        opacity={0.86}
        d="M 314 526 C 544 488 706 378 928 350 C 1128 324 1310 364 1572 446"
      />

      <path
        d="M 594 500 C 760 422 926 384 1128 388"
        fill="none"
        stroke={`url(#laser-red-ghost-${idSuffix})`}
        strokeWidth="0.48"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#laser-line-glow-${idSuffix})`}
        opacity="0.36"
      />

      <circle cx="1088" cy="244" r="1.8" fill={`url(#laser-cyan-node-${idSuffix})`} opacity="0.55" />
      <circle cx="1198" cy="124" r="1.6" fill={`url(#laser-yellow-node-${idSuffix})`} opacity="0.5" />
      <circle cx="928" cy="350" r="1.7" fill={`url(#laser-red-node-${idSuffix})`} opacity="0.48" />
    </g>
  )
}

function MobileLightBand({ y, scale = 1, delay = 0, idSuffix, flip = false }: LightBandProps) {
  const transform = flip
    ? `translate(430 ${y}) scale(${-scale} ${scale})`
    : `translate(0 ${y}) scale(${scale})`

  return (
    <g transform={transform} style={{ mixBlendMode: 'screen' }}>
      <LuminousCurve
        color="cyan"
        idSuffix={idSuffix}
        delay={delay}
        glowWidth={8}
        coreWidth={0.72}
        shimmerWidth={0.42}
        opacity={0.82}
        d="M -46 258 C 50 286 146 292 238 266 C 304 247 356 238 474 246"
      />

      <path
        d="M 112 296 C 182 306 256 282 334 250"
        fill="none"
        stroke={`url(#laser-cyan-ghost-${idSuffix})`}
        strokeWidth="0.38"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#laser-line-glow-${idSuffix})`}
        opacity="0.3"
      />

      <LuminousCurve
        color="yellow"
        idSuffix={idSuffix}
        delay={delay + 0.18}
        glowWidth={7}
        coreWidth={0.64}
        shimmerWidth={0.38}
        opacity={0.74}
        d="M 176 204 C 236 190 292 166 350 144 C 404 124 448 118 486 114"
      />

      <LuminousCurve
        color="red"
        idSuffix={idSuffix}
        delay={delay + 0.34}
        glowWidth={8.5}
        coreWidth={0.66}
        shimmerWidth={0.38}
        opacity={0.7}
        d="M 42 372 C 128 350 208 327 292 326 C 354 327 406 343 486 374"
      />

      <path
        d="M 154 378 C 222 342 298 332 372 342"
        fill="none"
        stroke={`url(#laser-red-ghost-${idSuffix})`}
        strokeWidth="0.34"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#laser-line-glow-${idSuffix})`}
        opacity="0.24"
      />

      <circle cx="334" cy="250" r="1.15" fill={`url(#laser-cyan-node-${idSuffix})`} opacity="0.42" />
      <circle cx="350" cy="144" r="1.05" fill={`url(#laser-yellow-node-${idSuffix})`} opacity="0.36" />
      <circle cx="292" cy="326" r="1.08" fill={`url(#laser-red-node-${idSuffix})`} opacity="0.34" />
    </g>
  )
}

function LaserDefs({ idSuffix }: { idSuffix: string }) {
  return (
    <defs>
      <filter
        id={`laser-line-glow-${idSuffix}`}
        x="-18%"
        y="-32%"
        width="136%"
        height="164%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="2.4" result="tightGlow" />
        <feGaussianBlur stdDeviation="7" result="wideGlow" />
        <feMerge>
          <feMergeNode in="wideGlow" />
          <feMergeNode in="tightGlow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter
        id={`laser-airy-glow-${idSuffix}`}
        x="-24%"
        y="-44%"
        width="148%"
        height="188%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="10" />
      </filter>

      <linearGradient id={`laser-cyan-aura-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#00d8f0" stopOpacity="0" />
        <stop offset="0.15" stopColor="#00d8f0" stopOpacity="0.13" />
        <stop offset="0.48" stopColor="#2bf4ff" stopOpacity="0.24" />
        <stop offset="0.82" stopColor="#0098b4" stopOpacity="0.08" />
        <stop offset="1" stopColor="#001318" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-cyan-core-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#c7fdff" stopOpacity="0" />
        <stop offset="0.16" stopColor="#8cfbff" stopOpacity="0.42" />
        <stop offset="0.5" stopColor="#23edff" stopOpacity="0.86" />
        <stop offset="0.82" stopColor="#00b8da" stopOpacity="0.34" />
        <stop offset="1" stopColor="#00b8da" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-cyan-shimmer-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#ecffff" stopOpacity="0" />
        <stop offset="0.24" stopColor="#ecffff" stopOpacity="0.86" />
        <stop offset="0.55" stopColor="#72fbff" stopOpacity="0.9" />
        <stop offset="1" stopColor="#72fbff" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-cyan-ghost-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#00d8f0" stopOpacity="0" />
        <stop offset="0.42" stopColor="#00d8f0" stopOpacity="0.36" />
        <stop offset="1" stopColor="#00d8f0" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-yellow-aura-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#ffdc3c" stopOpacity="0" />
        <stop offset="0.18" stopColor="#ffdc3c" stopOpacity="0.09" />
        <stop offset="0.52" stopColor="#ffec80" stopOpacity="0.2" />
        <stop offset="0.84" stopColor="#ffbf19" stopOpacity="0.08" />
        <stop offset="1" stopColor="#261500" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-yellow-core-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#fff6a0" stopOpacity="0" />
        <stop offset="0.18" stopColor="#fff6a0" stopOpacity="0.32" />
        <stop offset="0.52" stopColor="#ffe875" stopOpacity="0.82" />
        <stop offset="0.82" stopColor="#ffd022" stopOpacity="0.3" />
        <stop offset="1" stopColor="#ffd022" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-yellow-shimmer-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#fffad2" stopOpacity="0" />
        <stop offset="0.22" stopColor="#fffad2" stopOpacity="0.72" />
        <stop offset="0.54" stopColor="#ffec72" stopOpacity="0.86" />
        <stop offset="1" stopColor="#ffec72" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-red-aura-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#ff4c4c" stopOpacity="0" />
        <stop offset="0.2" stopColor="#ff4c4c" stopOpacity="0.07" />
        <stop offset="0.54" stopColor="#ff755c" stopOpacity="0.18" />
        <stop offset="0.86" stopColor="#ff3728" stopOpacity="0.08" />
        <stop offset="1" stopColor="#240302" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-red-core-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#ff8a73" stopOpacity="0" />
        <stop offset="0.2" stopColor="#ff8a73" stopOpacity="0.28" />
        <stop offset="0.54" stopColor="#ff6648" stopOpacity="0.78" />
        <stop offset="0.84" stopColor="#ff3c2d" stopOpacity="0.32" />
        <stop offset="1" stopColor="#ff3c2d" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-red-shimmer-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#ffd0c4" stopOpacity="0" />
        <stop offset="0.24" stopColor="#ffd0c4" stopOpacity="0.7" />
        <stop offset="0.56" stopColor="#ff8a73" stopOpacity="0.84" />
        <stop offset="1" stopColor="#ff8a73" stopOpacity="0" />
      </linearGradient>

      <linearGradient id={`laser-red-ghost-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop stopColor="#ff4c4c" stopOpacity="0" />
        <stop offset="0.48" stopColor="#ff4c4c" stopOpacity="0.3" />
        <stop offset="1" stopColor="#ff4c4c" stopOpacity="0" />
      </linearGradient>

      <radialGradient id={`laser-cyan-node-${idSuffix}`}>
        <stop stopColor="#caffff" />
        <stop offset="0.45" stopColor="#00d8f0" stopOpacity="0.55" />
        <stop offset="1" stopColor="#00d8f0" stopOpacity="0" />
      </radialGradient>

      <radialGradient id={`laser-yellow-node-${idSuffix}`}>
        <stop stopColor="#fff8bc" />
        <stop offset="0.45" stopColor="#ffdc3c" stopOpacity="0.5" />
        <stop offset="1" stopColor="#ffdc3c" stopOpacity="0" />
      </radialGradient>

      <radialGradient id={`laser-red-node-${idSuffix}`}>
        <stop stopColor="#ffd2c8" />
        <stop offset="0.45" stopColor="#ff4c4c" stopOpacity="0.5" />
        <stop offset="1" stopColor="#ff4c4c" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

export function LaserField({ variant = 'home', className = '' }: LaserFieldProps) {
  const isGallery = variant === 'gallery'
  const viewBoxHeight = isGallery ? 3000 : 5900
  const mobileViewBoxHeight = isGallery ? 3000 : 5900
  const mobileIdSuffix = `${variant}-mobile`
  const bands = isGallery
    ? [
        { y: 150, scale: 0.78, delay: 0, flip: false },
        { y: 1110, scale: 0.74, delay: 0.16, flip: true },
        { y: 2060, scale: 0.76, delay: 0.28, flip: false },
      ]
    : [
        { y: 900, scale: 0.86, delay: 0, flip: false },
        { y: 2110, scale: 0.78, delay: 0.14, flip: true },
        { y: 3420, scale: 0.84, delay: 0.26, flip: false },
        { y: 4720, scale: 0.72, delay: 0.38, flip: true },
      ]
  const mobileBands = isGallery
    ? [
        { y: 210, scale: 0.94, delay: 0, flip: false },
        { y: 1120, scale: 0.88, delay: 0.16, flip: true },
        { y: 2050, scale: 0.9, delay: 0.28, flip: false },
      ]
    : [
        { y: 680, scale: 0.96, delay: 0, flip: false },
        { y: 1680, scale: 0.9, delay: 0.14, flip: true },
        { y: 2820, scale: 0.94, delay: 0.26, flip: false },
        { y: 4050, scale: 0.86, delay: 0.38, flip: true },
        { y: 5200, scale: 0.92, delay: 0.5, flip: false },
      ]

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#000000] ${className}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 hidden h-full w-full md:block"
        viewBox={`0 0 1440 ${viewBoxHeight}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <LaserDefs idSuffix={variant} />

        {bands.map((band, index) => (
          <LightBand
            key={`${variant}-${index}`}
            y={band.y}
            scale={band.scale}
            delay={band.delay}
            idSuffix={variant}
            flip={band.flip}
          />
        ))}
      </svg>

      <svg
        className="absolute inset-0 h-full w-full md:hidden"
        viewBox={`0 0 430 ${mobileViewBoxHeight}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <LaserDefs idSuffix={mobileIdSuffix} />

        {mobileBands.map((band, index) => (
          <MobileLightBand
            key={`${mobileIdSuffix}-${index}`}
            y={band.y}
            scale={band.scale}
            delay={band.delay}
            idSuffix={mobileIdSuffix}
            flip={band.flip}
          />
        ))}
      </svg>
    </div>
  )
}

function ScrollBackground({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#000000] selection:bg-color-accent selection:text-color-papel">
      {/* Interactive WebGL ColorBends Background */}
      <div className="fixed inset-0 z-0 opacity-75 pointer-events-none">
        <ColorBends
          colors={['#00d8f0', '#8a5cff', '#00ffd1', '#ff2a85']}
          rotation={90}
          speed={0.12}
          scale={1.2}
          frequency={1.1}
          warpStrength={1.2}
          mouseInfluence={0.8}
          parallax={0.4}
          noise={0.12}
          iterations={2}
          intensity={1.4}
          bandWidth={5}
          transparent={true}
          autoRotate={1.5}
        />
      </div>

      <LaserField />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default ScrollBackground
