import { PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { createGroup } from '../../api/client/groups'
import { ROUTES } from '../../constants/routes'
import { useGroupsContext } from '../contexts/Groups'
import { Avatar } from '../ui-kit/Avatar'
import { AvatarGroup } from '../ui-kit/AvatarGroup'
import { Card } from '../ui-kit/Card'

export const GroupsCard: FC = () => {
  const { groups } = useGroupsContext()

  const router = useRouter()

  const goToGroup = useCallback(
    async (groupId: string) => {
      await router.push(ROUTES.GROUP(groupId))
    },
    [router]
  )

  const handleCreateGroup = useCallback(async () => {
    const { group } = await createGroup({
      name: 'Untitled Group',
    })

    await goToGroup(group.id)
  }, [goToGroup])

  return (
    <Card>
      <Card.Title title="Groups" />

      <Card.Divider />

      {groups.map((group) => (
        <Card.Button
          key={group.id}
          end={
            <AvatarGroup
              className="flex-none"
              avatars={group.users.map((user) => ({
                name: user.name || '',
                src: user.image || '',
              }))}
              max={3}
              size="sm"
            />
          }
          onClick={() => goToGroup(group.id)}
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
