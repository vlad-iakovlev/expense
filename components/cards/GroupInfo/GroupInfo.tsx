import { Card } from '../../ui-kit/Card/Card.tsx'
import { Balance } from './GroupInfo.Balance.tsx'
import { Members } from './GroupInfo.Members.tsx'
import { Settings } from './GroupInfo.Settings.tsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupInfoCard = ({ className, groupId }: Props) => {
  return (
    <Card className={className} aria-label="Group info">
      <Card.Title title="Info" actions={<Settings groupId={groupId} />} />
      <Card.Divider />
      <Members groupId={groupId} />
      <Balance groupId={groupId} />
    </Card>
  )
}
