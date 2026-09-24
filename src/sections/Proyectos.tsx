import { Globe, Lock } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import TextLink from '../components/TextLink'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'
import { FEATURED_REPOS } from '../data/repos'
import type { Repo } from '../data/repos'
import type { Lang } from '../data/translations'

// First three featured repos, in the existing landing order.
const HOME_PROJECTS: Repo[] = FEATURED_REPOS.slice(0, 3)

const LINK_ICON = 'h-4 w-4 shrink-0'

type ProjectRowProps = {
  repo: Repo
  lang: Lang
  demoLabel: string
  codeLabel: string
  backendLabel: string
  privateLabel: string
  first: boolean
}

function ProjectRow({ repo, lang, demoLabel, codeLabel, backendLabel, privateLabel, first }: ProjectRowProps) {
  const image = repo.images?.[0]
  const showDemo = !!repo.liveUrl
  const showCode = !repo.isPrivate && !!repo.repoUrl
  const showCompanion = !repo.isPrivate && !!repo.companionUrl
  const isPrivateNoDemo = repo.isPrivate && !repo.liveUrl

  return (
    <Reveal
      className={`grid grid-cols-1 gap-6 pt-[clamp(2rem,4vw,3.5rem)] pb-[clamp(2rem,4vw,3.5rem)] first:pt-0 lg:grid-cols-12 lg:items-center ${
        first ? '' : 'border-t border-line'
      }`}
    >
      <div className="order-1 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-start-1">
        {image ? (
          <div className="group aspect-[16/10] overflow-hidden rounded">
            <img
              src={image}
              alt={repo.name}
              width={900}
              height={563}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center rounded border border-line bg-surface">
            <span className="mono-label text-[12px] text-muted">{repo.name}</span>
          </div>
        )}
      </div>

      <div className="order-2 flex flex-col gap-4 lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-1">
        <p className="mono-label text-[12px] text-muted">
          {repo.year} · {repo.subtitle[lang]}
        </p>

        <h3 className="font-stretch-wide text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-paper">
          {repo.name}
        </h3>

        <p className="line-clamp-4 text-sm text-muted lg:line-clamp-3 md:text-base">{repo.description[lang]}</p>

        <div className="mt-1 flex flex-wrap items-center gap-5">
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
      </div>
    </Reveal>
  )
}

function Proyectos() {
  const { t, lang } = useLanguage()

  return (
    <Section id="proyectos" ariaLabelledBy="proyectos-heading">
      <SectionHeader
        id="proyectos-heading"
        index="01"
        label={t.nav.trabajo}
        title={t.proyectos.title}
        meta={
          <TextLink to="/galeria" className="mono-label hidden text-[12px] md:inline">
            {t.proyectos.viewAll} →
          </TextLink>
        }
        intro={t.proyectos.intro}
      />

      <div className="mt-10 md:mt-14">
        {HOME_PROJECTS.map((repo, i) => (
          <ProjectRow
            key={repo.id}
            repo={repo}
            lang={lang}
            demoLabel={t.proyectos.demoLabel}
            codeLabel={t.proyectos.codeLabel}
            backendLabel={t.proyectos.backendLabel}
            privateLabel={t.proyectos.privateLabel}
            first={i === 0}
          />
        ))}
      </div>

      <Reveal className="mt-8 md:hidden">
        <TextLink to="/galeria" className="mono-label text-xs">
          {t.proyectos.viewAll} →
        </TextLink>
      </Reveal>
    </Section>
  )
}

export default Proyectos
