import { Card } from '../../ui-kit/Card/Card.tsx'
import { Balance } from './GroupInfo.Balance.tsx'
import { DefaultCurrency } from './GroupInfo.DefaultCurrency.tsx'
import { Delete } from './GroupInfo.Delete.tsx'
import { Name } from './GroupInfo.Name.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupInfoCard = ({ className, groupId }: Props) => {
  return (
    <Card className={className}>
      <Card.Title title="Info" actions={<Delete groupId={groupId} />} />
      <Card.Divider />
      <Name groupId={groupId} />
      <DefaultCurrency groupId={groupId} />
      <Balance groupId={groupId} />
    </Card>
  )
}
