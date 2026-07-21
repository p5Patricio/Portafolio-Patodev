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
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.33, 1, 0.68, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl liquid-glass transition-all duration-300 shadow-xl hover:border-color-accent/40"
    >
      {/* Micro-accent (Red dot) */}
      <div className="absolute top-4 right-4 z-30 accent-red-dot opacity-60 transition-opacity group-hover:opacity-100" />

      {/* Image carousel */}
      <div className="relative">
        <ProjectCarousel images={images} title={repo.name} />

        {/* Minimal info pill */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 backdrop-blur-md">
          <Terminal className="w-3 h-3 text-color-accent" />
          <span className="text-[0.55rem] font-black text-color-accent uppercase tracking-[0.2em]">
            {repo.id.slice(0, 4)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col items-center gap-2.5 px-5 pt-5 pb-6 text-center">
        <h3 className="text-xl font-bold leading-none tracking-tight text-color-tinta md:text-2xl">
          {repo.name}
        </h3>

        {/* Subtitle */}
        <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-color-accent-alt">
          {subtitle}
        </p>

        <p className="text-color-tinta/90 text-xs md:text-sm leading-relaxed max-w-[19rem]">
          {description}
        </p>

        {/* Private indicator */}
        {repo.isPrivate && (
          <div className="flex items-center gap-1 text-[0.65rem] font-bold text-color-danger uppercase tracking-widest opacity-90">
            <Lock className="w-3 h-3" />
            {lang === 'es' ? 'Acceso Privado' : 'Private Access'}
          </div>
        )}

        {/* Minimal Divider */}
        <div className="mt-1 flex w-full max-w-[7rem] items-center gap-2 opacity-50">
          <span className="flex-1 h-px tricolor-separator rounded-full" />
        </div>

        {/* Tech icons */}
        <ul className="mt-1 mb-4 flex flex-wrap items-center justify-center gap-3">
          {repo.technologies.map((techId) => (
            <li key={techId}>
              <TechIcon
                id={techId}
                className="h-5 w-5 text-color-tinta/50 transition-colors hover:text-color-accent"
              />
            </li>
          ))}
        </ul>

        {/* CTA row */}
        <div className="mt-auto flex flex-wrap items-center justify-center gap-3">
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
              whileHover={{ x: 2, opacity: 1 }}
              className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.2em] font-black text-color-tinta/50 transition-all hover:text-color-accent"
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
