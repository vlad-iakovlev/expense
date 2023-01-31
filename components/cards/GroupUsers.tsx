import { FC } from 'react'
import { useGroupContext } from '../contexts/Group'
import { Avatar } from '../ui-kit/Avatar'
import { Card } from '../ui-kit/Card'

export const GroupUsersCard: FC = () => {
  const { group } = useGroupContext()

  return (
    <Card>
      <Card.Title title="Users" />

      <Card.Divider />

      {group.users.map((user) => (
        <Card.Button
          key={user.id}
          disabled
          start={
            <Avatar src={user.image || ''} name={user.name || ''} size="sm" />
          }
        >
          {user.name}
        </Card.Button>
      ))}
    </Card>
  )
}
