import { AvatarGroup } from '@/components/AvatarGroup'
import { Card } from '@/components/Card'
import { useGroupMembers } from '@/contexts/RootStore/hooks/useGroupMembers'

type MembersProps = {
  groupId: string
}

export const Members = ({ groupId }: MembersProps) => {
  const { groupMembers } = useGroupMembers({ groupId })

  return (
    <Card.Item
      label="Members"
      value={
        <AvatarGroup
          className="flex-none"
          avatars={groupMembers.map((user) => ({
            name: user.name,
            src: user.image ?? undefined,
          }))}
          max={10}
          size="sm"
          aria-label={groupMembers.map((user) => user.name).join(', ')}
        />
      }
    />
  )
}
