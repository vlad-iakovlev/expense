import { FC } from 'react'
import { ClientGroup } from '../../models/group'
import { Avatar } from '../ui-kit/Avatar'

interface Props {
  group: ClientGroup
}

export const GroupUsers: FC<Props> = ({ group }) => {
  return (
    <div className="flex flex-col gap-4 px-6 py-6 bg-white rounded-md shadow">
      <h2 className="font-medium">Users</h2>

      {group.users.map((user) => (
        <div className="flex items-center" key={user.id}>
          <Avatar
            className="flex-none mr-4"
            src={user.image}
            name={user.name}
          />
          <div className="text-sm truncate">{user.name}</div>
        </div>
      ))}
    </div>
  )
}
