import { ArrowPathIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import React from 'react'
import { Card } from '@/components/common/Card/index'

export const Fallback = () => {
  const handleRestart = React.useCallback(() => {
    window.location.href = '/'
  }, [])

  return (
    <>
      <Head>
        <title>Expense</title>
      </Head>

      <div className="fixed inset-0 z-100 flex items-center justify-center bg-primary-background">
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
