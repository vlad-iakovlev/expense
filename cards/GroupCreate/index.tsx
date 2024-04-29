import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation.js'
import React from 'react'
import { Card } from '@/components/common/Card/index.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups.js'

export const GroupCreateCard = () => {
  const router = useRouter()
  const { createGroup } = useGroups()

  const handleCreate = React.useCallback(() => {
    const groupId = createGroup()
    router.push(ROUTES.GROUP(groupId))
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
