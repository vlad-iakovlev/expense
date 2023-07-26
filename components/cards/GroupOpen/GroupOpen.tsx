import { useRouter } from 'next/router.js'
import { useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroup } from '../../../contexts/RootStore/hooks/useGroup.ts'
import { useGroupBalance } from '../../../contexts/RootStore/hooks/useGroupBalance.ts'
import { useGroupMembers } from '../../../contexts/RootStore/hooks/useGroupMembers.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { AvatarGroup } from '../../ui-kit/AvatarGroup/AvatarGroup.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string
}

export const GroupOpenCard = ({ groupId }: Props) => {
  const router = useRouter()
  const { group } = useGroup({ groupId })
  const { groupBalance } = useGroupBalance({ groupId })
  const { groupMembers } = useGroupMembers({ groupId })

  const handleClick = useCallback(() => {
    const href = ROUTES.GROUP(groupId)
    void router.push({ pathname: href, query: { animation: 'forward' } }, href)
  }, [groupId, router])

  return (
    <Card onClick={handleClick}>
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

      <Card.Text
        label="Balance"
        value={
          <Amount
            className="font-medium select-text"
            amount={groupBalance.balance}
            currency={groupBalance.currency}
            showSign="negative"
          />
        }
      />
    </Card>
  )
}
