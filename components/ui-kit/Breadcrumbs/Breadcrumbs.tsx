import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Fragment, ReactNode } from 'react'
import { BreadcrumbsEditableTitle } from './BreadcrumbsEditableTitle'
import { BreadcrumbsLink } from './BreadcrumbsLink'
import { BreadcrumbsTitle } from './BreadcrumbsTitle'

export interface BreadcrumbsProps {
  children: ReactNode
}

export type { BreadcrumbsEditableTitleProps } from './BreadcrumbsEditableTitle'
export type { BreadcrumbsLinkProps } from './BreadcrumbsLink'
export type { BreadcrumbsTitleProps } from './BreadcrumbsTitle'

export const Breadcrumbs = ({ children }: BreadcrumbsProps) => (
  <div className="flex items-center gap-2 mb-6">
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

Breadcrumbs.EditableTitle = BreadcrumbsEditableTitle
Breadcrumbs.Link = BreadcrumbsLink
Breadcrumbs.Title = BreadcrumbsTitle
