import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { ALL_REPOS_BY_YEAR, type Repo } from '../data/repos'
import ProjectCard from '../components/ProjectCard'
import ScrollBackground from '../components/ScrollBackground'
import ShuffleText from '../components/ShuffleText'

function GaleriaPage() {
  const { t, lang } = useLanguage()
  const g = t.galeria
  const galleryTitle =
    lang === 'es' ? 'GALERÍA COMPLETA DE PROYECTOS' : 'COMPLETE PROJECT GALLERY'

  const byYear = useMemo(() => {
    const map = new Map<number, Repo[]>()
    for (const repo of ALL_REPOS_BY_YEAR) {
      const list = map.get(repo.year) ?? []
      list.push(repo)
      map.set(repo.year, list)
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0])
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <ScrollBackground>
      <main className="relative min-h-screen overflow-hidden text-color-tinta">

      {/* "Back to home" floating chip */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-7 left-6 md:left-12 z-40"
      >
        <Link
          to="/"
          className="group relative inline-flex items-center gap-3 h-12 px-6 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] text-color-tinta/90 hover:text-color-accent transition-all overflow-hidden"
        >
          <span className="absolute inset-x-4 top-0 h-px tricolor-separator" />
          <ArrowLeft
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5"
            strokeWidth={2.5}
          />
          <span className="text-xs uppercase tracking-[0.22em] font-bold whitespace-nowrap">
            {g.backHome}
          </span>
        </Link>
      </motion.div>

      <section className="relative z-10 flex flex-col items-center overflow-hidden px-6 py-24 md:px-12 md:py-28 lg:px-24 lg:py-32">
        {/* Animated Shuffle Title */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-color-accent/30 bg-color-accent/10 px-4 py-1.5 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-color-accent animate-pulse" />
            <span className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-color-accent">
              {lang === 'es' ? 'Catálogo Completo' : 'Complete Catalog'}
            </span>
          </motion.div>

          <ShuffleText
            text={galleryTitle}
            tag="h1"
            speed={50}
            maxIterations={14}
            loop={true}
            loopInterval={5000}
            className="max-w-5xl text-center text-3xl font-display font-extrabold uppercase leading-tight tracking-tight text-white drop-shadow-[0_0_35px_rgba(0,216,240,0.25)] md:text-5xl lg:text-6xl"
          />
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '120px', opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 flex items-center gap-3"
          >
            <span className="h-0.5 flex-1 tricolor-separator rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full tricolor-dot" />
            <span className="h-0.5 flex-1 tricolor-separator rounded-full" />
          </motion.div>
        </div>

        {/* Year groups */}
        <div className="mt-16 flex w-full max-w-7xl flex-col gap-16 md:gap-20">
          {byYear.map(([year, repos], groupIndex) => (
            <motion.section
              key={year}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: groupIndex * 0.08, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Year heading */}
              <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-white/10 pb-4">
                <h2 className="text-3xl font-display font-bold uppercase leading-none tracking-tight text-color-tinta md:text-4xl">
                  {year}
                </h2>
                <span
                  className="min-w-24 flex-1 h-px rounded-full tricolor-separator opacity-70"
                />
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-color-tinta/80 backdrop-blur-md shadow-sm">
                  {repos.length} {lang === 'es' ? 'proyectos' : 'projects'}
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {repos.map((repo, i) => (
                  <ProjectCard
                    key={repo.id}
                    repo={repo}
                    lang={lang}
                    viewProjectLabel={t.proyectos.viewProject}
                    visitSiteLabel={t.proyectos.visitSite}
                    index={i}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </section>
    </main>
    </ScrollBackground>
  )
}

export default GaleriaPage
