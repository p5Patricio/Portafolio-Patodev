import { motion } from 'framer-motion'
import { ExternalLink, Globe, Lock, Terminal, Sparkles } from 'lucide-react'
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.33, 1, 0.68, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl liquid-glass border border-white/10 transition-all duration-300 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.6)] hover:border-color-accent/50 hover:shadow-[0_20px_50px_-15px_rgba(0,216,240,0.18)]"
    >
      {/* Top light glow bar */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-color-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Image carousel / thumbnail container */}
      <div className="relative overflow-hidden">
        <ProjectCarousel images={images} title={repo.name} repoId={repo.id} />

        {/* Minimal info pill badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 backdrop-blur-md shadow-md">
          <Terminal className="w-3.5 h-3.5 text-color-accent" />
          <span className="text-[0.6rem] font-bold text-color-accent uppercase tracking-[0.2em]">
            {repo.id.slice(0, 5)}
          </span>
        </div>

        {/* Featured Badge */}
        {repo.featured && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full border border-color-accent-alt/40 bg-black/60 px-2.5 py-0.5 backdrop-blur-md shadow-md">
            <Sparkles className="w-3 h-3 text-color-accent-alt" />
            <span className="text-[0.58rem] font-bold text-color-accent-alt uppercase tracking-widest">
              {lang === 'es' ? 'Destacado' : 'Featured'}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col items-center gap-3 px-6 pt-5 pb-6 text-center">
        <h3 className="text-xl font-display font-bold leading-snug tracking-tight text-white md:text-2xl transition-colors group-hover:text-color-accent">
          {repo.name}
        </h3>

        {/* Subtitle pill */}
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-color-accent-alt bg-color-accent-alt/10 border border-color-accent-alt/20 rounded-full px-3 py-0.5">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-color-tinta/90 text-sm md:text-base leading-relaxed max-w-[23rem]">
          {description}
        </p>

        {/* Private Access Badge */}
        {repo.isPrivate && (
          <div className="flex items-center gap-1.5 text-[0.62rem] font-bold text-color-danger bg-color-danger/10 border border-color-danger/20 rounded-full px-3 py-0.5 uppercase tracking-widest">
            <Lock className="w-3 h-3" />
            {lang === 'es' ? 'Acceso Privado' : 'Private Access'}
          </div>
        )}

        {/* Divider */}
        <div className="mt-1 flex w-full max-w-[8rem] items-center gap-2 opacity-60">
          <span className="flex-1 h-px tricolor-separator rounded-full" />
        </div>

        {/* Tech icons stack */}
        <ul className="mt-1 mb-3 flex flex-wrap items-center justify-center gap-3">
          {repo.technologies.map((techId) => (
            <li key={techId} className="transition-transform duration-200 hover:scale-110">
              <TechIcon
                id={techId}
                className="h-5 w-5 text-color-tinta/60 transition-colors hover:text-color-accent"
              />
            </li>
          ))}
        </ul>

        {/* Action CTA Buttons */}
        <div className="mt-auto flex flex-wrap items-center justify-center gap-3 pt-2">
          <PillButton
            href={primaryUrl}
            ariaLabel={`${ctaLabel}: ${repo.name}`}
          >
            {ctaLabel}
            <CtaIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
          </PillButton>

          {!repo.isPrivate && hasLiveUrl && (
            <motion.a
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub: ${repo.name}`}
              whileHover={{ x: 2 }}
              className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.2em] font-bold text-color-tinta/60 transition-all hover:text-color-accent"
            >
              <SiGithub className="w-4 h-4 fill-current" />
              <span>Repo</span>
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
