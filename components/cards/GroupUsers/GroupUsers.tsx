import { useGroupUsers } from '../../../contexts/RootStore/hooks/useGroupUsers.ts'
import { Avatar } from '../../ui-kit/Avatar/Avatar.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Delete } from './GroupUsers.Delete.tsx'
import { Invite } from './GroupUsers.Invite.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupUsersCard: React.FC<Props> = ({ className, groupId }) => {
  const { groupUsers } = useGroupUsers({ groupId })

  return (
    <Card className={className}>
      <Card.Title title="Users" actions={<Invite groupId={groupId} />} />

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
              suffix={
                groupUsers.length > 1 && (
                  <Delete groupId={groupId} userId={user.id} />
                )
              }
            />
          ))}
        </>
      )}
    </Card>
  )
}
