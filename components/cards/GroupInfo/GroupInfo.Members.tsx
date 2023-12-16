import { useGroupMembers } from '../../../contexts/RootStore/hooks/useGroupMembers.js'
import { AvatarGroup } from '../../ui-kit/AvatarGroup/AvatarGroup.jsx'
import { Card } from '../../ui-kit/Card/Card.jsx'

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
          aria-label={groupMembers.map((user) => user.name).join(', ')}
        />
      }
    />
  )
}
