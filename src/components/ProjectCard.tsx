import { motion } from 'framer-motion'
import { ExternalLink, Globe, Lock, Terminal } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import type { Repo } from '../data/repos'
import type { Lang } from '../data/translations'
import ProjectCarousel from './ProjectCarousel'
import TechIcon from './TechIcon'
import PillButton from './PillButton'

type Props = {
  repo: Repo
  lang: Lang
  /** Localized "View project" button label. */
  viewProjectLabel: string
  /** Localized "Visit site" button label. */
  visitSiteLabel: string
  index?: number
}

/**
 * Elegant Glass Project Card.
 * Sophisticated balance: Heavy Cyan (Buttons), Medium Yellow (Titles),
 * and subtle Red micro-accents (Status dot).
 */
function ProjectCard({ repo, lang, viewProjectLabel, visitSiteLabel, index = 0 }: Props) {
  const subtitle = repo.subtitle[lang]
  const description = repo.description[lang]
  const images = repo.images ?? []
  const hasLiveUrl = !!repo.liveUrl
  const primaryUrl = repo.liveUrl ?? repo.repoUrl
  const ctaLabel = hasLiveUrl ? visitSiteLabel : viewProjectLabel
  const CtaIcon = hasLiveUrl ? Globe : ExternalLink

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] glass-card transition-all duration-500"
    >
      {/* --- Micro-accent (Red dot) --- */}
      <div className="absolute top-5 right-5 z-30 accent-red-dot opacity-55 transition-opacity group-hover:opacity-100" />

      {/* Image carousel */}
      <div className="relative">
        <ProjectCarousel images={images} title={repo.name} />
        
        {/* Minimal info pill (Cyan) */}
        <div className="absolute top-5 left-5 z-10 flex items-center gap-2 rounded-full border border-color-accent/10 bg-color-accent/5 px-3 py-1 backdrop-blur-md">
          <Terminal className="w-3 h-3 text-color-accent" />
          <span className="text-[0.6rem] font-black text-color-accent uppercase tracking-[0.2em]">
            {repo.id.slice(0, 4)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col items-center gap-3.5 px-7 pt-8 pb-10 text-center">
        <h3 className="text-2xl font-black leading-none tracking-tight text-color-tinta md:text-3xl">
          {repo.name}
        </h3>
        
        {/* Subtitle (Yellow accent) */}
        <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-color-accent-alt">
          {subtitle}
        </p>
        
        <p className="text-color-tinta/90 text-fluid-sm leading-relaxed max-w-[20rem]">
          {description}
        </p>

        {/* Private indicator (Red accent text) */}
        {repo.isPrivate && (
          <div className="flex items-center gap-1.5 text-[0.7rem] font-bold text-color-danger uppercase tracking-widest mt-1 opacity-80">
            <Lock className="w-3 h-3" />
            {lang === 'es' ? 'Acceso Privado' : 'Private Access'}
          </div>
        )}

        {/* Minimal Divider */}
        <div className="mt-2 flex w-full max-w-[8.5rem] items-center gap-3 opacity-65">
          <span className="flex-1 h-px tricolor-separator rounded-full" />
        </div>

        {/* Tech icons (Blue tint) */}
        <ul className="mt-3 mb-6 flex flex-wrap items-center justify-center gap-4">
          {repo.technologies.map((techId) => (
            <li key={techId}>
              <TechIcon
                id={techId}
                className="h-6 w-6 text-color-tinta/35 transition-colors hover:text-color-accent"
              />
            </li>
          ))}
        </ul>

        {/* CTA row (Cyan focus) */}
        <div className="mt-auto flex flex-col items-center gap-5 sm:flex-row">
          <PillButton
            href={primaryUrl}
            ariaLabel={`${ctaLabel}: ${repo.name}`}
          >
            {ctaLabel}
            <CtaIcon className="w-4 h-4" strokeWidth={2.5} />
          </PillButton>

          {!repo.isPrivate && hasLiveUrl && (
            <motion.a
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub: ${repo.name}`}
              whileHover={{ x: 3, opacity: 1 }}
              className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.3em] font-black text-color-tinta/30 transition-all"
            >
              <SiGithub className="w-5 h-5 fill-current" />
              <span>Repo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
