import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import TextLink from '../components/TextLink'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'
import { FEATURED_REPOS } from '../data/repos'
import { TECH_LABELS } from '../components/TechIcon'
import type { Repo } from '../data/repos'
import type { Lang } from '../data/translations'

// First three featured repos, in the existing landing order.
const HOME_PROJECTS: Repo[] = FEATURED_REPOS.slice(0, 3)

type ProjectRowProps = {
  repo: Repo
  lang: Lang
  demoLabel: string
  codeLabel: string
  first: boolean
}

function ProjectRow({ repo, lang, demoLabel, codeLabel, first }: ProjectRowProps) {
  const image = repo.images?.[0]
  const showDemo = !!repo.liveUrl
  const showCode = !repo.isPrivate && !!repo.repoUrl
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
            <span className="mono-label text-[11px] text-muted">{repo.name}</span>
          </div>
        )}
      </div>

      <div className="order-2 flex flex-col gap-3 lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-1">
        <p className="mono-label text-[11px] text-muted">
          {repo.year} · {repo.subtitle[lang]}
        </p>

        <h3 className="font-stretch-wide text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-paper">
          {repo.name}
        </h3>

        <p className="line-clamp-4 text-sm text-muted lg:line-clamp-3 md:text-base">{repo.description[lang]}</p>

        <p className="mono-label text-[11px] text-muted">
          {repo.technologies.map((techId) => `[${TECH_LABELS[techId]}]`).join(' — ')}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-5">
          {showDemo && (
            <TextLink href={repo.liveUrl!} target="_blank" rel="noopener noreferrer" className="mono-label text-xs">
              {demoLabel}
            </TextLink>
          )}
          {showCode && (
            <TextLink href={repo.repoUrl} target="_blank" rel="noopener noreferrer" className="mono-label text-xs">
              {codeLabel}
            </TextLink>
          )}
          {isPrivateNoDemo && (
            <span className="mono-label text-[11px] text-muted">
              [{lang === 'es' ? 'PRIVADO' : 'PRIVATE'}]
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
          <TextLink to="/galeria" className="mono-label hidden text-[11px] md:inline">
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
