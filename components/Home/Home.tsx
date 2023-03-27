import {
  ArrowPathIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  WifiIcon,
} from '@heroicons/react/24/outline'
import { signIn } from 'next-auth/react'
import { FC, useCallback, useState } from 'react'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'
import { Card } from '../ui-kit/Card'
import { Columns } from '../ui-kit/Columns'

export const Home: FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = useCallback(async () => {
    try {
      setIsLoading(true)
      await signIn('google')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <>
      <Breadcrumbs title="Home" />

      <Columns>
        <Card>
          <Card.Title title="Info" />
          <Card.Divider />
          <Card.Text end={<div className="font-medium">Expense</div>}>
            Name
          </Card.Text>
          <Card.Text
            end={<div className="font-medium">Expense tracking app</div>}
          >
            Description
          </Card.Text>
          <Card.Link
            end={<div className="font-medium">GitHub</div>}
            href="https://github.com/vlad-yakovlev/expense"
          >
            Code
          </Card.Link>
          <Card.Button
            end={<div className="font-medium">Sign In</div>}
            disabled={isLoading}
            onClick={handleSignIn}
          >
            What to do?
          </Card.Button>
        </Card>
        <Card>
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
      </Columns>
    </>
  )
}
