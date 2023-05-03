import { FC } from 'react'
import { useGroup } from '../../../stores/RootStore/hooks/useGroup.ts'
import { Avatar } from '../../ui-kit/Avatar/Avatar.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupUsersCard: FC<Props> = ({ className, groupId }) => {
  const { group } = useGroup({ groupId })

  return (
    <Card className={className}>
      <Card.Title title="Users" />

      {!!group.users.length && (
        <>
          <Card.Divider />
          {group.users.map((user) => (
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
            />
          ))}
        </>
      )}
    </Card>
  )
}
