import { FC, useCallback } from 'react'
import { updateGroup } from '../../../api/client/groups'
import { useGroupContext } from '../../contexts/Group'
import { useLoadingContext } from '../../contexts/Loading'
import { Card } from '../../ui-kit/Card'

export const GroupInfoName: FC = () => {
  const { setLoading } = useLoadingContext()
  const { groupResponse, mutateGroup } = useGroupContext()

  const handleChange = useCallback(
    async (name: string) => {
      if (!groupResponse) return

      try {
        setLoading(true)

        await updateGroup({
          groupId: groupResponse.group.id,
          name,
        })

        await mutateGroup()
      } finally {
        setLoading(false)
      }
    },
    [groupResponse, mutateGroup, setLoading]
  )

  if (!groupResponse) {
    return <Card.Skeleton />
  }

  return (
    <Card.Input
      name="Name"
      value={groupResponse.group.name}
      onChange={handleChange}
    />
  )
}
