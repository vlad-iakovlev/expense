import { Card } from '../../ui-kit/Card/Card.tsx'
import { DefaultCurrency } from './GroupSettingsGeneral.DefaultCurrency.tsx'
import { Delete } from './GroupSettingsGeneral.Delete.tsx'
import { Name } from './GroupSettingsGeneral.Name.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupSettingsGeneralCard = ({ className, groupId }: Props) => {
  return (
    <Card className={className}>
      <Card.Title title="General" actions={<Delete groupId={groupId} />} />
      <Card.Divider />
      <Name groupId={groupId} />
      <DefaultCurrency groupId={groupId} />
    </Card>
  )
}
