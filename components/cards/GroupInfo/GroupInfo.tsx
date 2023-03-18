import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { GroupInfoBalance } from './GroupInfoBalance'
import { GroupInfoDefaultCurrency } from './GroupInfoDefaultCurrency'
import { GroupInfoDelete } from './GroupInfoDelete'
import { GroupInfoName } from './GroupInfoName'

export const GroupInfoCard: FC = () => {
  return (
    <Card>
      <Card.Title title="Info" action={<GroupInfoDelete />} />
      <Card.Divider />
      <GroupInfoName />
      <GroupInfoDefaultCurrency />
      <GroupInfoBalance />
    </Card>
  )
}
