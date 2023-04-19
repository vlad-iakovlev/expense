import {
  ArrowPathIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  WifiIcon,
} from '@heroicons/react/24/outline'
import { FC } from 'react'
import { Card } from '../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
}

export const HomeFeatures: FC<Props> = ({ className }) => (
  <Card className={className}>
    <Card.Title title="Features" />
    <Card.Divider />
    <Card.Text start={<WifiIcon className="w-6 h-6" />}>
      Fully online expense tracker
    </Card.Text>
    <Card.Text start={<ArrowPathIcon className="w-6 h-6" />}>
      Built-in sync between devices
    </Card.Text>
    <Card.Text start={<UserGroupIcon className="w-6 h-6" />}>
      Manage expenses together
    </Card.Text>
    <Card.Text start={<RectangleGroupIcon className="w-6 h-6" />}>
      Categorize your expenses
    </Card.Text>
    <Card.Text start={<ChartPieIcon className="w-6 h-6" />}>
      Pie chart for week/month/year
    </Card.Text>
    <Card.Text start={<CurrencyDollarIcon className="w-6 h-6" />}>
      Automatic currency conversion
    </Card.Text>
  </Card>
)
