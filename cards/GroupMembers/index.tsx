import { Card } from '@/components/common/Card/index.jsx'
import { useGroupMembers } from '@/contexts/RootStore/hooks/useGroupMembers.js'
import { Invite } from './Invite.jsx'
import { Member } from './Member.jsx'

interface GroupMembersCardProps {
  className?: string
  groupId: string
}

export const GroupMembersCard = ({
  className,
  groupId,
}: GroupMembersCardProps) => {
  const { groupMembers } = useGroupMembers({ groupId })

  return (
    <Card className={className} aria-label="Group Members">
      <Card.Title title="Members" actions={<Invite groupId={groupId} />} />

      {!!groupMembers.length && (
        <>
          <Card.Divider />
          {groupMembers.map((user) => (
            <Member
              key={user.id}
              groupId={groupId}
              userId={user.id}
              name={user.name ?? undefined}
              image={user.image ?? undefined}
            />
          ))}
        </>
      )}
    </Card>
  )
}
