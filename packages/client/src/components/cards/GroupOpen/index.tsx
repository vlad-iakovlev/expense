import { Link } from '@tanstack/react-router'
import { Amount } from '@/components/common/Amount'
import { AvatarGroup } from '@/components/common/AvatarGroup'
import { Card } from '@/components/common/Card'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup'
import { useGroupBalance } from '@/contexts/RootStore/hooks/useGroupBalance'
import { useGroupMembers } from '@/contexts/RootStore/hooks/useGroupMembers'
import { Route as GroupRoute } from '@/routes/group.$groupId.index'

type GroupOpenCardProps = {
  groupId: string
}

export const GroupOpenCard = ({ groupId }: GroupOpenCardProps) => {
  const { group } = useGroup({ groupId })
  const { groupBalance } = useGroupBalance({ groupId })
  const { groupMembers } = useGroupMembers({ groupId })

  return (
    <Link className="rounded-md" to={GroupRoute.to} params={{ groupId }}>
      <Card aria-label={`Group ${group.name}`} clickable>
        <Card.Title
          title={group.name}
          actions={
            <AvatarGroup
              className="flex-none"
              avatars={groupMembers.map((user) => ({
                name: user.name,
                src: user.image ?? undefined,
              }))}
              max={3}
              size="sm"
            />
          }
        />

        <Card.Divider />

        <Card.Item
          label="Balance"
          value={
            <Amount
              className="font-medium select-text"
              amount={groupBalance.balance}
              currency={groupBalance.currency}
              showSign="negative"
            />
          }
          tabIndex={-1}
        />
      </Card>
    </Link>
  )
}
