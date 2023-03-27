import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { GroupInfoBalance } from './GroupInfoBalance'
import { GroupInfoDefaultCurrency } from './GroupInfoDefaultCurrency'
import { GroupInfoDelete } from './GroupInfoDelete'
import { GroupInfoName } from './GroupInfoName'

interface Props {
  className?: string
}

export const GroupInfoCard: FC<Props> = ({ className }) => {
  return (
    <Card className={className} title="Info" action={<GroupInfoDelete />}>
      <GroupInfoName />
      <GroupInfoDefaultCurrency />
      <GroupInfoBalance />
    </Card>
  )
}
