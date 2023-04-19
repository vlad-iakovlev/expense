import { FC } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroupsContext } from '../../contexts/Groups.tsx'
import { AvatarGroup } from '../../ui-kit/AvatarGroup/AvatarGroup.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { GroupsCreate } from './GroupsCreate.tsx'

interface Props {
  className?: string
}

export const GroupsCard: FC<Props> = ({ className }) => {
  const { groupsResponse } = useGroupsContext()

  return (
    <Card className={className}>
      <Card.Title title="Groups" action={<GroupsCreate />} />
      {groupsResponse?.groups.length !== 0 && <Card.Divider />}

      {groupsResponse?.groups.map((group) => (
        <Card.Link
          key={group.id}
          end={
            <AvatarGroup
              className="flex-none"
              avatars={group.users.map((user) => ({
                name: user.name ?? undefined,
                src: user.image ?? undefined,
              }))}
              max={3}
              size="sm"
            />
          }
          href={ROUTES.GROUP(group.id)}
        >
          {group.name}
        </Card.Link>
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
