import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useCallback } from 'react'
import { NextHead } from '../next/Head.ts'
import { Card } from '../ui-kit/Card/Card.tsx'

export const Fallback = () => {
  const handleRestart = useCallback(() => {
    window.location.href = '/'
  }, [])

  return (
    <>
      <NextHead>
        <title>Expense</title>
      </NextHead>

      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-300">
        <Card className="min-w-72">
          <Card.Title title="Oops!" />
          <Card.Divider />
          <Card.Button
            label="Restart Expense"
            prefix={<ArrowPathIcon className="w-6 h-6" />}
            onClick={handleRestart}
          />
        </Card>
      </div>
    </>
  )
}
