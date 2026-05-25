import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Logo from '../components/Logo'

/**
 * Web-native landing hero.
 *
 * Recreates the reference artwork with real web elements instead of a raster
 * background: pure black CSS, live text, the high-quality logo asset and SVG
 * Bézier light trails. This avoids compression/noise artifacts on displays that
 * make near-black pixels visible.
 */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative z-10 min-h-screen overflow-hidden bg-black"
      aria-labelledby="hero-title"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="sticky top-0 z-10 h-screen overflow-hidden bg-[#000000]"
      >
        <HeroLightTrails />

        <div className="absolute inset-0 z-10 flex flex-col items-center bg-transparent">
          <h1
            id="hero-title"
            className="mt-[21vh] flex items-baseline justify-center gap-[0.18em] whitespace-nowrap text-center text-[clamp(2.05rem,6.15vw,6.45rem)] font-black leading-none tracking-[-0.075em] md:mt-[16.4vh]"
            style={{
              fontFamily:
                '"Montserrat", "Poppins", "Inter", "Segoe UI", Arial, sans-serif',
            }}
          >
            <span
              className="text-[#08d7f2]"
            >
              Ingeniero
            </span>
            <span className="text-white">
              de
            </span>
            <span className="text-[#ffe454]">
              Software
            </span>
          </h1>

          <Logo
            alt="Logo personal de programador"
            className="mt-[1.4rem] w-[clamp(15rem,30vw,31.25rem)] max-w-[82vw] md:mt-[-2.15rem]"
          />
        </div>

        <span className="sr-only">Soy</span>
      </motion.div>
    </section>
  )
}

function HeroLightTrails() {
  const desktopYellowPath =
    'M 860 758 C 1040 724 1168 630 1328 548 C 1488 466 1628 420 1768 400'
  const desktopRedPath =
    'M 670 888 C 900 840 1038 752 1228 730 C 1400 710 1546 718 1768 760'
  // Mobile keeps the desktop composition (cyan sweep + rising yellow + low red)
  // but compresses each trace so the Hero reads correctly in a taller viewport.
  const mobileCyanBeamPath =
    'M -38 420 C 28 488 116 596 190 608 C 236 616 274 584 316 526 L 316 554 C 274 606 236 636 190 630 C 112 622 26 530 -38 478 Z'
  const mobileCyanCorePath =
    'M -24 446 C 44 520 124 606 196 616 C 236 622 272 592 308 548 L 308 554 C 272 598 236 628 196 622 C 124 612 44 528 -24 454 Z'
  const mobileCyanHighlightPath =
    'M -14 446 C 48 522 124 606 196 616 C 236 622 272 592 308 548'
  const mobileCyanRimPath =
    'M 176 616 C 226 626 266 594 308 548'
  const mobileYellowPath =
    'M 214 622 C 260 592 294 518 336 462 C 378 405 410 370 454 352'
  const mobileRedPath =
    'M 158 704 C 216 682 262 626 314 608 C 362 592 406 604 454 638'

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#000000]"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 1672 941"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="hero-line-glow-desktop"
            x="-15%"
            y="-15%"
            width="130%"
            height="145%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="5" result="tightGlow" />
            <feGaussianBlur stdDeviation="16" result="wideGlow" />
            <feMerge>
              <feMergeNode in="wideGlow" />
              <feMergeNode in="tightGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="hero-haze-desktop"
            x="-20%"
            y="-20%"
            width="140%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="34" />
          </filter>

          <filter
            id="hero-beam-blur-desktop"
            x="-25%"
            y="-25%"
            width="150%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="18" />
          </filter>

          <filter
            id="hero-warm-line-glow-desktop"
            x="-15%"
            y="-18%"
            width="130%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="2.9" result="tightGlow" />
            <feGaussianBlur stdDeviation="10" result="wideGlow" />
            <feMerge>
              <feMergeNode in="wideGlow" />
              <feMergeNode in="tightGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="hero-warm-beam-blur-desktop"
            x="-25%"
            y="-25%"
            width="150%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="13" />
          </filter>

          <linearGradient
            id="hero-cyan-stroke-desktop"
            x1="-40"
            y1="548"
            x2="1180"
            y2="678"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a9fbff" />
            <stop offset="0.16" stopColor="#27e9ff" />
            <stop offset="0.58" stopColor="#00bce2" />
            <stop offset="1" stopColor="#00607f" stopOpacity="0.18" />
          </linearGradient>

          <linearGradient
            id="hero-cyan-beam-desktop"
            x1="-130"
            y1="545"
            x2="1195"
            y2="682"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#08e7ff" stopOpacity="0.42" />
            <stop offset="0.16" stopColor="#08e7ff" stopOpacity="0.28" />
            <stop offset="0.45" stopColor="#00c7ed" stopOpacity="0.11" />
            <stop offset="0.74" stopColor="#0087a7" stopOpacity="0.035" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="hero-cyan-core-desktop"
            x1="-70"
            y1="550"
            x2="1190"
            y2="676"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#b9fcff" stopOpacity="0.98" />
            <stop offset="0.13" stopColor="#22ecff" stopOpacity="0.98" />
            <stop offset="0.58" stopColor="#00cff4" stopOpacity="0.78" />
            <stop offset="0.84" stopColor="#0087a8" stopOpacity="0.22" />
            <stop offset="1" stopColor="#001014" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="hero-cyan-highlight-desktop"
            x1="-54"
            y1="548"
            x2="1184"
            y2="676"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#d8ffff" stopOpacity="0.98" />
            <stop offset="0.22" stopColor="#80fbff" stopOpacity="0.92" />
            <stop offset="0.62" stopColor="#34e5ff" stopOpacity="0.48" />
            <stop offset="1" stopColor="#34e5ff" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="hero-cyan-haze-desktop"
            x1="-70"
            y1="575"
            x2="815"
            y2="845"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#03dcff" stopOpacity="0.56" />
            <stop offset="0.5" stopColor="#00a7ce" stopOpacity="0.18" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="hero-yellow-stroke-desktop"
            x1="1018"
            y1="682"
            x2="1728"
            y2="388"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff9c00" stopOpacity="0.06" />
            <stop offset="0.18" stopColor="#ffb800" stopOpacity="0.62" />
            <stop offset="0.55" stopColor="#ffe028" />
            <stop offset="1" stopColor="#ffb000" />
          </linearGradient>

          <linearGradient
            id="hero-yellow-beam-desktop"
            x1="860"
            y1="758"
            x2="1768"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#000000" stopOpacity="0" />
            <stop offset="0.2" stopColor="#ffb400" stopOpacity="0.055" />
            <stop offset="0.5" stopColor="#ffc400" stopOpacity="0.16" />
            <stop offset="0.8" stopColor="#ffbc00" stopOpacity="0.3" />
            <stop offset="1" stopColor="#ffb400" stopOpacity="0.38" />
          </linearGradient>

          <linearGradient
            id="hero-yellow-core-desktop"
            x1="860"
            y1="758"
            x2="1768"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#000000" stopOpacity="0" />
            <stop offset="0.18" stopColor="#ffbd00" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#ffd20d" stopOpacity="0.34" />
            <stop offset="0.82" stopColor="#ffe875" stopOpacity="0.8" />
            <stop offset="1" stopColor="#fff0a8" stopOpacity="0.96" />
          </linearGradient>

          <linearGradient
            id="hero-yellow-highlight-desktop"
            x1="860"
            y1="758"
            x2="1768"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff159" stopOpacity="0" />
            <stop offset="0.2" stopColor="#fff159" stopOpacity="0.16" />
            <stop offset="0.68" stopColor="#fff7a6" stopOpacity="0.58" />
            <stop offset="1" stopColor="#fff7a6" stopOpacity="0.88" />
          </linearGradient>

          <linearGradient
            id="hero-red-stroke-desktop"
            x1="600"
            y1="920"
            x2="1720"
            y2="748"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff2e1f" stopOpacity="0" />
            <stop offset="0.38" stopColor="#ff3c24" stopOpacity="0.9" />
            <stop offset="0.7" stopColor="#ff6036" />
            <stop offset="1" stopColor="#d91a13" stopOpacity="0.55" />
          </linearGradient>

          <linearGradient
            id="hero-red-haze-desktop"
            x1="748"
            y1="930"
            x2="1610"
            y2="755"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#000000" stopOpacity="0" />
            <stop offset="0.55" stopColor="#ff3a20" stopOpacity="0.22" />
            <stop offset="1" stopColor="#ff2b1b" stopOpacity="0.44" />
          </linearGradient>

          <linearGradient
            id="hero-red-beam-desktop"
            x1="670"
            y1="888"
            x2="1768"
            y2="760"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#000000" stopOpacity="0" />
            <stop offset="0.26" stopColor="#ff2d1c" stopOpacity="0.025" />
            <stop offset="0.56" stopColor="#ff3b22" stopOpacity="0.15" />
            <stop offset="0.82" stopColor="#ff301f" stopOpacity="0.32" />
            <stop offset="1" stopColor="#ff2b1b" stopOpacity="0.42" />
          </linearGradient>

          <linearGradient
            id="hero-red-core-desktop"
            x1="670"
            y1="888"
            x2="1768"
            y2="760"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#000000" stopOpacity="0" />
            <stop offset="0.24" stopColor="#ff321f" stopOpacity="0.06" />
            <stop offset="0.56" stopColor="#ff4b2c" stopOpacity="0.34" />
            <stop offset="0.84" stopColor="#ff6f4c" stopOpacity="0.8" />
            <stop offset="1" stopColor="#ff9a82" stopOpacity="0.96" />
          </linearGradient>

          <linearGradient
            id="hero-red-highlight-desktop"
            x1="670"
            y1="888"
            x2="1768"
            y2="760"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff7657" stopOpacity="0" />
            <stop offset="0.3" stopColor="#ff7657" stopOpacity="0.08" />
            <stop offset="0.7" stopColor="#ff9a82" stopOpacity="0.52" />
            <stop offset="1" stopColor="#ffb19f" stopOpacity="0.84" />
          </linearGradient>
        </defs>

        <g style={{ mixBlendMode: 'screen' }}>
          <path
            d="M -138 518 C 116 600 452 732 742 748 C 906 758 1060 716 1212 648 L 1212 682 C 1060 746 908 782 742 776 C 444 766 112 650 -138 590 Z"
            fill="url(#hero-cyan-beam-desktop)"
            filter="url(#hero-beam-blur-desktop)"
            opacity="0.98"
          />
          <path
            d="M -78 546 C 188 644 486 746 768 758 C 908 764 1040 728 1188 675 L 1188 679 C 1040 733 908 768 768 763 C 486 752 188 651 -78 552 Z"
            fill="url(#hero-cyan-core-desktop)"
            filter="url(#hero-line-glow-desktop)"
          />
          <path
            d="M -54 548 C 192 645 482 746 766 759 C 918 766 1054 730 1184 676"
            fill="none"
            stroke="url(#hero-cyan-highlight-desktop)"
            strokeWidth="1.15"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 710 756 C 860 770 1018 732 1184 676"
            fill="none"
            stroke="#007b9c"
            strokeWidth="0.55"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.32"
          />

          <path
            d={desktopYellowPath}
            fill="none"
            stroke="url(#hero-yellow-beam-desktop)"
            strokeWidth="27"
            strokeLinecap="round"
            filter="url(#hero-warm-beam-blur-desktop)"
            opacity="0.78"
          />
          <path
            d={desktopYellowPath}
            fill="none"
            stroke="url(#hero-yellow-core-desktop)"
            strokeWidth="3.6"
            strokeLinecap="round"
            filter="url(#hero-warm-line-glow-desktop)"
          />
          <path
            d={desktopYellowPath}
            fill="none"
            stroke="url(#hero-yellow-highlight-desktop)"
            strokeWidth="0.82"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d={desktopRedPath}
            fill="none"
            stroke="url(#hero-red-beam-desktop)"
            strokeWidth="42"
            strokeLinecap="round"
            filter="url(#hero-warm-beam-blur-desktop)"
            opacity="0.74"
          />
          <path
            d={desktopRedPath}
            fill="none"
            stroke="url(#hero-red-core-desktop)"
            strokeWidth="5.8"
            strokeLinecap="round"
            filter="url(#hero-warm-line-glow-desktop)"
          />
          <path
            d={desktopRedPath}
            fill="none"
            stroke="url(#hero-red-highlight-desktop)"
            strokeWidth="0.9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      <svg
        className="absolute inset-0 h-full w-full md:hidden"
        viewBox="0 0 430 764"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id="hero-line-glow-mobile"
            x="-30%"
            y="-30%"
            width="160%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="3" result="tightGlow" />
            <feGaussianBlur stdDeviation="9" result="wideGlow" />
            <feMerge>
              <feMergeNode in="wideGlow" />
              <feMergeNode in="tightGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="hero-haze-mobile"
            x="-35%"
            y="-35%"
            width="170%"
            height="190%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="20" />
          </filter>

          <filter
            id="hero-beam-blur-mobile"
            x="-40%"
            y="-40%"
            width="180%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <filter
            id="hero-warm-line-glow-mobile"
            x="-30%"
            y="-30%"
            width="160%"
            height="175%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="1.8" result="tightGlow" />
            <feGaussianBlur stdDeviation="5.6" result="wideGlow" />
            <feMerge>
              <feMergeNode in="wideGlow" />
              <feMergeNode in="tightGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="hero-warm-beam-blur-mobile"
            x="-40%"
            y="-40%"
            width="180%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="5.8" />
          </filter>

          <linearGradient
            id="hero-cyan-stroke-mobile"
            x1="-24"
            y1="446"
            x2="308"
            y2="548"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9ffaff" />
            <stop offset="0.22" stopColor="#18e4ff" />
            <stop offset="0.62" stopColor="#00add4" />
            <stop offset="1" stopColor="#005c78" stopOpacity="0.18" />
          </linearGradient>

          <linearGradient
            id="hero-cyan-beam-mobile"
            x1="-38"
            y1="420"
            x2="316"
            y2="554"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#08e7ff" stopOpacity="0.42" />
            <stop offset="0.2" stopColor="#06daf7" stopOpacity="0.24" />
            <stop offset="0.52" stopColor="#00afd8" stopOpacity="0.09" />
            <stop offset="0.82" stopColor="#005a76" stopOpacity="0.025" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="hero-cyan-core-mobile"
            x1="-24"
            y1="446"
            x2="308"
            y2="548"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#c6fdff" stopOpacity="0.98" />
            <stop offset="0.2" stopColor="#24ecff" stopOpacity="0.96" />
            <stop offset="0.58" stopColor="#00c5eb" stopOpacity="0.58" />
            <stop offset="1" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="hero-yellow-stroke-mobile"
            x1="214"
            y1="622"
            x2="454"
            y2="352"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffb000" stopOpacity="0" />
            <stop offset="0.28" stopColor="#ffce17" />
            <stop offset="1" stopColor="#ffac00" />
          </linearGradient>

          <linearGradient
            id="hero-yellow-beam-mobile"
            x1="214"
            y1="622"
            x2="454"
            y2="352"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#000000" stopOpacity="0" />
            <stop offset="0.2" stopColor="#ffb400" stopOpacity="0.055" />
            <stop offset="0.5" stopColor="#ffcf17" stopOpacity="0.16" />
            <stop offset="0.82" stopColor="#ffb400" stopOpacity="0.3" />
            <stop offset="1" stopColor="#ffb400" stopOpacity="0.38" />
          </linearGradient>

          <linearGradient
            id="hero-yellow-core-mobile"
            x1="214"
            y1="622"
            x2="454"
            y2="352"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#000000" stopOpacity="0" />
            <stop offset="0.18" stopColor="#ffbd00" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#ffd20d" stopOpacity="0.34" />
            <stop offset="0.82" stopColor="#fff06a" stopOpacity="0.78" />
            <stop offset="1" stopColor="#fff3a6" stopOpacity="0.94" />
          </linearGradient>

          <linearGradient
            id="hero-yellow-highlight-mobile"
            x1="214"
            y1="622"
            x2="454"
            y2="352"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff25f" stopOpacity="0" />
            <stop offset="0.2" stopColor="#fff25f" stopOpacity="0.16" />
            <stop offset="0.7" stopColor="#fff8a8" stopOpacity="0.56" />
            <stop offset="1" stopColor="#fff8a8" stopOpacity="0.84" />
          </linearGradient>

          <linearGradient
            id="hero-red-stroke-mobile"
            x1="158"
            y1="704"
            x2="454"
            y2="638"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff2b1a" stopOpacity="0" />
            <stop offset="0.42" stopColor="#ff3c25" stopOpacity="0.9" />
            <stop offset="0.78" stopColor="#ff6948" />
            <stop offset="1" stopColor="#d91a13" stopOpacity="0.55" />
          </linearGradient>

          <linearGradient
            id="hero-red-beam-mobile"
            x1="158"
            y1="704"
            x2="454"
            y2="638"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#000000" stopOpacity="0" />
            <stop offset="0.26" stopColor="#ff2d1c" stopOpacity="0.025" />
            <stop offset="0.58" stopColor="#ff4227" stopOpacity="0.16" />
            <stop offset="0.84" stopColor="#ff311f" stopOpacity="0.32" />
            <stop offset="1" stopColor="#ff2b1b" stopOpacity="0.42" />
          </linearGradient>

          <linearGradient
            id="hero-red-core-mobile"
            x1="158"
            y1="704"
            x2="454"
            y2="638"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#000000" stopOpacity="0" />
            <stop offset="0.28" stopColor="#ff351f" stopOpacity="0.06" />
            <stop offset="0.6" stopColor="#ff5637" stopOpacity="0.34" />
            <stop offset="0.86" stopColor="#ff6f4c" stopOpacity="0.78" />
            <stop offset="1" stopColor="#ff9a82" stopOpacity="0.94" />
          </linearGradient>

          <linearGradient
            id="hero-red-highlight-mobile"
            x1="158"
            y1="704"
            x2="454"
            y2="638"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff7657" stopOpacity="0" />
            <stop offset="0.3" stopColor="#ff7657" stopOpacity="0.08" />
            <stop offset="0.72" stopColor="#ff9a82" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffb19f" stopOpacity="0.82" />
          </linearGradient>
        </defs>

        <g style={{ mixBlendMode: 'screen' }}>
          <path
            d={mobileCyanBeamPath}
            fill="url(#hero-cyan-beam-mobile)"
            filter="url(#hero-beam-blur-mobile)"
            opacity="0.98"
          />
          <path
            d={mobileCyanCorePath}
            fill="url(#hero-cyan-core-mobile)"
            filter="url(#hero-line-glow-mobile)"
          />
          <path
            d={mobileCyanHighlightPath}
            fill="none"
            stroke="#8bfbff"
            strokeWidth="0.86"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={mobileCyanRimPath}
            fill="none"
            stroke="#006f8d"
            strokeWidth="0.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.24"
          />

          <path
            d={mobileYellowPath}
            fill="none"
            stroke="url(#hero-yellow-beam-mobile)"
            strokeWidth="9"
            strokeLinecap="round"
            filter="url(#hero-warm-beam-blur-mobile)"
            opacity="0.7"
          />
          <path
            d={mobileYellowPath}
            fill="none"
            stroke="url(#hero-yellow-core-mobile)"
            strokeWidth="1.55"
            strokeLinecap="round"
            filter="url(#hero-warm-line-glow-mobile)"
          />
          <path
            d={mobileYellowPath}
            fill="none"
            stroke="url(#hero-yellow-highlight-mobile)"
            strokeWidth="0.48"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d={mobileRedPath}
            fill="none"
            stroke="url(#hero-red-beam-mobile)"
            strokeWidth="15"
            strokeLinecap="round"
            filter="url(#hero-warm-beam-blur-mobile)"
            opacity="0.68"
          />
          <path
            d={mobileRedPath}
            fill="none"
            stroke="url(#hero-red-core-mobile)"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="url(#hero-warm-line-glow-mobile)"
          />
          <path
            d={mobileRedPath}
            fill="none"
            stroke="url(#hero-red-highlight-mobile)"
            strokeWidth="0.52"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>
  )
}

export default Hero
