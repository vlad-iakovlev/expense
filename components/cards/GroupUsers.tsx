import { FC } from 'react'
import { ClientGroup } from '../../api/types/groups'
import { Avatar } from '../ui-kit/Avatar'
import { Card } from '../ui-kit/Card'

interface Props {
  group: ClientGroup
}

export const GroupUsers: FC<Props> = ({ group }) => {
  return (
    <Card>
      <Card.Title>Users</Card.Title>

      {group.users.map((user) => (
        <Card.Button
          key={user.id}
          disabled
          start={<Avatar src={user.image} name={user.name} size="sm" />}
        >
          {user.name}
        </Card.Button>
      ))}
    </Card>
  )
}
