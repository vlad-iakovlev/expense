'use client'

import Link from 'next/link'
import { Card } from '@/components/common/Card/index'

const NotFoundPage = () => (
  <main className="fixed inset-0 z-100 flex items-center justify-center bg-primary-background p-4">
    <Card className="min-w-72">
      <Card.Title title="Page not found" />
      <Card.Divider />
      <Link href="/">
        <Card.Item label="Go to dashboard" tabIndex={-1} />
      </Link>
    </Card>
  </main>
)

export default NotFoundPage
