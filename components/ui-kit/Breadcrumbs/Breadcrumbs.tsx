import { ArrowUturnLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { NextLink } from '../../next/Link.js'

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
}: BreadcrumbsProps) => {
  return (
    <>
      {!!parents?.length && (
        <nav
          className="-mb-4 -mt-2 flex items-center gap-2 max-md:hidden"
          aria-label="Breadcrumbs"
        >
          {parents.map((parent) => (
            <Fragment key={parent.href}>
              <NextLink
                className="min-w-0 truncate text-lg font-medium leading-6 text-sky-700 dark:text-sky-500"
                href={{ pathname: parent.href, query: { animation: 'back' } }}
                as={parent.href}
                aria-label={parent.title}
              >
                {parent.title}
              </NextLink>
              <ChevronRightIcon
                className="h-5 w-5 flex-none"
                aria-hidden="true"
              />
            </Fragment>
          ))}
        </nav>
      )}

      {mobileBack ? (
        <NextLink
          className="-mb-4 -mt-2 flex items-center gap-2 truncate text-lg font-medium leading-6 text-sky-700 dark:text-sky-500 md:hidden"
          href={{ pathname: mobileBack.href, query: { animation: 'back' } }}
          as={mobileBack.href}
          aria-label={mobileBack.title}
        >
          <ArrowUturnLeftIcon className="h-5 w-5 flex-none" />
          {mobileBack.title}
        </NextLink>
      ) : null}
    </>
  )
}
