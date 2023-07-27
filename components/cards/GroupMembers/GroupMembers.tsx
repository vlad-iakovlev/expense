import { useGroupMembers } from '../../../contexts/RootStore/hooks/useGroupMembers.ts'
import { Avatar } from '../../ui-kit/Avatar/Avatar.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Delete } from './GroupMembers.Delete.tsx'
import { Invite } from './GroupMembers.Invite.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupMembersCard = ({ className, groupId }: Props) => {
  const { groupMembers } = useGroupMembers({ groupId })

  return (
    <Card className={className}>
      <Card.Title title="Members" actions={<Invite groupId={groupId} />} />

      {!!groupMembers.length && (
        <>
          <Card.Divider />
          {groupMembers.map((user) => (
            <Card.Item
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
                groupMembers.length > 1 && (
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
