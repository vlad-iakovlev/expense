import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { forwardRef, Fragment, ReactNode } from 'react'
import { ForwardRef, MayBePromise } from '../../../types/utility'
import { CEInput } from '../CEInput'

export interface BreadcrumbsProps {
  children: ReactNode
}

export interface BreadcrumbsLinkProps {
  href: string
  title: string
}

export interface BreadcrumbsTitleProps {
  title: string
}

export interface BreadcrumbsEditableTitleProps {
  title: string
  onChange: (title: string) => MayBePromise<void>
}

type BreadcrumbsType = ForwardRef<HTMLDivElement, BreadcrumbsProps> & {
  Link: ForwardRef<HTMLAnchorElement, BreadcrumbsLinkProps>
  Title: ForwardRef<HTMLHeadingElement, BreadcrumbsTitleProps>
  EditableTitle: ForwardRef<HTMLDivElement, BreadcrumbsEditableTitleProps>
}

export const Breadcrumbs = forwardRef(function Breadcrumbs({ children }, ref) {
  return (
    <div ref={ref} className="flex items-center gap-2 mb-6">
      {Array.isArray(children)
        ? children.map((node, index) => (
            <Fragment key={index}>
              {index > 0 && <ChevronRightIcon className="flex-none w-4 h-4" />}
              {node}
            </Fragment>
          ))
        : children}
    </div>
  )
}) as BreadcrumbsType

Breadcrumbs.Link = forwardRef(function BreadcrumbsLink({ href, title }, ref) {
  return (
    <Link
      ref={ref}
      className="min-w-0 text-lg font-medium text-cyan-900 truncate"
      href={href}
    >
      {title}
    </Link>
  )
})

Breadcrumbs.Title = forwardRef(function BreadcrumbsTitle({ title }, ref) {
  return (
    <h1 ref={ref} className="min-w-0 text-lg font-medium truncate">
      {title}
    </h1>
  )
})

Breadcrumbs.EditableTitle = forwardRef(function BreadcrumbsEditableTitle(
  { title, onChange },
  ref
) {
  return (
    <CEInput
      ref={ref}
      className="flex-auto min-w-0 text-lg font-medium truncate focus:text-clip focus:outline-none"
      value={title}
      onChange={onChange}
    />
  )
})
