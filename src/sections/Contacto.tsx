import { useRef, useState, type FormEvent, type ReactNode, type SVGProps } from 'react'
import { Mail, MapPin, Send, Copy, ExternalLink, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SectionHeader from '../components/SectionHeader'
import FocusBlur, { type FocusBlurItem } from '../components/FocusBlur'
import PillButton from '../components/PillButton'

// ---------- Brand icons ----------

function GitHubIcon({ className, ...props }: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.268 2.742 1.021A9.582 9.582 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.021 2.747-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.679.917.679 1.852 0 1.335-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedInIcon({ className, ...props }: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ---------- Sub-components ----------

type FieldProps = {
  id: string
  label: string
  children: ReactNode
}

function Field({ id, label, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[0.6rem] uppercase tracking-[0.3em] text-color-accent font-black"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-color-tinta placeholder:text-color-tinta/30 focus:outline-none focus:border-color-accent/50 focus:bg-color-accent/5 transition-all'

// ---------- Section ----------

function Contacto() {
  const ref = useRef<HTMLElement>(null)
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

  const copyEmail = async (e: React.MouseEvent<HTMLElement>) => {
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

  const focusBlurItems: FocusBlurItem[] = [
    {
      id: 'github',
      sublabel: c.info.github.label,
      label: c.info.github.value,
      href: c.info.github.href,
      target: '_blank',
      rel: 'noopener noreferrer',
      icon: <GitHubIcon className="w-4 h-4 md:w-5 md:h-5" />,
      actionIcon: <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />,
    },
    {
      id: 'linkedin',
      sublabel: c.info.linkedin.label,
      label: c.info.linkedin.value,
      href: c.info.linkedin.href,
      target: '_blank',
      rel: 'noopener noreferrer',
      icon: <LinkedInIcon className="w-4 h-4 md:w-5 md:h-5" />,
      actionIcon: <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />,
    },
    {
      id: 'email',
      sublabel: c.info.email.label,
      label: copied ? '¡Correo copiado!' : c.info.email.value,
      onClick: copyEmail,
      icon: copied ? (
        <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400" strokeWidth={2.5} />
      ) : (
        <Mail className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
      ),
      actionIcon: copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={2.5} />
      ) : (
        <Copy className="w-3.5 h-3.5" strokeWidth={2.5} />
      ),
    },
    {
      id: 'location',
      sublabel: c.info.location.label,
      label: c.info.location.value,
      href: 'https://www.google.com.mx/maps/place/Guanajuato,+Gto./@21.0250736,-101.2991017,13z/data=!3m1!4b1!4m6!3m5!1s0x842b73f58b0cf1eb:0x25f4b0d165571e74!8m2!3d21.0190145!4d-101.2573586!16zL20vMDE4bmI4?entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D',
      target: '_blank',
      rel: 'noopener noreferrer',
      icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />,
      actionIcon: <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />,
    },
  ]

  return (
    <section
      ref={ref}
      id="contacto"
      className="relative z-10 overflow-hidden pb-12 md:pb-16"
    >
      <div className="relative z-10 px-6 pt-12 pb-12 md:pt-16 md:pb-16 md:px-12 lg:px-24 flex flex-col items-center">
        <SectionHeader
          title={c.title}
          intro={c.intro.join(' ')}
          introDelay={0.3}
        />

        {/* Info + Form Grid */}
        <div className="w-full max-w-6xl mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1.3fr] gap-8 lg:gap-12 items-start">
          {/* Vertical FocusBlur Interactive Links Column */}
          <div className="liquid-glass rounded-2xl p-2 sm:p-3 shadow-xl w-full">
            <FocusBlur items={focusBlurItems} direction="vertical" />
          </div>

          {/* Vertical divider */}
          <div
            aria-hidden="true"
            className="hidden lg:flex flex-col items-center self-stretch"
          >
            <span className="flex-1 w-0.5 tricolor-separator-y rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full tricolor-dot my-3" />
            <span className="flex-1 w-0.5 tricolor-separator-y rounded-full" />
          </div>

          {/* Horizontal divider for mobile/tablet */}
          <div
            aria-hidden="true"
            className="flex lg:hidden items-center gap-3 w-full"
          >
            <span className="flex-1 h-0.5 tricolor-separator rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full tricolor-dot" />
            <span className="flex-1 h-0.5 tricolor-separator rounded-full" />
          </div>

          {/* Form column */}
          <div className="liquid-glass rounded-2xl p-6 md:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                <div className="relative">
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
                </div>
              </Field>

              <div className="flex flex-col items-center lg:items-start gap-3 mt-1">
                <div className="relative inline-block">
                  <PillButton
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    ariaLabel={status === 'sending' ? c.form.sending : c.form.submit}
                  >
                    <span>{status === 'sending' ? c.form.sending : c.form.submit}</span>
                    <Send
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </PillButton>
                </div>
                <div aria-live="polite">
                  {status === 'success' && (
                    <p className="text-xs text-green-400 font-bold text-center lg:text-left">
                      {c.form.success}
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-xs text-color-danger font-bold text-center lg:text-left">
                      {c.form.error}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
