import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { FEATURED_REPOS } from '../data/repos'
import SectionHeader from '../components/SectionHeader'
import PillButton from '../components/PillButton'
import ProjectCard from '../components/ProjectCard'

function Proyectos() {
  const { t, lang } = useLanguage()

  return (
    <section
      id="proyectos"
      className="relative z-10 min-h-screen px-6 py-12 md:py-16 lg:py-20 md:px-12 lg:px-24 flex flex-col items-center overflow-hidden"
    >
      <div className="relative z-10 w-full flex flex-col items-center">
        <SectionHeader
          title={t.proyectos.title}
          size="lg"
          intro={t.proyectos.intro}
        />

        {/* Cards grid */}
        <div className="w-full max-w-7xl mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_REPOS.map((repo, i) => (
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="mt-10"
        >
          <PillButton to="/galeria">
            <span className="text-center leading-tight">{t.proyectos.viewAll}</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
              strokeWidth={2.5}
            />
          </PillButton>
        </motion.div>

        {/* Guides / Publications Sub-section */}
        {t.proyectos.guias && t.proyectos.guias.length > 0 && (
          <div className="w-full max-w-5xl mt-16 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-0.5 w-10 md:w-14 tricolor-separator rounded-full" />
              <h3 className="font-bold text-xl md:text-2xl text-color-tinta uppercase tracking-tight">
                {lang === 'es' ? 'Guías Técnicas' : 'Tech Guides'}
              </h3>
              <span className="h-0.5 w-10 md:w-14 tricolor-separator rounded-full" />
            </motion.div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-4">
              {t.proyectos.guias.map((guia, i) => (
                <motion.a
                  key={i}
                  href={guia.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                  className="group relative h-full liquid-glass hover:border-color-accent/40 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-all duration-300 shadow-md"
                >
                  <span className="text-color-tinta/90 group-hover:text-color-tinta font-bold text-xs md:text-sm leading-snug tracking-tight uppercase">
                    {guia.title}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-color-tinta/40 group-hover:text-color-accent transition-colors flex-shrink-0 self-end md:self-auto" strokeWidth={2.5} />
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* Bottom ornament */}
        <div className="flex items-center gap-3 mt-16">
          <span className="h-0.5 w-10 tricolor-separator rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full tricolor-dot" />
          <span className="h-0.5 w-10 tricolor-separator rounded-full" />
        </div>
      </div>
    </section>
  )
}

export default Proyectos
