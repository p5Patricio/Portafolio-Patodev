import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import TextLink from '../components/TextLink'
import Reveal from '../components/Reveal'
import { useLanguage } from '../context/LanguageContext'

const ENTRY_IDS = ['universidad', 'mazda'] as const

const CERTIFICATE_IMAGES = ['/certificacion-ia.webp', '/cert-tecnm-ia.webp', '/cert-mouredev-ia.webp']

/** Splits a single-paragraph description into 2-3 short bullet lines. */
function toBullets(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3)
}

function Experiencia() {
  const { t, lang } = useLanguage()
  const e = t.experiencia

  return (
    <Section id="experiencia" ariaLabelledBy="experiencia-heading">
      <SectionHeader
        id="experiencia-heading"
        index="02"
        label={t.nav.experiencia}
        title={e.title}
        meta={`${ENTRY_IDS.length} ${lang === 'es' ? 'ENTRADAS' : 'ENTRIES'}`}
        intro={e.intro}
      />

      <div className="mt-10 md:mt-14">
        {ENTRY_IDS.map((id, i) => {
          const item = e.items[i]
          if (!item) return null
          return (
            <Reveal
              key={id}
              className={`grid grid-cols-1 gap-3 py-10 first:pt-0 md:grid-cols-12 md:gap-8 ${
                i === 0 ? '' : 'border-t border-line'
              }`}
            >
              <p className="mono-label text-[11px] text-muted md:col-span-3">{item.period}</p>
              <div className="md:col-span-9">
                <h3 className="text-lg font-semibold text-paper md:text-xl">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.institution}</p>
                <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted md:text-base">
                  {toBullets(item.description).map((line, j) => (
                    <li key={j} className="flex gap-2">
                      <span aria-hidden="true" className="text-sky">
                        —
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>

      <Reveal className="mt-14 md:mt-20">
        <p className="mono-label text-[11px] text-sky">{e.certificacionesTitle}</p>
        <div className="mt-4">
          {e.certificaciones.map((cert, i) => (
            <div
              key={cert.name}
              className={`flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
                i === 0 ? '' : 'border-t border-line'
              }`}
            >
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="text-sm font-medium text-paper">{cert.name}</span>
                <span className="text-sm text-muted">
                  {cert.institution} · {cert.period}
                </span>
              </div>
              <TextLink
                href={CERTIFICATE_IMAGES[i] ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label w-fit text-xs"
              >
                {e.viewCert} ↗
              </TextLink>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

export default Experiencia
