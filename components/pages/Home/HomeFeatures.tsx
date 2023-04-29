import {
  ArrowPathIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  SignalSlashIcon,
  TagIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { FC } from 'react'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
}

export const HomeFeatures: FC<Props> = ({ className }) => (
  <Card className={className}>
    <Card.Title title="Features" />
    <Card.Divider />
    <Card.Text start={<ArrowPathIcon className="w-6 h-6" />}>
      Built-in cross-device sync
    </Card.Text>
    <Card.Text start={<SignalSlashIcon className="w-6 h-6" />}>
      Available even offline
    </Card.Text>
    <Card.Text start={<TagIcon className="w-6 h-6" />}>
      Flexible categorization
    </Card.Text>
    <Card.Text start={<UsersIcon className="w-6 h-6" />}>
      Collaborative tracking
    </Card.Text>
    <Card.Text start={<CurrencyDollarIcon className="w-6 h-6" />}>
      Automatic currency conversion
    </Card.Text>
    <Card.Text start={<ChartPieIcon className="w-6 h-6" />}>
      Pie charts for week/month/year
    </Card.Text>
  </Card>
)
