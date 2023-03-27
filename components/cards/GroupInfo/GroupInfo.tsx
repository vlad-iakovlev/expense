import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { GroupInfoBalance } from './GroupInfoBalance'
import { GroupInfoDefaultCurrency } from './GroupInfoDefaultCurrency'
import { GroupInfoDelete } from './GroupInfoDelete'
import { GroupInfoName } from './GroupInfoName'
import { GroupInfoRenameCategory } from './GroupInfoRenameCategory'

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
      <Card.Divider />
      <GroupInfoRenameCategory />
    </Card>
  )
}
