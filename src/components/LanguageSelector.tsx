import { useLanguage } from '../context/LanguageContext'
import type { Lang } from '../data/translations'

type Props = {
  className?: string
}

const FOCUS_RING =
  'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky focus-visible:outline-offset-2'

/**
 * Tiny text toggle: `ES / EN`, mono 11px, active in paper, inactive muted.
 * Each button carries an invisible expanded hit area (`before:-inset-4`) so
 * the visible label can stay small while the touch target still clears the
 * 44px minimum.
 */
function LanguageSelector({ className = '' }: Props) {
  const { lang, setLang } = useLanguage()

  const optionClass = (opt: Lang) =>
    `relative inline-flex items-center justify-center before:absolute before:-inset-4 before:content-[''] transition-colors ${FOCUS_RING} ${
      lang === opt ? 'text-paper' : 'text-muted hover:text-paper'
    }`

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`mono-label flex items-center gap-1.5 text-[11px] ${className}`}
    >
      <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')} className={optionClass('es')}>
        ES
      </button>
      <span aria-hidden="true" className="text-muted">
        /
      </span>
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} className={optionClass('en')}>
        EN
      </button>
    </div>
  )
}

export default LanguageSelector
