import TextLink from './TextLink'

type Props = {
  /** "Back to top" label, without the arrow (caller's translation string). */
  backToTopLabel: string
  /** In-page anchor the "back to top" link scrolls to. */
  backToTopHref: string
}

/** Minimal shared footer: © year + a "back to top" text link. */
function Footer({ backToTopLabel, backToTopHref }: Props) {
  return (
    <footer className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-20">
      <p className="mono-label text-[11px] text-muted">© {new Date().getFullYear()} Patricio García</p>
      <TextLink href={backToTopHref} className="mono-label text-[11px]">
        {backToTopLabel} ↑
      </TextLink>
    </footer>
  )
}

export default Footer
