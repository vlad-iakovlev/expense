import { PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { CreateGroupResponse } from '../../api/group'
import { ClientGroup } from '../../models/group'
import { request } from '../../utils/request'
import { Avatar } from '../ui-kit/Avatar'
import { AvatarGroup } from '../ui-kit/AvatarGroup'
import { Card } from '../ui-kit/Card'

interface Props {
  groups: ClientGroup[]
}

export const DashboardGroups: FC<Props> = ({ groups }) => {
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
      { name: 'Untitled group' }
    )

    await router.push(`/dashboard/${group.id}`)
  }, [router])

  return (
    <Card>
      <Card.Title>Groups</Card.Title>

      {groups.map((group) => (
        <Card.Button
          key={group.id}
          end={
            <AvatarGroup
              className="flex-none"
              avatars={group.users.map((user) => ({
                name: user.name,
                src: user.image,
              }))}
              max={3}
            />
          }
          onClick={() => handleGroupClick(group.id)}
        >
          {group.name}
        </Card.Button>
      ))}

      <Card.Button
        end={<Avatar color="green" slug={<PlusIcon className="w-4 h-4" />} />}
        onClick={handleCreateGroup}
      >
        Create Group
      </Card.Button>
    </Card>
  )
}
