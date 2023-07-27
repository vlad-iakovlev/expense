import { Modify } from '../../../types/utility.ts'
import { NextLink } from '../../next/Link.ts'

export type CardLinkProps = Modify<
  React.ComponentProps<typeof NextLink>,
  {
    href: string
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    label?: React.ReactNode
    value?: React.ReactNode
    children?: never
    as?: never
  }
>

export const CardLink = ({
  href,
  prefix,
  suffix,
  label,
  value,
  ...rest
}: CardLinkProps) => (
  <NextLink
    className="flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 active:bg-zinc-100 transition-colors"
    href={{ pathname: href, query: { animation: 'forward' } }}
    as={href}
    role="listitem"
    {...rest}
  >
    {prefix ? <div className="flex-none">{prefix}</div> : null}
    <div className="flex-auto truncate">{label}</div>
    {value ? <div className="flex-none">{value}</div> : null}
    {suffix ? <div className="flex-none">{suffix}</div> : null}
  </NextLink>
)
