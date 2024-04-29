'use client'

import { Page } from '@/components/layout/Page/index.jsx'
import { Operation } from '@/components/pages/Operation.jsx'

interface OperationPageProps {
  params: {
    operationId: string
  }
}

export default function OperationPage({ params }: OperationPageProps) {
  return (
    <Page>
      <Operation operationId={params.operationId} />
    </Page>
  )
}
