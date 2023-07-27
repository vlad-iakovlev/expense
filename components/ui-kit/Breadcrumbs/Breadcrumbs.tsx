import { ArrowUturnLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'
import { NextLink } from '../../next/Link.ts'

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
          className="max-md:hidden flex items-center gap-2 -mt-2 -mb-4"
          aria-label="Breadcrumbs"
        >
          {parents.map((parent) => (
            <Fragment key={parent.href}>
              <NextLink
                className="min-w-0 text-lg leading-6 font-medium text-cyan-900 truncate"
                href={{ pathname: parent.href, query: { animation: 'back' } }}
                as={parent.href}
                aria-label={`Go back to ${parent.title}`}
              >
                {parent.title}
              </NextLink>
              <ChevronRightIcon
                className="flex-none w-5 h-5"
                aria-hidden="true"
              />
            </Fragment>
          ))}
        </nav>
      )}

      {mobileBack ? (
        <NextLink
          className="md:hidden flex items-center gap-2 -mt-2 -mb-4 text-lg leading-6 font-medium text-cyan-900 truncate"
          href={{ pathname: mobileBack.href, query: { animation: 'back' } }}
          as={mobileBack.href}
          aria-label={`Go back to ${mobileBack.title}`}
        >
          <ArrowUturnLeftIcon className="flex-none w-5 h-5" />
          {mobileBack.title}
        </NextLink>
      ) : null}
    </>
  )
}
