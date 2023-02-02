import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import {
  FocusEvent,
  forwardRef,
  Fragment,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useState,
} from 'react'
import { ForwardRef, MayBePromise } from '../../../types/utility'

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
  EditableTitle: ForwardRef<HTMLHeadingElement, BreadcrumbsEditableTitleProps>
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
  const [isSaving, setIsSaving] = useState(false)

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLHeadingElement>) => {
      switch (event.key) {
        case 'Enter':
          event.preventDefault()
          event.currentTarget.blur()
          break
        case 'Escape':
          event.preventDefault()
          event.currentTarget.textContent = title
          event.currentTarget.blur()
          break
      }
    },
    [title]
  )

  const handleBlur = useCallback(
    async (event: FocusEvent<HTMLHeadingElement>) => {
      event.currentTarget.scrollLeft = 0

      const newTitle = event.currentTarget.textContent?.trim()

      if (!newTitle || newTitle === title) {
        event.currentTarget.textContent = title
        return
      }

      try {
        setIsSaving(true)
        await onChange(newTitle)
      } finally {
        setIsSaving(false)
      }
    },
    [onChange, title]
  )

  return (
    <h1
      ref={ref}
      className="flex-auto min-w-0 text-lg font-medium truncate focus:outline-none focus:text-clip"
      contentEditable={!isSaving}
      suppressContentEditableWarning
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      {title}
    </h1>
  )
})
