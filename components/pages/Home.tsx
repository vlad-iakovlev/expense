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
import { NextHead } from '../next/Head.ts'
import { Card } from '../ui-kit/Card/Card.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'
import { Title } from '../ui-kit/Title/Title.tsx'

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
        <Card>
          <Card.Title title="Info" />
          <Card.Divider />
          <Card.Text
            label="Name"
            value={<div className="font-medium">Expense</div>}
          />
          <Card.Text
            label="Name"
            value={<div className="font-medium">Expense tracker</div>}
          />
          <Card.Link
            label="Created by"
            value={<div className="font-medium">Vlad Yakovlev</div>}
            href="https://vlad-yakovlev.dev"
          />
        </Card>

        <Card className="md:row-span-full">
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

        <Card className="md:max-lg:col-[1] md:max-lg:row-[2]">
          <Card.Title title="What to do?" />
          <Card.Divider />
          <Card.Button
            disabled={isLoading}
            prefix={<ArrowLeftOnRectangleIcon className="w-6 h-6" />}
            label="Sign In with Google Account"
            onClick={handleSignIn}
          />
          <Card.Link
            prefix={<CodeBracketIcon className="w-6 h-6" />}
            label="See the code on GitHub"
            href="https://github.com/vlad-yakovlev/expense"
          />
        </Card>
      </Columns>
    </>
  )
}
