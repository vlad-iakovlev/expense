import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Card } from '@/components/common/Card/index'
import { ROUTES } from '@/constants/routes'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups'

export const GroupCreateCard = () => {
  const router = useRouter()
  const { createGroup } = useGroups()

  const handleCreate = useCallback(() => {
    const groupId = createGroup()
    void router.push(ROUTES.GROUP(groupId))
  }, [createGroup, router])

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
