import { useState, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Copy, Check, CircleAlert } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { useLanguage } from '../context/LanguageContext'
import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import TextLink from '../components/TextLink'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'
import { DURATION, EASE, TRANSITION } from '../lib/motion'

type FieldProps = {
  id: string
  label: string
  children: ReactNode
}

function Field({ id, label, children }: FieldProps) {
  return (
    <div className="group/field flex flex-col gap-2">
      <label
        htmlFor={id}
        className="mono-label text-[12px] text-muted transition-colors duration-(--motion-duration-fast) ease-out-quart group-focus-within/field:text-paper"
      >
        {label}
      </label>
      <div className="relative">
        {children}
        {/* Focus underline: draws left-to-right over the hairline border.
            Driven by :focus-within, so mouse and keyboard focus look the same. */}
        <span
          data-focus-line
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-sky transition-transform duration-(--motion-duration-base) ease-out-expo group-focus-within/field:scale-x-100 motion-reduce:transition-none"
        />
      </div>
    </div>
  )
}

const inputClass =
  'block w-full border-b border-line bg-transparent py-2.5 text-sm text-paper placeholder:text-muted/60 outline-none transition-colors duration-(--motion-duration-fast) ease-out-quart hover:border-muted disabled:opacity-60'

/** Distance, as a share of its own height, the status message rises from behind its mask. */
const STATUS_MASK_OFFSET = '100%'

/** Status message entrance: rises out of an overflow mask while fading in. */
const statusMotion = {
  initial: { opacity: 0, y: STATUS_MASK_OFFSET },
  animate: { opacity: 1, y: 0, transition: TRANSITION.base },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE.outQuart } },
}

/** Cross-fade shared by the stacked submit labels (idle / sending). */
const LABEL_SWAP =
  '[grid-area:1/1] inline-flex items-center justify-center gap-2 transition-[opacity,transform] duration-(--motion-duration-fast) ease-out-quart motion-reduce:transition-none'

function Contacto() {
  const { t } = useLanguage()
  const c = t.contacto

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [copied, setCopied] = useState(false)
  const sending = status === 'sending'

  const copyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(c.info.email.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Silently fail if clipboard API is unavailable
    }
  }

  const handleChange = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '', website: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contacto" ariaLabelledBy="contacto-heading">
      <SectionHeader id="contacto-heading" index="05" label={t.nav.contacto} title={c.heading} />

      <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="max-w-[42ch] text-sm text-muted md:text-base">{c.intro.join(' ')}</p>

          <div className="mt-6 flex items-center gap-1 sm:flex-wrap sm:gap-4">
            <a
              href={c.info.email.href}
              className="min-w-0 break-all text-lg text-paper underline decoration-line underline-offset-4 transition-colors hover:text-sky hover:decoration-sky outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2 md:text-xl"
            >
              {c.info.email.value}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="mono-label relative inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 text-[12px] text-muted sm:min-w-0 sm:justify-start outline-none transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-sky sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only">{c.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  <span className="sr-only sm:not-sr-only">{c.copy}</span>
                </>
              )}
            </button>
          </div>

          <p className="mono-label mt-3 text-[12px] text-muted">{c.info.location.value}</p>

          <div className="mt-6 flex items-center gap-6">
            <TextLink
              href={c.info.github.href!}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label inline-flex items-center gap-1.5 text-[12px]"
            >
              <FaGithub className="h-4 w-4 shrink-0" aria-hidden="true" />
              GitHub
            </TextLink>
            <TextLink
              href={c.info.linkedin.href!}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label inline-flex items-center gap-1.5 text-[12px]"
            >
              <FaLinkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
              LinkedIn
            </TextLink>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <form onSubmit={handleSubmit} aria-busy={sending} className="flex flex-col gap-6">
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange('website')}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field id="contact-name" label={c.form.nameLabel}>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder={c.form.namePlaceholder}
                  className={inputClass}
                  autoComplete="name"
                  maxLength={120}
                  disabled={sending}
                  required
                />
              </Field>
              <Field id="contact-email" label={c.form.emailLabel}>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder={c.form.emailPlaceholder}
                  className={inputClass}
                  autoComplete="email"
                  maxLength={254}
                  disabled={sending}
                  required
                />
              </Field>
            </div>

            <Field id="contact-subject" label={c.form.subjectLabel}>
              <input
                id="contact-subject"
                type="text"
                value={form.subject}
                onChange={handleChange('subject')}
                placeholder={c.form.subjectPlaceholder}
                className={inputClass}
                maxLength={160}
                disabled={sending}
                required
              />
            </Field>

            <Field id="contact-message" label={c.form.messageLabel}>
              <textarea
                id="contact-message"
                rows={4}
                value={form.message}
                onChange={handleChange('message')}
                placeholder={c.form.messagePlaceholder}
                className={`${inputClass} resize-none`}
                minLength={10}
                maxLength={2000}
                disabled={sending}
                required
              />
            </Field>

            <div className="mt-2 flex flex-col items-start gap-3">
              <Button
                type="submit"
                disabled={sending || status === 'success'}
                ariaLabel={sending ? c.form.sending : c.form.submit}
              >
                {/* Both labels share one grid cell, so the button keeps the
                    width of the longer one and never shifts while sending. */}
                <span className="grid">
                  <span
                    aria-hidden={sending || undefined}
                    className={`${LABEL_SWAP} ${sending ? '-translate-y-1 opacity-0' : ''}`}
                  >
                    {c.form.submit}
                  </span>
                  <span
                    aria-hidden={!sending || undefined}
                    className={`${LABEL_SWAP} ${sending ? '' : 'translate-y-1 opacity-0'}`}
                  >
                    <svg
                      data-testid="submit-spinner"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 animate-spin [animation-duration:var(--motion-duration-slower)] motion-reduce:animate-none"
                    >
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
                      <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>{c.form.sending}</span>
                  </span>
                </span>
              </Button>
              {/* Always mounted so assistive tech announces each new status.
                  min-h reserves one line so the first message adds no shift. */}
              <div aria-live="polite" aria-atomic="true" className="min-h-4 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'success' && (
                    <m.p key="success" {...statusMotion} className="flex items-start gap-1.5 text-xs font-medium text-paper">
                      <Check className="mt-px h-3.5 w-3.5 shrink-0 text-sky" aria-hidden="true" />
                      {c.form.success}
                    </m.p>
                  )}
                  {status === 'error' && (
                    <m.p key="error" {...statusMotion} className="flex items-start gap-1.5 text-xs font-medium text-coral">
                      <CircleAlert className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {c.form.error}
                    </m.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </Reveal>
      </div>

      <Footer backToTopLabel={c.backToTop} backToTopHref="#inicio" />
    </Section>
  )
}

export default Contacto
