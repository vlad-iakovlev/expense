import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  ChartPieIcon,
  CodeBracketIcon,
  CurrencyDollarIcon,
  SignalSlashIcon,
  TagIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { NextHead } from '../next/Head.js'
import { Card } from '../ui-kit/Card/Card.jsx'
import { Columns } from '../ui-kit/Columns/Columns.jsx'
import { Title } from '../ui-kit/Title/Title.jsx'

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = useCallback(() => {
    void (async () => {
      try {
        setIsLoading(true)
        await signIn('google')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <>
      <NextHead>
        <title>Expense</title>
      </NextHead>

      <Title title="Home" />

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] lg:grid-rows-none">
        <Card aria-label="Info">
          <Card.Title title="Info" />
          <Card.Divider />
          <Card.Item
            label="Name"
            value={<div className="font-medium">Expense</div>}
          />
          <Card.Item
            label="Description"
            value={<div className="font-medium">Expense tracker</div>}
          />
          <Card.Link
            label="Created by"
            value={<div className="font-medium">Vlad Iakovlev</div>}
            href="https://vlad-iakovlev.dev"
          />
        </Card>

        <Card aria-label="Features" className="md:row-span-full">
          <Card.Title title="Features" />
          <Card.Divider />
          <Card.Item
            prefix={<ArrowPathIcon className="h-6 w-6" />}
            label="Built-in cross-device sync"
          />
          <Card.Item
            prefix={<SignalSlashIcon className="h-6 w-6" />}
            label="Available even offline"
          />
          <Card.Item
            prefix={<TagIcon className="h-6 w-6" />}
            label="Flexible categorization"
          />
          <Card.Item
            prefix={<UsersIcon className="h-6 w-6" />}
            label="Collaborative tracking"
          />
          <Card.Item
            prefix={<CurrencyDollarIcon className="h-6 w-6" />}
            label="Automatic currency conversion"
          />
          <Card.Item
            prefix={<ChartPieIcon className="h-6 w-6" />}
            label="Pie charts for week/month/year"
          />
        </Card>

        <Card
          aria-label="What to do?"
          className="md:max-lg:col-[1] md:max-lg:row-[2]"
        >
          <Card.Title title="What to do?" />
          <Card.Divider />
          <Card.Item
            disabled={isLoading}
            prefix={<ArrowLeftOnRectangleIcon className="h-6 w-6" />}
            label="Sign In with Google Account"
            onClick={handleSignIn}
          />
          <Card.Link
            prefix={<CodeBracketIcon className="h-6 w-6" />}
            label="See the code on GitHub"
            href="https://github.com/vlad-iakovlev/expense"
          />
        </Card>
      </Columns>
    </>
  )
}
