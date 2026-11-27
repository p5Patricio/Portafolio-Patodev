import { useCallback, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Route transitions through the View Transitions API.
 *
 * React Router's own `viewTransition` option (`<Link viewTransition>`,
 * `navigate(to, { viewTransition: true })`, `useViewTransitionState`) only
 * works under a data router (`RouterProvider`); this app renders a
 * declarative `<BrowserRouter>` / `<StaticRouter>` pair for the prerender,
 * where that option is silently ignored and `useViewTransitionState` throws.
 * So the same idea is wired here by hand: the navigation runs inside
 * `document.startViewTransition`, and the update callback resolves once the
 * new route has committed (App calls `notifyRouteCommitted` from a layout
 * effect), after the scroll position for the new page has been set.
 *
 * Browsers without the API fall through to the link's normal navigation, and
 * the CSS (src/index.css, "Route transitions") drops every animation under
 * `prefers-reduced-motion: reduce`.
 */

/**
 * Fixed chrome present on every route keeps its own name, so it holds still
 * (cross-fading only its contents) while the page underneath cross-fades and
 * shifts. Nothing else is named: the route change is a plain page cross-fade.
 */
export const HEADER_TRANSITION_NAME = 'site-header'
export const LIKE_CAPSULE_TRANSITION_NAME = 'like-capsule'

/**
 * Safety net: if the route commit signal never arrives, let the browser
 * capture the new state anyway instead of freezing rendering until its own
 * (much longer) update-callback timeout aborts the transition.
 */
const COMMIT_TIMEOUT_MS = 1000

export function supportsViewTransitions(): boolean {
  return typeof document !== 'undefined' && typeof document.startViewTransition === 'function'
}

const pendingCommits = new Set<() => void>()

/** Called by App after every route commit; releases the pending transition's update callback. */
export function notifyRouteCommitted(): void {
  for (const settle of [...pendingCommits]) settle()
}

/** Instant scroll (the page sets `scroll-behavior: smooth`): the hash target, or the top. */
function settleScroll(hash: string): void {
  const target = hash ? document.getElementById(decodeURIComponent(hash)) : null
  if (target) {
    target.scrollIntoView({ block: 'start', behavior: 'instant' })
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
}

/** Runs `navigate(to)` inside a view transition. Callers check `supportsViewTransitions()` first. */
export function startRouteTransition(to: string, navigate: (to: string) => void): void {
  const hashIndex = to.indexOf('#')
  const hash = hashIndex === -1 ? '' : to.slice(hashIndex + 1)
  const transition = document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        const settle = () => {
          pendingCommits.delete(settle)
          window.clearTimeout(timer)
          settleScroll(hash)
          resolve()
        }
        const timer = window.setTimeout(settle, COMMIT_TIMEOUT_MS)
        pendingCommits.add(settle)
        navigate(to)
      }),
  )

  // `ready` rejects when the animation is skipped (e.g. a newer navigation);
  // the DOM update still happens, so there is nothing to recover.
  transition.ready.catch(() => {})
  transition.finished.catch(() => {})
}

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return event.button === 0 && !event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey
}

/**
 * Click handler for links to another route: `onClick={(e) => transitionTo(e, '/galeria')}`.
 * It takes over only plain left clicks on same-tab links when the browser
 * supports view transitions; everything else keeps the link's own behavior
 * (router navigation for `<Link>`, a full page load for a plain `<a>`).
 */
export function useViewTransitionClick() {
  const navigate = useNavigate()
  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>, to: string) => {
      if (event.defaultPrevented || !isPlainLeftClick(event) || !supportsViewTransitions()) return
      const target = event.currentTarget.getAttribute('target')
      if (target && target !== '_self') return
      event.preventDefault()
      startRouteTransition(to, (path) => navigate(path))
    },
    [navigate],
  )
}
