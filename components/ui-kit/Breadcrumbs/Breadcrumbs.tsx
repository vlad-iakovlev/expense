import { ArrowUturnLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { FC, Fragment, useMemo } from 'react'

export interface BreadCrumbsParent {
  href: string
  title: string
}

export interface BreadcrumbsProps {
  title: string
  parents?: BreadCrumbsParent[]
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ title, parents }) => {
  const lastParent = useMemo(() => parents?.[parents.length - 1], [parents])

  return (
    <div className="flex max-md:flex-col md:items-center gap-4 md:gap-2 mb-6">
      {parents?.map((parent) => (
        <Fragment key={parent.href}>
          <Link
            className="max-md:hidden min-w-0 text-lg font-medium text-cyan-900 truncate"
            href={parent.href}
          >
            {parent.title}
          </Link>
          <ChevronRightIcon className="max-md:hidden flex-none w-5 h-5" />
        </Fragment>
      ))}

      {lastParent && (
        <Link
          className="flex md:hidden items-center gap-2 min-w-0 text-lg font-medium text-cyan-900 truncate"
          href={lastParent.href}
        >
          <ArrowUturnLeftIcon className="flex-none w-5 h-5" />
          {lastParent.title}
        </Link>
      )}

      <h1 className="min-w-0 text-lg font-medium truncate">{title}</h1>
    </div>
  )
}
