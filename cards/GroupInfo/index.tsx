import { Card } from '@/components/common/Card/index.jsx'
import { Balance } from './Balance.jsx'
import { Members } from './Members.jsx'
import { Settings } from './Settings.jsx'

interface GroupInfoCardProps {
  className?: string
  groupId: string
}

export const GroupInfoCard = ({ className, groupId }: GroupInfoCardProps) => (
  <Card className={className} aria-label="Group info">
    <Card.Title title="Info" actions={<Settings groupId={groupId} />} />
    <Card.Divider />
    <Members groupId={groupId} />
    <Balance groupId={groupId} />
  </Card>
)
