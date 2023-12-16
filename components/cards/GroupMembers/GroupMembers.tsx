import { useGroupMembers } from '../../../contexts/RootStore/hooks/useGroupMembers.js'
import { Card } from '../../ui-kit/Card/Card.jsx'
import { Invite } from './GroupMembers.Invite.jsx'
import { Member } from './GroupMembers.Member.jsx'

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
