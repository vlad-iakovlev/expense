import { FC } from 'react'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { GroupInfoBalance } from './GroupInfoBalance.tsx'
import { GroupInfoDefaultCurrency } from './GroupInfoDefaultCurrency.tsx'
import { GroupInfoDelete } from './GroupInfoDelete.tsx'
import { GroupInfoName } from './GroupInfoName.tsx'

interface Props {
  className?: string
}

export const GroupInfoCard: FC<Props> = ({ className }) => {
  return (
    <Card className={className}>
      <Card.Title title="Info" action={<GroupInfoDelete />} />
      <Card.Divider />
      <GroupInfoName />
      <GroupInfoDefaultCurrency />
      <GroupInfoBalance />
    </Card>
  )
}
