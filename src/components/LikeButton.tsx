import { useEffect, useState } from 'react'
import PulseHeart from './PulseHeart'
import { useLanguage } from '../context/LanguageContext'

const STORAGE_KEY = 'portfolio:liked'

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
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-30">
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
      corner={999}
      pillClassName="rounded-full border border-line shadow-lg shadow-black/20"
    />
    </div>
  )
}

export default LikeButton
