import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import { FC, useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroups } from '../../../stores/RootStore/hooks/useGroups.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

export const GroupCreateCard: FC = () => {
  const router = useRouter()
  const { createGroup } = useGroups()

  const handleCreate = useCallback(() => {
    const groupId = createGroup()
    const href = ROUTES.GROUP(groupId)
    void router.push({ pathname: href, query: { animation: 'forward' } }, href)
  }, [createGroup, router])

  return (
    <Card onClick={handleCreate}>
      <Card.Title title="New Group" />
      <Card.Divider />
      <Card.Text
        end={<Button rounded disabled size="sm" iconStart={<PlusIcon />} />}
      >
        Create
      </Card.Text>
    </Card>
  )
}
