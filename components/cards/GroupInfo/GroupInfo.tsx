import { FC } from 'react'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { GroupInfoBalance } from './GroupInfoBalance.tsx'
import { GroupInfoDefaultCurrency } from './GroupInfoDefaultCurrency.tsx'
import { GroupInfoDelete } from './GroupInfoDelete.tsx'
import { GroupInfoName } from './GroupInfoName.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupInfoCard: FC<Props> = ({ className, groupId }) => {
  return (
    <Card className={className}>
      <Card.Title title="Info" action={<GroupInfoDelete groupId={groupId} />} />
      <Card.Divider />
      <GroupInfoName groupId={groupId} />
      <GroupInfoDefaultCurrency groupId={groupId} />
      <GroupInfoBalance groupId={groupId} />
    </Card>
  )
}
