import { FC } from 'react'
import { useGroupContext } from '../../contexts/Group.tsx'
import { Avatar } from '../../ui-kit/Avatar/Avatar.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
}

export const GroupUsersCard: FC<Props> = ({ className }) => {
  const { groupResponse } = useGroupContext()

  return (
    <Card className={className}>
      <Card.Title title="Users" />
      {groupResponse?.group.users.length !== 0 && <Card.Divider />}

      {groupResponse?.group.users.map((user) => (
        <Card.Text
          key={user.id}
          start={
            <Avatar
              src={user.image ?? undefined}
              name={user.name ?? undefined}
              size="sm"
            />
          }
        >
          {user.name}
        </Card.Text>
      ))}

      {!groupResponse && (
        <>
          <Card.Skeleton />
          <Card.Skeleton />
          <Card.Skeleton />
        </>
      )}
    </Card>
  )
}
