import { Card } from '@/components/common/Card/index'
import { Balance } from './Balance'
import { Members } from './Members'
import { Settings } from './Settings'

type GroupInfoCardProps = {
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
