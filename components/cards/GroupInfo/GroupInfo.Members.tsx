import { useGroupMembers } from '../../../contexts/RootStore/hooks/useGroupMembers.ts'
import { AvatarGroup } from '../../ui-kit/AvatarGroup/AvatarGroup.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string
}

export const Members = ({ groupId }: Props) => {
  const { groupMembers } = useGroupMembers({ groupId })

  return (
    <Card.Item
      label="Members"
      value={
        <AvatarGroup
          className="flex-none"
          avatars={groupMembers.map((user) => ({
            name: user.name ?? undefined,
            src: user.image ?? undefined,
          }))}
          max={10}
          size="sm"
        />
      }
    />
  )
}
