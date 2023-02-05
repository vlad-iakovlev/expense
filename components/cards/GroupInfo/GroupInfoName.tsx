import { FC, useCallback } from 'react'
import { updateGroup } from '../../../api/client/groups'
import { useGroupContext } from '../../contexts/Group'
import { Card } from '../../ui-kit/Card'

export const GroupInfoName: FC = () => {
  const { group, mutateGroup } = useGroupContext()

  const handleChange = useCallback(
    async (name: string) => {
      await updateGroup({
        groupId: group.id,
        name,
      })

      await mutateGroup()
    },
    [group.id, mutateGroup]
  )

  return <Card.Input name="Name" value={group.name} onChange={handleChange} />
}
