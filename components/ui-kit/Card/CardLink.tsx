import { FC, ReactNode } from 'react'
import { NextLink } from '../../next/Link.ts'

export interface CardLinkProps {
  href: string
  prefix?: ReactNode
  label?: ReactNode
  value?: ReactNode
}

export const CardLink: FC<CardLinkProps> = ({ href, prefix, label, value }) => (
  <NextLink
    className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 active:bg-zinc-100 transition-colors"
    href={{ pathname: href, query: { animation: 'forward' } }}
    as={href}
  >
    {prefix ? <div className="flex-none">{prefix}</div> : null}
    <div className="flex-auto truncate">{label}</div>
    {value ? <div className="flex-none">{value}</div> : null}
  </NextLink>
)
