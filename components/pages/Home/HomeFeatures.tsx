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
    <Card.Text
      prefix={<ArrowPathIcon className="w-6 h-6" />}
      label="Built-in cross-device sync"
    />
    <Card.Text
      prefix={<SignalSlashIcon className="w-6 h-6" />}
      label="Available even offline"
    />
    <Card.Text
      prefix={<TagIcon className="w-6 h-6" />}
      label="Flexible categorization"
    />
    <Card.Text
      prefix={<UsersIcon className="w-6 h-6" />}
      label="Collaborative tracking"
    />
    <Card.Text
      prefix={<CurrencyDollarIcon className="w-6 h-6" />}
      label="Automatic currency conversion"
    />
    <Card.Text
      prefix={<ChartPieIcon className="w-6 h-6" />}
      label="Pie charts for week/month/year"
    />
  </Card>
)
