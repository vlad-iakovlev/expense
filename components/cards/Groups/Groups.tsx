import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { createGroup } from '../../../api/client/groups'
import { ROUTES } from '../../../constants/routes'
import { useGroupsContext } from '../../contexts/Groups'
import { AvatarGroup } from '../../ui-kit/AvatarGroup'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'

export const GroupsCard: FC = () => {
  const router = useRouter()
  const { groups } = useGroupsContext()

  const goToGroup = useCallback(
    async (groupId: string) => {
      await router.push(ROUTES.GROUP(groupId))
    },
    [router]
  )

  const handleCreate = useCallback(async () => {
    const { group } = await createGroup({
      name: 'Untitled',
    })

    await goToGroup(group.id)
  }, [goToGroup])

  return (
    <Card>
      <Card.Title
        title="Groups"
        action={
          <Button
            rounded
            size="sm"
            iconStart={<PlusIcon />}
            onClick={handleCreate}
          />
        }
      />

      {groups.length ? <Card.Divider /> : null}

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
    </Card>
  )
}
