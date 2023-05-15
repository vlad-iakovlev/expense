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

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  parents,
  mobileBack = parents?.at(-1),
}) => {
  return (
    <>
      {!!parents?.length && (
        <div className="max-md:hidden flex items-center gap-2 -mt-2 -mb-4">
          {parents.map((parent) => (
            <Fragment key={parent.href}>
              <NextLink
                className="min-w-0 text-lg leading-6 font-medium text-cyan-900 truncate"
                href={{ pathname: parent.href, query: { animation: 'back' } }}
                as={parent.href}
              >
                {parent.title}
              </NextLink>
              <ChevronRightIcon className="flex-none w-5 h-5" />
            </Fragment>
          ))}
        </div>
      )}

      {mobileBack ? (
        <NextLink
          className="md:hidden flex items-center gap-2 -mt-2 -mb-4 text-lg leading-6 font-medium text-cyan-900 truncate"
          href={{ pathname: mobileBack.href, query: { animation: 'back' } }}
          as={mobileBack.href}
        >
          <ArrowUturnLeftIcon className="flex-none w-5 h-5" />
          {mobileBack.title}
        </NextLink>
      ) : null}
    </>
  )
}
