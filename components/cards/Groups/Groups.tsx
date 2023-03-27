import { FC } from 'react'
import { ROUTES } from '../../../constants/routes'
import { useGroupsContext } from '../../contexts/Groups'
import { AvatarGroup } from '../../ui-kit/AvatarGroup'
import { Card } from '../../ui-kit/Card'
import { GroupsCreate } from './GroupsCreate'

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
                name: user.name || '',
                src: user.image || '',
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
