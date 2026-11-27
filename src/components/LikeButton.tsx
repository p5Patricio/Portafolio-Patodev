import { useEffect, useState } from 'react'
import PulseHeart from './PulseHeart'
import { useLanguage } from '../context/LanguageContext'
import { DURATION, STAGGER } from '../lib/motion'

const STORAGE_KEY = 'portfolio:liked'

/**
 * The hero choreography's last step (`scrollHint`, order 8 in
 * `src/sections/Hero.tsx`) starts at 8 × `STAGGER` and runs `DURATION.slow`,
 * so the page is settled ~1.2s after load. The capsule waits for that so it
 * never competes with the hero entrance.
 */
const HERO_LAST_STEP = 8
const ENTRANCE_DELAY_MS = Math.round((HERO_LAST_STEP * STAGGER + DURATION.slow) * 1000)

/**
 * Pulse tuned down from PulseHeart's defaults (dotSize 0.3, overshoot 1.7,
 * beat 3) so the like feedback stays a quiet, tactile tick rather than a pop.
 */
const PULSE = { dotSize: 0.55, overshoot: 1.2, beat: 2 } as const

/**
 * JS-gated entrance: the hidden state only applies under `html.js` (set by the
 * inline bootstrap in index.html) and before `data-entered`, so the prerendered
 * HTML and no-JS visitors always see the capsule. It fades/rises 8px once.
 * `:focus-within` keeps it visible if a keyboard user reaches it early.
 */
const ENTRANCE_CLASSES =
  'transition-[opacity,transform] duration-(--motion-duration-slow) ease-out-expo motion-reduce:transition-none [.js_&:not([data-entered]):not(:focus-within)]:opacity-0 [.js_&:not([data-entered]):not(:focus-within)]:translate-y-2'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Public like button backed by `/api/likes` and Upstash Redis.
 *
 * - Fetches the global count client-side on mount.
 * - Hides the number gracefully if the API is unreachable.
 * - Remembers one like per visitor in localStorage.
 * - Optimistically updates the UI and rolls back on error.
 */
function LikeButton() {
  const { t } = useLanguage()
  const [count, setCount] = useState<number | null>(null)
  const [liked, setLiked] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(STORAGE_KEY) === '1'
  })

  // `false` on the server and the first client render so hydration matches.
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot reveal after hydration
      setEntered(true)
      return
    }
    const timer = setTimeout(() => setEntered(true), ENTRANCE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    fetch('/api/likes')
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: { count: number }) => setCount(data.count))
      .catch(() => {
        // Keep the button usable; hide the count until we have a value.
        setCount(null)
      })
  }, [])

  const handleChange = async (nextLiked: boolean, optimisticCount: number) => {
    if (liked || !nextLiked) return

    const previousCount = count
    setLiked(true)
    setCount(optimisticCount)
    localStorage.setItem(STORAGE_KEY, '1')

    try {
      const res = await fetch('/api/likes', { method: 'POST' })
      if (!res.ok) throw new Error()
      const data = (await res.json()) as { count: number }
      setCount(data.count)
    } catch {
      setLiked(false)
      setCount(previousCount)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const message = liked ? t.likeButton.thanks : t.likeButton.question

  return (
    <div
      data-entered={entered ? '' : undefined}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30 ${ENTRANCE_CLASSES}`}
    >
    <PulseHeart
      liked={liked}
      count={count ?? 0}
      onChange={handleChange}
      showCount={count !== null}
      disabled={liked}
      label={message}
      prompt={
        <span aria-hidden="true" className="hidden text-xs font-medium leading-none sm:inline">
          {message}
        </span>
      }
      likedColor="#00c6fd"
      idleColor="#8a8f98"
      pillColor="#15181d"
      textColor="#edeae2"
      size={32}
      dotSize={PULSE.dotSize}
      overshoot={PULSE.overshoot}
      beat={PULSE.beat}
      corner={999}
      pillClassName="rounded-full border border-line shadow-lg shadow-black/20"
    />
    </div>
  )
}

export default LikeButton
