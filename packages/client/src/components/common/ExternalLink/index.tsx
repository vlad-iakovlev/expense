export type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export const ExternalLink = ({ children, ...props }: ExternalLinkProps) => (
  <a target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
)
