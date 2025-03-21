import { Amount } from '@/components/common/Amount.jsx'
import { AvatarGroup } from '@/components/common/AvatarGroup.jsx'
import { Card } from '@/components/common/Card/index.jsx'
import { NextLink } from '@/components/next/Link.js'
import { ROUTES } from '@/constants/routes.js'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'
import { useGroupBalance } from '@/contexts/RootStore/hooks/useGroupBalance.js'
import { useGroupMembers } from '@/contexts/RootStore/hooks/useGroupMembers.js'

interface GroupOpenCardProps {
  groupId: string
}

export const GroupOpenCard = ({ groupId }: GroupOpenCardProps) => {
  const { group } = useGroup({ groupId })
  const { groupBalance } = useGroupBalance({ groupId })
  const { groupMembers } = useGroupMembers({ groupId })

  return (
    <NextLink className="rounded-md" href={ROUTES.GROUP(groupId)}>
      <Card aria-label={`Group ${group.name}`} clickable>
        <Card.Title
          title={group.name}
          actions={
            <AvatarGroup
              className="flex-none"
              avatars={groupMembers.map((user) => ({
                name: user.name ?? undefined,
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
              className="select-text font-medium"
              amount={groupBalance.balance}
              currency={groupBalance.currency}
              showSign="negative"
            />
          }
          tabIndex={-1}
        />
      </Card>
    </NextLink>
  )
}
