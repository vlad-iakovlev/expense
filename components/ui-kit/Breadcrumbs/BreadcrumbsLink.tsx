import Link from 'next/link'
import { FC } from 'react'

export interface BreadcrumbsLinkProps {
  href: string
  title: string
}

export const BreadcrumbsLink: FC<BreadcrumbsLinkProps> = ({ href, title }) => (
  <Link
    className="min-w-0 text-lg font-medium text-cyan-900 truncate"
    href={href}
  >
    {title}
  </Link>
)
