import { FC } from 'react'
import { useGroupContext } from '../../contexts/Group'
import { Avatar } from '../../ui-kit/Avatar'
import { Card } from '../../ui-kit/Card'

export const GroupUsersCard: FC = () => {
  const { groupResponse } = useGroupContext()

  return (
    <Card>
      <Card.Title title="Users" />
      {groupResponse?.group.users.length !== 0 && <Card.Divider />}

      {groupResponse?.group.users.map((user) => (
        <Card.Text
          key={user.id}
          start={
            <Avatar src={user.image || ''} name={user.name || ''} size="sm" />
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
