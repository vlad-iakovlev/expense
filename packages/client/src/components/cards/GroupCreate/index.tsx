import { PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { Card } from '@/components/common/Card'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups'

export const GroupCreateCard = () => {
  const navigate = useNavigate()
  const { createGroup } = useGroups()

  const handleCreate = useCallback(() => {
    const groupId = createGroup()
    void navigate({ to: '/group/$groupId', params: { groupId } })
  }, [createGroup, navigate])

  return (
    <Card aria-label="New group" onClick={handleCreate}>
      <Card.Title title="New Group" />
      <Card.Divider />
      <Card.Item
        prefix={<PlusIcon className="h-6 w-6" />}
        label="Create"
        tabIndex={-1}
      />
    </Card>
  )
}
