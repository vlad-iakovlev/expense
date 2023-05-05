import { FC } from 'react'
import { useGroupUsers } from '../../../stores/RootStore/hooks/useGroupUsers.ts'
import { Avatar } from '../../ui-kit/Avatar/Avatar.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupUsersCard: FC<Props> = ({ className, groupId }) => {
  const { groupUsers } = useGroupUsers({ groupId })

  return (
    <Card className={className}>
      <Card.Title title="Users" />

      {!!groupUsers.length && (
        <>
          <Card.Divider />
          {groupUsers.map((user) => (
            <Card.Text
              key={user.id}
              label={user.name}
              prefix={
                <Avatar
                  src={user.image ?? undefined}
                  name={user.name ?? undefined}
                  size="sm"
                />
              }
            />
          ))}
        </>
      )}
    </Card>
  )
}
