import clsx from 'clsx'
import { ChangeEvent, FC, KeyboardEvent, useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'
import { updateGroup } from '../../api/client/groups'
import { ClientGroup } from '../../api/types/groups'

interface Props {
  className?: string
  group: ClientGroup
}

export const GroupTitle: FC<Props> = ({ className, group }) => {
  const { mutate } = useSWRConfig()
  const [name, setName] = useState(group.name)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const openEditor = useCallback(() => {
    setIsEditing(true)
  }, [])

  const closeEditor = useCallback(
    async (newName?: string) => {
      if (!newName) {
        setName(group.name)
        setIsEditing(false)
        return
      }

      try {
        setIsSaving(true)
        await updateGroup(group.id, { name: newName })
        await mutate(`group-${group.id}`)
        setIsEditing(false)
      } finally {
        setIsSaving(false)
      }
    },
    [group.id, group.name, mutate]
  )

  const handleInputKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          await closeEditor(name)
          break
        case 'Escape':
          await closeEditor()
          break
      }
    },
    [closeEditor, name]
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.currentTarget.value)
    },
    []
  )

  const handleInputBlur = useCallback(() => {
    closeEditor(name)
  }, [closeEditor, name])

  return (
    <div className={clsx(className, 'text-lg font-medium')}>
      {isEditing ? (
        <input
          autoFocus
          className="w-full bg-transparent focus:outline-none"
          disabled={isSaving}
          value={name}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
      ) : (
        <h1 className="truncate" onClick={openEditor}>
          {group.name}
        </h1>
      )}
    </div>
  )
}
