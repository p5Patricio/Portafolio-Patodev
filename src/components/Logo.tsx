import { useState } from 'react'

type Props = {
  className?: string
  alt?: string
}

/**
 * Personal "duck developer" logo.
 *
 * Behavior: tries to load the user's real PNG from `/public/logo.png` first.
 * If that file is missing (404 / decode error), falls back to a hand-crafted
 * SVG inspired by the user's pixel-art duck logo so the UI never looks broken
 * during development.
 *
 * → To use the real artwork, drop your file at: `public/logo.png`
 *   (256x256 transparent PNG recommended).
 */
function Logo({ className = 'w-10 h-10', alt = 'Logo personal' }: Props) {
  const [errorStage, setErrorStage] = useState(0) // 0: PNG, 1: SVG, 2: Fallback

  if (errorStage === 2) {
    return <DuckFallback className={className} ariaLabel={alt} />
  }

  return (
    <img
      src={errorStage === 0 ? "/LogoDark.png" : "/LogoDark.svg"}
      alt={alt}
      onError={() => setErrorStage(prev => prev + 1)}
      className={`${className} object-contain select-none shrink-0`}
      draggable={false}
    />
  )
}

// ---------- Fallback SVG ----------
//
// Pixel-art-inspired duck silhouette built from horizontal "bars" mimicking
// the user's logo: cyan body + yellow beak + red feet, framed by `< />`
// developer markers. Pure SVG so it scales cleanly at any size.

function DuckFallback({
  className,
  ariaLabel,
}: {
  className: string
  ariaLabel: string
}) {
  const cyan = '#22d5e0'
  const cyanDark = '#3fa3f0'
  const yellow = '#ffc732'
  const red = '#e84545'

  return (
    <svg
      viewBox="0 0 64 64"
      className={`${className} select-none`}
      role="img"
      aria-label={ariaLabel}
    >
      {/* `<` developer marker (left) */}
      <g fill={cyan}>
        <rect x="3"  y="32" width="2" height="2" rx="0.5" />
        <rect x="5"  y="30" width="2" height="2" rx="0.5" />
        <rect x="5"  y="34" width="2" height="2" rx="0.5" />
      </g>

      {/* `/>` developer marker (right) */}
      <g fill={cyan}>
        <rect x="57" y="30" width="2" height="2" rx="0.5" />
        <rect x="57" y="34" width="2" height="2" rx="0.5" />
        <rect x="59" y="32" width="2" height="2" rx="0.5" />
        <rect x="55" y="28" width="2" height="2" rx="0.5" />
        <rect x="55" y="36" width="2" height="2" rx="0.5" />
      </g>

      {/* Duck body — cyan horizontal bars in stepped silhouette */}
      <g fill={cyan}>
        {/* Head */}
        <rect x="36" y="14" width="10" height="2" rx="0.6" />
        <rect x="34" y="16" width="14" height="2" rx="0.6" />
        <rect x="32" y="18" width="14" height="2" rx="0.6" />
        <rect x="30" y="20" width="16" height="2" rx="0.6" />
        {/* Neck */}
        <rect x="30" y="22" width="10" height="2" rx="0.6" />
        <rect x="30" y="24" width="10" height="2" rx="0.6" />
        {/* Body main */}
        <rect x="14" y="26" width="36" height="2" rx="0.6" />
        <rect x="12" y="28" width="40" height="2" rx="0.6" />
        <rect x="10" y="30" width="44" height="2" rx="0.6" />
        <rect x="10" y="32" width="44" height="2" rx="0.6" />
        <rect x="12" y="34" width="40" height="2" rx="0.6" />
        <rect x="14" y="36" width="36" height="2" rx="0.6" />
        <rect x="18" y="38" width="28" height="2" rx="0.6" />
      </g>

      {/* Wing detail — slightly darker cyan/blue */}
      <g fill={cyanDark}>
        <rect x="22" y="28" width="14" height="2" rx="0.6" />
        <rect x="22" y="30" width="18" height="2" rx="0.6" />
        <rect x="24" y="32" width="14" height="2" rx="0.6" />
      </g>

      {/* Eye — single dark pixel */}
      <rect x="40" y="20" width="2" height="2" fill="#0d2535" />

      {/* Beak — yellow */}
      <g fill={yellow}>
        <rect x="46" y="20" width="6" height="2" rx="0.6" />
        <rect x="44" y="22" width="6" height="2" rx="0.6" />
      </g>

      {/* Feet — red */}
      <g fill={red}>
        <rect x="22" y="40" width="8" height="2" rx="0.6" />
        <rect x="34" y="40" width="8" height="2" rx="0.6" />
      </g>
    </svg>
  )
}

export default Logo
