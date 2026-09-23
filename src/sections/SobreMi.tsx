import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import ScrollWords from '../components/ScrollWords'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'
import { SKILL_CATEGORIES } from '../data/skills'
import { TECH_LABELS } from '../components/TechIcon'

function SobreMi() {
  const { t, lang } = useLanguage()

  return (
    <Section id="sobre-mi" ariaLabelledBy="sobre-mi-heading">
      <SectionHeader id="sobre-mi-heading" index="03" label={t.nav.sobreMi} title={t.sobreMi.title} />

      <ScrollWords text={t.sobreMi.para1} className="mt-10 max-w-[65ch] text-base leading-relaxed md:mt-14 md:text-lg" />

      <Reveal className="mt-12 md:mt-16">
        <p className="mono-label text-[11px] text-sky">{t.sobreMi.stackLabel}</p>
        <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.id}>
              <p className="mono-label text-[11px] text-muted">{category.title[lang]}</p>
              <p className="mt-3 flex flex-wrap gap-x-1.5 gap-y-1 text-sm text-paper">
                {category.skills.map((skillId, i) => (
                  <span key={skillId} className="mono-label text-[11px]">
                    {TECH_LABELS[skillId]}
                    {i < category.skills.length - 1 && <span className="text-muted"> /</span>}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

export default SobreMi
