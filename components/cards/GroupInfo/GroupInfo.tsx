import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
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
    </Card>
  )
}
