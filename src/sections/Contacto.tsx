import { useState, type FormEvent, type ReactNode } from 'react'
import { Copy, Check } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { useLanguage } from '../context/LanguageContext'
import Section from '../components/Section'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import TextLink from '../components/TextLink'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

type FieldProps = {
  id: string
  label: string
  children: ReactNode
}

function Field({ id, label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="mono-label text-[12px] text-muted">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full border-b border-line bg-transparent py-2.5 text-sm text-paper placeholder:text-muted/60 outline-none transition-colors focus:border-sky disabled:opacity-60'

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                  disabled={status === 'sending'}
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
                  disabled={status === 'sending'}
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
                disabled={status === 'sending'}
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
                disabled={status === 'sending'}
                required
              />
            </Field>

            <div className="mt-2 flex flex-col items-start gap-3">
              <Button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                ariaLabel={status === 'sending' ? c.form.sending : c.form.submit}
              >
                {status === 'sending' ? c.form.sending : c.form.submit}
              </Button>
              <div aria-live="polite">
                {status === 'success' && <p className="text-xs font-medium text-paper">{c.form.success}</p>}
                {status === 'error' && <p className="text-xs font-medium text-coral">{c.form.error}</p>}
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
