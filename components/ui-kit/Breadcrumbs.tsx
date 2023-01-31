import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import {
  ChangeEvent,
  FC,
  Fragment,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

export interface BreadcrumbsProps {
  children: ReactNode
}

export const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  return (
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
}

export interface BreadcrumbsLinkProps {
  href: string
  title: string
}

const BreadcrumbsLink: FC<BreadcrumbsLinkProps> = ({ href, title }) => {
  return (
    <Link
      className="min-w-0 text-lg font-medium text-cyan-900 truncate"
      href={href}
    >
      {title}
    </Link>
  )
}

Breadcrumbs.Link = BreadcrumbsLink

export interface BreadcrumbsTitleProps {
  title: string
}

const BreadcrumbsTitle: FC<BreadcrumbsTitleProps> = ({ title }) => {
  return <h1 className="min-w-0 text-lg font-medium truncate">{title}</h1>
}

Breadcrumbs.Title = BreadcrumbsTitle

export interface BreadcrumbsEditableTitleProps {
  title: string
  onChange: (title: string) => Promise<void> | void
}

const BreadcrumbsEditableTitle: FC<BreadcrumbsEditableTitleProps> = ({
  title,
  onChange,
}) => {
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
    <div className="flex-auto min-w-0 flex text-lg font-medium">
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
}

Breadcrumbs.EditableTitle = BreadcrumbsEditableTitle
