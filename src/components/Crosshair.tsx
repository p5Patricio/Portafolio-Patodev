type Props = {
  className?: string
}

/**
 * Small "+" crosshair mark, sky-colored, used at rail/hairline intersections
 * in the blueprint frame. Purely decorative.
 */
function Crosshair({ className = '' }: Props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 10"
      width="10"
      height="10"
      className={`pointer-events-none text-sky ${className}`}
    >
      <path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export default Crosshair
