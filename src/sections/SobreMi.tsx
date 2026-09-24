import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import ScrollWords from '../components/ScrollWords'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'
import { SKILL_CATEGORIES } from '../data/skills'
import TechIcon, { TECH_LABELS } from '../components/TechIcon'

function SobreMi() {
  const { t, lang } = useLanguage()

  return (
    <Section id="sobre-mi" ariaLabelledBy="sobre-mi-heading">
      <SectionHeader id="sobre-mi-heading" index="03" label={t.nav.sobreMi} title={t.sobreMi.title} />

      <ScrollWords text={t.sobreMi.para1} className="mt-10 max-w-[65ch] text-base leading-relaxed md:mt-14 md:text-lg" />

      <Reveal className="mt-14 md:mt-20">
        <p className="mono-label text-[12px] text-sky">{t.sobreMi.stackLabel}</p>

        <div className="mt-8 flex flex-col gap-12 md:mt-10 md:gap-14 lg:gap-16">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.id} className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
              <h3 className="font-stretch-wide text-[clamp(1.5rem,2.2vw,2.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-muted lg:col-span-4 lg:min-w-0 lg:pr-4">
                {category.title[lang]}
              </h3>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-5 lg:col-span-8">
                {category.skills.map((skillId) => (
                  <div key={skillId} className="flex items-center gap-2.5">
                    <TechIcon id={skillId} className="h-9 w-9 shrink-0 md:h-10 md:w-10" />
                    <span className="mono-label text-[13px] tracking-[0.06em] text-paper/85 md:text-[14px]">
                      {TECH_LABELS[skillId]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

export default SobreMi
