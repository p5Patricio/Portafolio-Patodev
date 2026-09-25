import { useSyncExternalStore } from 'react'

const QUERY = '(max-width: 1023px)'

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {}
  }

  const mediaQuery = window.matchMedia(QUERY)
  mediaQuery.addEventListener?.('change', onStoreChange)
  return () => mediaQuery.removeEventListener?.('change', onStoreChange)
}

function getSnapshot() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(QUERY).matches
    : false
}

// SSR/no-JS default: not compact, so the safe fallback markup is the fully
// expanded, always-readable one (matches this codebase's "visible by
// default, JS only ever narrows things down" convention — see
// ScrollBackground's canUseWebGLBackground for the same pattern).
function getServerSnapshot() {
  return false
}

/**
 * True below the `lg` breakpoint (1024px), where the tablet/phone layout
 * applies. Client-only — see getServerSnapshot above.
 */
function useIsCompactViewport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useIsCompactViewport
