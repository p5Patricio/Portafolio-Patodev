import { lazy, Suspense, useSyncExternalStore, type ReactNode } from 'react'

const ColorBends = lazy(() => import('./ColorBends'))

export function LaserField() {
  return null
}

/**
 * Static CSS approximation of the ColorBends WebGL bands: a black base with
 * a soft blue radial/linear glow. Used for the initial (pre-hydration and
 * server-rendered) paint, and as the permanent background whenever WebGL is
 * skipped (reduced motion, low core count, or narrow viewports).
 */
function StaticGradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(120% 90% at 15% 20%, rgba(59,130,246,0.35), transparent 60%), ' +
          'radial-gradient(110% 80% at 85% 75%, rgba(59,130,246,0.22), transparent 65%), ' +
          'linear-gradient(160deg, rgba(59,130,246,0.12), transparent 55%)',
      }}
    />
  )
}

/** jsdom (and some very old browsers) don't implement matchMedia at all. */
function canUseWebGLBackground(): boolean {
  if (typeof window === 'undefined') return false
  if (typeof window.matchMedia !== 'function') return false

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return false

  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined
  if (typeof cores === 'number' && cores <= 4) return false

  if (window.innerWidth < 768) return false

  return true
}

// useSyncExternalStore (rather than useState+useEffect) is the pattern React
// itself recommends for "force update to sync with a mutable value outside
// React": getServerSnapshot returns the SSR default so hydration's first
// pass always matches the prerendered static gradient, then React re-checks
// getSnapshot after mount and on every subscribed change (reduced-motion
// toggling, resistant window resize) without a manual effect + setState.
function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {}
  }

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionQuery.addEventListener?.('change', onStoreChange)
  window.addEventListener('resize', onStoreChange)

  return () => {
    reducedMotionQuery.removeEventListener?.('change', onStoreChange)
    window.removeEventListener('resize', onStoreChange)
  }
}

function getSnapshot() {
  return canUseWebGLBackground()
}

function getServerSnapshot() {
  return false
}

function ScrollBackground({ children }: { children: ReactNode }) {
  const enableWebGL = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <div className="relative min-h-screen overflow-x-clip bg-black selection:bg-color-accent selection:text-color-papel">
      {/* Interactive WebGL ColorBends Background (lazy, client-only) */}
      <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen">
        {enableWebGL ? (
          <Suspense fallback={<StaticGradientBackground />}>
            <ColorBends
              colors={['#3b82f6']}
              rotation={20}
              autoRotate={0}
              speed={0.2}
              scale={1}
              frequency={1}
              warpStrength={1}
              mouseInfluence={0}
              parallax={0}
              noise={0.09}
              iterations={1}
              intensity={1.8}
              bandWidth={10}
              transparent={true}
            />
          </Suspense>
        ) : (
          <StaticGradientBackground />
        )}
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default ScrollBackground
