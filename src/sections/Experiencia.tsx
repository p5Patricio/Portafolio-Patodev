import { useRef } from 'react'
import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import TimelineProgress, { TimelineNode } from '../components/TimelineProgress'
import { useLanguage } from '../context/LanguageContext'

const ENTRY_IDS = ['universidad', 'mazda'] as const

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
  const listRef = useRef<HTMLDivElement>(null)

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

      <div ref={listRef} className="relative mt-10 md:mt-14">
        {/* Timeline sits in existing whitespace, never in the content flow:
            mobile → centered in the 16px page gutter (-0.5rem); md+ → centered
            in the 2rem gap between the period (3/12) and content (9/12)
            columns, i.e. 25% − ¼·gap. Nodes use the same x (− 3px to center
            the 7px square on the 1px line). */}
        <TimelineProgress target={listRef} className="-left-2 md:left-[calc(25%-0.5rem)]" />
        {ENTRY_IDS.map((id, i) => {
          const item = e.items[i]
          if (!item) return null
          return (
            <Reveal
              key={id}
              // `pt-0` by index, not `first:` — the timeline track is the list's first child.
              className={`grid grid-cols-1 gap-3 py-10 md:grid-cols-12 md:gap-8 ${
                i === 0 ? 'pt-0' : 'border-t border-line'
              }`}
            >
              <p className="relative mono-label text-[12px] text-muted md:col-span-3">
                {item.period}
                <TimelineNode className="top-[0.5lh] left-[calc(-0.5rem-3px)] -translate-y-1/2 md:left-[calc(100%+1rem-3px)]" />
              </p>
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
    </Section>
  )
}

export default Experiencia
