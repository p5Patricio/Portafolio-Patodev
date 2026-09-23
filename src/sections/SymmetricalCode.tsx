import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import TextLink from '../components/TextLink'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'

const STUDIO_URL = 'https://symmetrical-code.vercel.app'

function SymmetricalCode() {
  const { t } = useLanguage()
  const s = t.symmetricalCode

  return (
    <Section id="symmetrical-code" ariaLabelledBy="symmetrical-code-heading">
      <SectionHeader
        id="symmetrical-code-heading"
        index="04"
        label={t.nav.symmetricalCode}
        title={s.title}
        intro={s.intro}
      />

      <p className="mono-label mt-4 text-[11px] text-sky">{s.tagline}</p>

      <div className="mt-10 grid grid-cols-1 border-t border-l border-line md:mt-14 md:grid-cols-2">
        {s.services.map((service, i) => (
          <Reveal
            key={service.title}
            delay={i * 70}
            className="border-r border-b border-line p-6 md:p-8"
          >
            <p className="mono-label text-[11px] text-sky">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 text-lg font-semibold text-paper">{service.title}</h3>
            <p className="mt-2 text-sm text-muted">{service.description}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap items-center gap-6 md:mt-14">
        <Button href={STUDIO_URL} ariaLabel={s.ctaVisit}>
          {s.ctaVisit}
        </Button>
        <TextLink href="#contacto" className="mono-label text-xs">
          {s.ctaContact}
        </TextLink>
      </Reveal>
    </Section>
  )
}

export default SymmetricalCode
