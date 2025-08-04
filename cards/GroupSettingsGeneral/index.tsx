import { Card } from '@/components/common/Card/index'
import { DefaultCurrency } from './DefaultCurrency'
import { Delete } from './Delete'
import { Name } from './Name'

type GroupSettingsGeneralCardProps = {
  className?: string
  groupId: string
}

export const GroupSettingsGeneralCard = ({
  className,
  groupId,
}: GroupSettingsGeneralCardProps) => (
  <Card aria-label="General group settings" className={className}>
    <Card.Title title="General" actions={<Delete groupId={groupId} />} />
    <Card.Divider />
    <Name groupId={groupId} />
    <DefaultCurrency groupId={groupId} />
  </Card>
)
