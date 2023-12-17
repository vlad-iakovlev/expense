import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useCallback } from 'react'
import { NextHead } from '../next/Head.js'
import { Card } from '../ui-kit/Card/Card.jsx'

export const Fallback = () => {
  const handleRestart = useCallback(() => {
    window.location.href = '/'
  }, [])

  return (
    <>
      <NextHead>
        <title>Expense</title>
      </NextHead>

      <div className="bg-primary fixed inset-0 z-[100] flex items-center justify-center">
        <Card className="min-w-72">
          <Card.Title title="Oops!" />
          <Card.Divider />
          <Card.Item
            label="Restart Expense"
            prefix={<ArrowPathIcon className="h-6 w-6" />}
            onClick={handleRestart}
          />
        </Card>
      </div>
    </>
  )
}
