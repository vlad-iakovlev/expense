import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { CreateGroupResponse } from '../../api/group'
import { ClientGroup } from '../../models/group'
import { request } from '../../utils/request'
import { GroupsItem } from './GroupsItem'

interface GroupsProps {
  groups: ClientGroup[]
}

export const Groups: FC<GroupsProps> = ({ groups }) => {
  const router = useRouter()

  const handleGroupClick = useCallback(
    async (id: string) => {
      await router.push(`/dashboard/${id}`)
    },
    [router]
  )

  const handleCreateGroup = useCallback(async () => {
    const { group } = await request.post<{ name: string }, CreateGroupResponse>(
      `/api/group`,
      { name: 'Untitled' }
    )

    await router.push(`/dashboard/${group.id}`)
  }, [router])

  return (
    <div>
      <h1 className="text-xl font-medium mb-6">Groups</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map((group) => (
          <GroupsItem
            key={group.id}
            group={group}
            onClick={() => handleGroupClick(group.id)}
          />
        )) || null}

        <GroupsItem onClick={handleCreateGroup} />
      </div>
    </div>
  )
}
