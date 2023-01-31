import { PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { createGroup } from '../../api/client/groups'
import { ClientGroup } from '../../api/types/groups'
import { ROUTES } from '../../constants/routes'
import { Avatar } from '../ui-kit/Avatar'
import { AvatarGroup } from '../ui-kit/AvatarGroup'
import { Card } from '../ui-kit/Card'

interface Props {
  groups: ClientGroup[]
}

export const Groups: FC<Props> = ({ groups }) => {
  const router = useRouter()

  const goToGroup = useCallback(
    async (group: ClientGroup) => {
      await router.push(ROUTES.GROUP(group.id))
    },
    [router]
  )

  const handleCreateGroup = useCallback(async () => {
    const { group } = await createGroup({ name: 'Untitled Group' })
    await goToGroup(group)
  }, [goToGroup])

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
              size="sm"
            />
          }
          onClick={() => goToGroup(group)}
        >
          {group.name}
        </Card.Button>
      ))}

      <Card.Button
        end={
          <Avatar
            color="green"
            slug={<PlusIcon className="w-4 h-4" />}
            size="sm"
          />
        }
        onClick={handleCreateGroup}
      >
        Create Group
      </Card.Button>
    </Card>
  )
}
