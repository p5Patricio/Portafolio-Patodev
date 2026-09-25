import { ChevronDown } from 'lucide-react'
import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import ScrollWords from '../components/ScrollWords'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'
import { SKILL_CATEGORIES, type SkillCategory } from '../data/skills'
import TechIcon, { TECH_LABELS } from '../components/TechIcon'
import useIsCompactViewport from '../hooks/useIsCompactViewport'
import type { Lang } from '../data/translations'

/** The tech-icon + label row shared by both the collapsible and the
 *  always-expanded category layouts. */
function SkillIcons({ category }: { category: SkillCategory }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-5">
      {category.skills.map((skillId) => (
        <div key={skillId} className="flex items-center gap-2.5">
          <TechIcon id={skillId} className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
          <span className="mono-label text-[13px] tracking-[0.06em] text-paper/85 md:text-[14px]">
            {TECH_LABELS[skillId]}
          </span>
        </div>
      ))}
    </div>
  )
}

const CATEGORY_TITLE_CLASS =
  'font-stretch-wide text-[clamp(1.5rem,2.2vw,2.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-muted'

/** <lg: a real <details> per category, collapsed by default — a tap reveals
 *  the tools. Native disclosure, so it works with no JS at all. */
function CollapsibleCategory({ category, lang }: { category: SkillCategory; lang: Lang }) {
  return (
    <details className="skill-category group border-b border-line pb-5 last:border-0 last:pb-0">
      <summary
        className={`flex cursor-pointer items-center justify-between gap-4 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2`}
      >
        <h3 className={CATEGORY_TITLE_CLASS}>{category.title[lang]}</h3>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="pt-5">
        <SkillIcons category={category} />
      </div>
    </details>
  )
}

/** lg+: every category fully expanded, side by side with its tools — no
 *  toggle, matches the original always-open desktop layout. */
function ExpandedCategory({ category, lang }: { category: SkillCategory; lang: Lang }) {
  return (
    <div className="grid grid-cols-12 items-start gap-8">
      <h3 className={`${CATEGORY_TITLE_CLASS} col-span-4 min-w-0 pr-4`}>{category.title[lang]}</h3>
      <div className="col-span-8">
        <SkillIcons category={category} />
      </div>
    </div>
  )
}

function SobreMi() {
  const { t, lang } = useLanguage()
  const isCompact = useIsCompactViewport()

  return (
    <Section id="sobre-mi" ariaLabelledBy="sobre-mi-heading">
      <SectionHeader id="sobre-mi-heading" index="03" label={t.nav.sobreMi} title={t.sobreMi.title} />

      <ScrollWords text={t.sobreMi.para1} className="mt-10 max-w-[65ch] text-base leading-relaxed md:mt-14 md:text-lg" />

      <Reveal className="mt-14 md:mt-20">
        <p className="mono-label text-[12px] text-sky">{t.sobreMi.stackLabel}</p>

        <div className="mt-8 flex flex-col gap-12 md:mt-10 md:gap-14 lg:gap-16">
          {SKILL_CATEGORIES.map((category) =>
            isCompact ? (
              <CollapsibleCategory key={category.id} category={category} lang={lang} />
            ) : (
              <ExpandedCategory key={category.id} category={category} lang={lang} />
            )
          )}
        </div>
      </Reveal>
    </Section>
  )
}

export default SobreMi
