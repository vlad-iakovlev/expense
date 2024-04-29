export type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export const ExternalLink = (props: ExternalLinkProps) => (
  <a target="_blank" rel="noopener noreferrer" {...props} />
)
