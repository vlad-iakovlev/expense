import { ArrowUturnLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

export interface BreadCrumbsParent {
  href: string
  title: string
}

export interface BreadcrumbsProps {
  parents?: BreadCrumbsParent[]
  mobileBack?: BreadCrumbsParent
}

export const Breadcrumbs = ({
  parents,
  mobileBack = parents?.at(-1),
}: BreadcrumbsProps) => (
  <>
    {!!parents?.length && (
      <nav
        className="-mt-2 -mb-4 flex items-center gap-2 max-md:hidden"
        aria-label="Breadcrumbs"
      >
        {parents.map((parent) => (
          <React.Fragment key={parent.href}>
            <Link
              className="min-w-0 truncate text-lg leading-6 font-medium text-sky-700 dark:text-sky-500"
              href={parent.href}
              aria-label={parent.title}
            >
              {parent.title}
            </Link>
            <ChevronRightIcon
              className="h-5 w-5 flex-none"
              aria-hidden="true"
            />
          </React.Fragment>
        ))}
      </nav>
    )}

    {mobileBack ? (
      <Link
        className="-mt-2 -mb-4 flex items-center gap-2 truncate text-lg leading-6 font-medium text-sky-700 md:hidden dark:text-sky-500"
        href={mobileBack.href}
        aria-label={mobileBack.title}
      >
        <ArrowUturnLeftIcon className="h-5 w-5 flex-none" />
        {mobileBack.title}
      </Link>
    ) : null}
  </>
)
