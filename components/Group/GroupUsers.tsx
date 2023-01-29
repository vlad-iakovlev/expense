import { FC } from 'react'
import { ClientGroup } from '../../models/group'
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
          start={<Avatar src={user.image} name={user.name} />}
        >
          {user.name}
        </Card.Button>
      ))}
    </Card>
  )
}
