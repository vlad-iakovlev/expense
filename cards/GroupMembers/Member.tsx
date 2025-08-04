import { useCallback, useState } from 'react'
import { Avatar } from '@/components/common/Avatar'
import { Card } from '@/components/common/Card/index'
import { useGroupMembers } from '@/contexts/RootStore/hooks/useGroupMembers'
import { Delete } from './Delete'

type MemberProps = {
  groupId: string
  userId: string
  name?: string
  image?: string
}

export const Member = ({ groupId, userId, name, image }: MemberProps) => {
  const { groupMembers } = useGroupMembers({ groupId })

  const [isOpen, setIsOpen] = useState(false)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setIsOpen(true)
      }
    },
    [setIsOpen],
  )

  const handleBlur = useCallback((event: React.FocusEvent) => {
    void (async () => {
      const currentTarget = event.currentTarget
      await new Promise(requestAnimationFrame)
      if (!currentTarget.contains(document.activeElement)) setIsOpen(false)
    })()
  }, [])

  return (
    <Card.Item
      label={name}
      prefix={<Avatar src={image} name={name} size="sm" aria-hidden="true" />}
      suffix={
        groupMembers.length > 1 && (
          <Delete
            groupId={groupId}
            userId={userId}
            tabIndex={isOpen ? 0 : -1}
          />
        )
      }
      aria-disabled="false"
      aria-expanded={isOpen ? 'true' : 'false'}
      aria-label={name}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  )
}
