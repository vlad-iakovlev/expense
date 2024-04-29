import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { DefaultCurrency } from './GroupSettingsGeneral.DefaultCurrency.jsx'
import { Delete } from './GroupSettingsGeneral.Delete.jsx'
import { Name } from './GroupSettingsGeneral.Name.jsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupSettingsGeneralCard = ({ className, groupId }: Props) => (
  <Card aria-label="General group settings" className={className}>
    <Card.Title title="General" actions={<Delete groupId={groupId} />} />
    <Card.Divider />
    <Name groupId={groupId} />
    <DefaultCurrency groupId={groupId} />
  </Card>
)
