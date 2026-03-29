'use client'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { Card } from '@/components/common/Card'

type ErrorProps = {
  error: Error & { digest?: string }
}

const ErrorPage = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-primary-background">
      <Card className="min-w-72">
        <Card.Title title="Oops!" />
        <Card.Divider />
        <Card.Item
          label="Restart Expense"
          prefix={<ArrowPathIcon className="h-6 w-6" />}
          onClick={() => (window.location.href = '/')}
        />
      </Card>
    </div>
  )
}

export default ErrorPage
