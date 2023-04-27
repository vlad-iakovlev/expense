import assert from 'assert'
import { FC, useCallback } from 'react'
import { updateGroup } from '../../../api/client/groups.ts'
import { useGroupContext } from '../../contexts/Group.tsx'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

export const GroupInfoName: FC = () => {
  const { setLoading } = useLoadingContext()
  const { groupResponse, mutateGroup } = useGroupContext()

  const handleChange = useCallback(
    async (name: string) => {
      assert(groupResponse, 'groupResponse is not defined')

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
