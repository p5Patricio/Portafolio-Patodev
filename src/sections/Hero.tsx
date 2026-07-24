import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative z-10 min-h-screen overflow-hidden bg-transparent"
      aria-labelledby="hero-title"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="sticky top-0 z-10 h-screen overflow-hidden bg-transparent"
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center bg-transparent">
          <h1
            id="hero-title"
            className="mt-[21vh] flex items-baseline justify-center gap-[0.25em] whitespace-nowrap text-center text-[clamp(2.05rem,6.15vw,6.45rem)] font-display font-extrabold leading-none tracking-tight md:mt-[16.4vh]"
          >
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

export default Hero
