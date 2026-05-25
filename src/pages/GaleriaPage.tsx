import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { ALL_REPOS_BY_YEAR, type Repo } from '../data/repos'
import ProjectCard from '../components/ProjectCard'
import { LaserField } from '../components/ScrollBackground'

/**
 * CyberDuck full-gallery page.
 * Clean, bold grouping of projects by year with glassmorphism and neon accents.
 */
function GaleriaPage() {
  const { t, lang } = useLanguage()
  const g = t.galeria
  const galleryTitle =
    lang === 'es' ? 'Galería completa de proyectos' : 'Complete project gallery'

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
    <main className="relative min-h-screen overflow-hidden bg-[#000000] text-color-tinta selection:bg-color-accent selection:text-color-papel">
      <LaserField variant="gallery" />

      {/* "Back to home" floating chip */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-7 left-6 md:left-12 z-40"
      >
        <Link
          to="/"
          className="group relative inline-flex items-center gap-3 h-12 px-6 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] text-color-tinta/80 hover:text-color-accent transition-colors overflow-hidden"
        >
          <span className="absolute inset-x-4 top-0 h-px tricolor-separator" />
          <ArrowLeft
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5"
            strokeWidth={2.5}
          />
          <span className="text-xs uppercase tracking-[0.25em] font-black whitespace-nowrap">
            {g.backHome}
          </span>
        </Link>
      </motion.div>

      <section className="relative z-10 flex flex-col items-center overflow-hidden px-6 py-28 md:px-12 md:py-32 lg:px-24 lg:py-36">
        {/* Title */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="max-w-5xl bg-[linear-gradient(100deg,#00d8f0_0%,#ffffff_34%,#ffdc3c_66%,#ff4c4c_100%)] bg-clip-text text-center text-4xl font-black uppercase leading-[0.95] tracking-tighter text-transparent drop-shadow-[0_0_24px_rgba(0,216,240,0.13)] md:text-6xl lg:text-7xl"
          >
            {galleryTitle}
          </motion.h1>
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '96px', opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-7 h-px tricolor-separator rounded-full"
          />
        </div>

        {/* Year groups */}
        <div className="mt-20 flex w-full max-w-7xl flex-col gap-20 md:gap-24">
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
              <div className="mb-9 flex flex-wrap items-center gap-4 border-b border-white/10 pb-5">
                <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-color-tinta md:text-4xl">
                  {year}
                </h2>
                <span
                  className="min-w-24 flex-1 h-px rounded-full tricolor-separator opacity-70"
                />
                <span className="rounded-full border border-white/10 bg-white/[0.018] px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.26em] text-color-tinta/55">
                  {repos.length} {lang === 'es' ? 'proyectos' : 'projects'}
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
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
  )
}

export default GaleriaPage
