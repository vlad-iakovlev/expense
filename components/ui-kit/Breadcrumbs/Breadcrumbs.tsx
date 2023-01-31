import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import {
  ChangeEvent,
  forwardRef,
  Fragment,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
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
  const [titleValue, setTitleValue] = useState(title)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const openEditor = useCallback(() => {
    setIsEditing(true)
  }, [])

  const closeEditor = useCallback(
    async (newTitle?: string) => {
      newTitle = newTitle?.trim()

      if (!newTitle || newTitle === title) {
        setTitleValue(title)
        setIsEditing(false)
        return
      }

      try {
        setIsSaving(true)
        await onChange(newTitle)
        setIsEditing(false)
      } finally {
        setIsSaving(false)
      }
    },
    [onChange, title]
  )

  const handleInputKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          await closeEditor(titleValue)
          break
        case 'Escape':
          await closeEditor()
          break
      }
    },
    [closeEditor, titleValue]
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitleValue(event.currentTarget.value)
    },
    []
  )

  const handleInputBlur = useCallback(() => {
    closeEditor(titleValue)
  }, [closeEditor, titleValue])

  useEffect(() => {
    setTitleValue(title)
  }, [title])

  return (
    <div ref={ref} className="flex-auto min-w-0 flex text-lg font-medium">
      {isEditing ? (
        <input
          autoFocus
          className="flex-auto min-w-0 bg-transparent focus:outline-none"
          disabled={isSaving}
          value={titleValue}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
      ) : (
        <h1 className="min-w-0 truncate" onClick={openEditor}>
          {title}
        </h1>
      )}
    </div>
  )
})
