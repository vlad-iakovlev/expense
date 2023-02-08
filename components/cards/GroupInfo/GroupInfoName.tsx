import { FC, useCallback } from 'react'
import { updateGroup } from '../../../api/client/groups'
import { useGroupContext } from '../../contexts/Group'
import { useLoadingContext } from '../../contexts/Loading'
import { Card } from '../../ui-kit/Card'

export const GroupInfoName: FC = () => {
  const { setLoading } = useLoadingContext()
  const { group, mutateGroup } = useGroupContext()

  const handleChange = useCallback(
    async (name: string) => {
      try {
        setLoading(true)

        await updateGroup({
          groupId: group.id,
          name,
        })

        await mutateGroup()
      } finally {
        setLoading(false)
      }
    },
    [group.id, mutateGroup, setLoading]
  )

  return <Card.Input name="Name" value={group.name} onChange={handleChange} />
}
