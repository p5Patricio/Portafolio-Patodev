import { useEffect, useMemo } from 'react'
import { Globe, Lock } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { useLanguage } from '../context/LanguageContext'
import { ALL_REPOS_BY_YEAR, type Repo } from '../data/repos'
import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import Crosshair from '../components/Crosshair'
import TextLink from '../components/TextLink'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import type { Lang } from '../data/translations'

const TOP_ANCHOR_ID = 'galeria-top'
const LINK_ICON = 'h-4 w-4 shrink-0'

/** "Rey Asesino" -> "RA", "Faro" -> "FA" (single-word names have no gap to split on). */
function getInitials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

type ProjectCellProps = {
  repo: Repo
  lang: Lang
  demoLabel: string
  codeLabel: string
  backendLabel: string
  privateLabel: string
  delay: number
}

function ProjectCell({ repo, lang, demoLabel, codeLabel, backendLabel, privateLabel, delay }: ProjectCellProps) {
  const image = repo.images?.[0]
  const showDemo = !!repo.liveUrl
  const showCode = !repo.isPrivate && !!repo.repoUrl
  const showCompanion = !repo.isPrivate && !!repo.companionUrl
  const isPrivateNoDemo = repo.isPrivate && !repo.liveUrl

  return (
    <Reveal delay={delay} className="group flex flex-col border-r border-b border-line p-5 transition-colors duration-300 hover:bg-surface md:p-6">
      <div className="aspect-[16/10] overflow-hidden rounded">
        {image ? (
          <img
            src={image}
            alt={repo.name}
            width={640}
            height={400}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center border border-line bg-ink">
            <Crosshair className="absolute left-3 top-3 h-3 w-3" />
            <Crosshair className="absolute bottom-3 right-3 h-3 w-3" />
            <span className="font-stretch-wide text-3xl font-extrabold text-muted">{getInitials(repo.name)}</span>
          </div>
        )}
      </div>

      <p className="mono-label mt-4 text-[12px] text-muted">{repo.subtitle[lang]}</p>
      <h3 className="mt-1 text-lg font-semibold text-paper">{repo.name}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{repo.description[lang]}</p>

      <div className="mt-auto flex flex-wrap items-center gap-5 pt-5">
        {showDemo && (
          <TextLink
            href={repo.liveUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label inline-flex items-center gap-1.5 text-xs"
          >
            <Globe className={LINK_ICON} aria-hidden="true" />
            {demoLabel}
          </TextLink>
        )}
        {showCode && (
          <TextLink
            href={repo.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label inline-flex items-center gap-1.5 text-xs"
          >
            <FaGithub className={LINK_ICON} aria-hidden="true" />
            {codeLabel}
          </TextLink>
        )}
        {showCompanion && (
          <TextLink
            href={repo.companionUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label inline-flex items-center gap-1.5 text-xs"
          >
            <FaGithub className={LINK_ICON} aria-hidden="true" />
            {backendLabel}
          </TextLink>
        )}
        {isPrivateNoDemo && (
          <span className="mono-label inline-flex items-center gap-1.5 text-[12px] text-muted">
            <Lock className={LINK_ICON} aria-hidden="true" />
            {privateLabel}
          </span>
        )}
      </div>
    </Reveal>
  )
}

function GaleriaPage() {
  const { t, lang } = useLanguage()
  const g = t.galeria

  const byYear = useMemo(() => {
    const map = new Map<number, Repo[]>()
    for (const repo of ALL_REPOS_BY_YEAR) {
      const list = map.get(repo.year) ?? []
      list.push(repo)
      map.set(repo.year, list)
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0])
  }, [])

  const totalCount = ALL_REPOS_BY_YEAR.length

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <Section id={TOP_ANCHOR_ID} first ariaLabelledBy="galeria-heading">
      <TextLink to="/" className="mono-label inline-flex items-center gap-2 text-xs">
        ← {g.backHome}
      </TextLink>

      <div className="mt-8">
        <SectionHeader
          as="h1"
          id="galeria-heading"
          index={g.archiveLabel}
          label={`${totalCount} ${lang === 'es' ? 'PROYECTOS' : 'PROJECTS'}`}
          title={g.title}
          intro={g.intro}
        />
      </div>

      <div className="mt-14 flex flex-col gap-16 md:mt-20">
        {byYear.map(([year, repos]) => (
          <div key={year}>
            <p className="mono-label border-b border-line pb-3 text-[12px] text-sky">
              {g.yearLabel} {year}
            </p>
            <div className="grid grid-cols-1 border-l border-line md:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, i) => (
                <ProjectCell
                  key={repo.id}
                  repo={repo}
                  lang={lang}
                  demoLabel={t.proyectos.demoLabel}
                  codeLabel={t.proyectos.codeLabel}
                  backendLabel={t.proyectos.backendLabel}
                  privateLabel={t.proyectos.privateLabel}
                  delay={(i % 3) * 70}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer backToTopLabel={t.contacto.backToTop} backToTopHref={`#${TOP_ANCHOR_ID}`} />
    </Section>
  )
}

export default GaleriaPage
