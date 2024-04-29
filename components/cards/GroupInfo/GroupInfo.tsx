import { Card } from '../../ui-kit/Card/Card.jsx'
import { Balance } from './GroupInfo.Balance.jsx'
import { Members } from './GroupInfo.Members.jsx'
import { Settings } from './GroupInfo.Settings.jsx'

interface Props {
  className?: string
  groupId: string
}

export const GroupInfoCard = ({ className, groupId }: Props) => (
  <Card className={className} aria-label="Group info">
    <Card.Title title="Info" actions={<Settings groupId={groupId} />} />
    <Card.Divider />
    <Members groupId={groupId} />
    <Balance groupId={groupId} />
  </Card>
)
