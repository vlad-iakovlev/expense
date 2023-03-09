import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { ROUTES } from '../../../constants/routes'
import { useGroupsContext } from '../../contexts/Groups'
import { AvatarGroup } from '../../ui-kit/AvatarGroup'
import { Card } from '../../ui-kit/Card'
import { GroupsCreate } from './GroupsCreate'

export const GroupsCard: FC = () => {
  const router = useRouter()
  const { groupsResponse } = useGroupsContext()

  const goToGroup = useCallback(
    async (groupId: string) => {
      await router.push(ROUTES.GROUP(groupId))
    },
    [router]
  )

  return (
    <Card>
      <Card.Title title="Groups" action={<GroupsCreate />} />
      {groupsResponse?.groups.length !== 0 && <Card.Divider />}

      {groupsResponse?.groups.map((group) => (
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

      {!groupsResponse && (
        <>
          <Card.Skeleton />
          <Card.Skeleton />
          <Card.Skeleton />
        </>
      )}
    </Card>
  )
}
