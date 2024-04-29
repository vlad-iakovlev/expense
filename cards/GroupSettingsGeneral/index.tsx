import { Card } from '@/components/common/Card/index.jsx'
import { DefaultCurrency } from './DefaultCurrency.jsx'
import { Delete } from './Delete.jsx'
import { Name } from './Name.jsx'

interface GroupSettingsGeneralCardProps {
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
