import { useGroupMembers } from '../../../contexts/RootStore/hooks/useGroupMembers.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Invite } from './GroupMembers.Invite.tsx'
import { Member } from './GroupMembers.Member.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupMembersCard = ({ className, groupId }: Props) => {
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
