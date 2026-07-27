import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Logo from '../components/Logo'
import SplitText from '../components/SplitText'

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToNext = () => {
    const el = document.getElementById('experiencia') || document.getElementById('proyectos')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative z-10 min-h-screen overflow-hidden bg-transparent"
      aria-labelledby="hero-title"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="sticky top-0 z-10 h-screen overflow-hidden bg-transparent flex flex-col justify-between items-center px-4 py-6 md:py-10"
      >
        <div className="w-full max-w-6xl flex-1 flex flex-col items-center justify-center pt-8 md:pt-4">
          <h1
            id="hero-title"
            className="flex flex-col items-center justify-center text-center font-['Plus_Jakarta_Sans',sans-serif] font-extrabold leading-tight tracking-tight"
          >
            {/* --- NAME: Patricio García --- */}
            {/* Mobile: 2 lines ("Patricio", "García") | Desktop: 1 line ("Patricio García") */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-[0.35em] text-[clamp(1.9rem,6.5vw,2.5rem)] md:text-[clamp(1.4rem,2.2vw,2.4rem)] font-['Plus_Jakarta_Sans',sans-serif] font-extrabold tracking-tight mb-2 md:mb-3">
              <SplitText
                text="Patricio"
                tag="span"
                splitType="chars"
                delay={25}
                duration={0.55}
                className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              />
              <SplitText
                text="García"
                tag="span"
                splitType="chars"
                delay={25}
                duration={0.55}
                className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              />
            </div>

            {/* --- TITLE: Ingeniero de Software --- */}
            {/* Mobile: 3 lines ("Ingeniero", "de", "Software") | Desktop: 1 line ("Ingeniero de Software") */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-[0.25em] text-[clamp(2.1rem,7vw,3.2rem)] md:text-[clamp(2.1rem,3.6vw,3.8rem)] font-['Plus_Jakarta_Sans',sans-serif] font-extrabold leading-none">
              <SplitText
                text="Ingeniero"
                tag="span"
                splitType="chars"
                delay={30}
                duration={0.6}
                className="text-[#08d7f2]"
              />
              <SplitText
                text="de"
                tag="span"
                splitType="chars"
                delay={30}
                duration={0.6}
                className="text-white"
              />
              <SplitText
                text="Software"
                tag="span"
                splitType="chars"
                delay={30}
                duration={0.6}
                className="text-[#ffe454]"
              />
            </div>
          </h1>

          {/* Logo below title - Sleek compact proportions on PC */}
          <Logo
            alt="Logo personal de programador"
            className="mt-6 md:mt-5 w-[clamp(12rem,40vw,17rem)] md:w-[clamp(11rem,15vw,16.5rem)] max-w-[75vw] md:max-w-[20rem]"
          />
        </div>

        {/* --- ANIMATED SCROLL INDICATOR --- */}
        <motion.button
          type="button"
          onClick={scrollToNext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          aria-label="Deslizar para explorar"
          className="group flex flex-col items-center gap-2 cursor-pointer pb-4 md:pb-6 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-white/50 group-hover:text-white/80 transition-colors">
            Desliza para explorar
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm group-hover:border-[#08d7f2]/50 group-hover:bg-[#08d7f2]/10 transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-white/80 group-hover:text-[#08d7f2] transition-colors" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
