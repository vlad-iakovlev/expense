import Link from 'next/link'
import { FC, ReactNode } from 'react'

export interface CardLinkProps {
  href: string
  start?: ReactNode
  end?: ReactNode
  children?: ReactNode
}

export const CardLink: FC<CardLinkProps> = ({ href, start, end, children }) => (
  <Link
    className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors"
    href={href}
  >
    {!!start && <div className="flex-none">{start}</div>}
    <div className="flex-auto truncate">{children}</div>
    {!!end && <div className="flex-none">{end}</div>}
  </Link>
)
