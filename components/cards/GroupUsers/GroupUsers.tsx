import { FC } from 'react'
import { useGroupContext } from '../../contexts/Group'
import { Avatar } from '../../ui-kit/Avatar'
import { Card } from '../../ui-kit/Card'

interface Props {
  className?: string
}

export const GroupUsersCard: FC<Props> = ({ className }) => {
  const { groupResponse } = useGroupContext()

  return (
    <Card className={className} title="Users">
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
