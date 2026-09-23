import { motion } from 'framer-motion'
import { Rocket, Workflow, CloudCog, ShieldCheck, ArrowUpRight, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SectionHeader from '../components/SectionHeader'
import PillButton from '../components/PillButton'

const SERVICE_ICONS: LucideIcon[] = [Rocket, Workflow, CloudCog, ShieldCheck]

const STUDIO_URL = 'https://symmetrical-code.vercel.app'

function SymmetricalCode() {
  const { t } = useLanguage()
  const s = t.symmetricalCode

  return (
    <section
      id="symmetrical-code"
      aria-labelledby="symmetrical-code-heading"
      className="relative z-10 overflow-hidden px-6 py-12 md:py-16 lg:py-20 md:px-12 lg:px-24 flex flex-col items-center"
    >
      <div className="relative z-10 w-full flex flex-col items-center">
        <SectionHeader id="symmetrical-code-heading" title={s.title} size="lg" intro={s.intro} />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="mt-4 text-center text-color-accent-alt text-sm md:text-base font-bold uppercase tracking-[0.25em] italic"
        >
          {s.tagline}
        </motion.p>

        {/* Service highlights grid */}
        <div className="w-full max-w-5xl mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {s.services.map((service, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length]
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                className="group flex items-start gap-4 liquid-glass rounded-2xl p-5 md:p-6 shadow-xl border border-white/10 hover:border-color-accent/40 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-color-accent/10 border border-color-accent/20 text-color-accent transition-colors group-hover:bg-color-accent/20">
                  <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-color-tinta text-base md:text-lg tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-color-tinta/80 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <PillButton href={STUDIO_URL} ariaLabel={s.ctaVisit}>
            <span>{s.ctaVisit}</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </PillButton>

          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-color-tinta/70 hover:text-color-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-color-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full px-2 py-1"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
            <span>{s.ctaContact}</span>
          </a>
        </motion.div>

        {/* Bottom ornament */}
        <div className="flex items-center gap-3 mt-14">
          <span className="h-0.5 w-10 tricolor-separator rounded-full" />
          <div className="w-1.5 h-1.5 rounded-full tricolor-dot" />
          <span className="h-0.5 w-10 tricolor-separator rounded-full" />
        </div>
      </div>
    </section>
  )
}

export default SymmetricalCode
