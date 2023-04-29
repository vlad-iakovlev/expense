import { FC } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroup } from '../../../stores/RootStore/hooks/useGroup.ts'
import { AvatarGroup } from '../../ui-kit/AvatarGroup/AvatarGroup.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string
}

export const GroupsItem: FC<Props> = ({ groupId }) => {
  const { group } = useGroup({ groupId })

  return (
    <Card.Link
      end={
        <AvatarGroup
          className="flex-none"
          avatars={group.users.map((user) => ({
            name: user.name ?? undefined,
            src: user.image ?? undefined,
          }))}
          max={3}
          size="sm"
        />
      }
      href={ROUTES.GROUP(group.id)}
    >
      {group.name}
    </Card.Link>
  )
}
