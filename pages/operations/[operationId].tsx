import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useState } from 'react'
import { Page } from '@/components/layout/Page/Page.jsx'
import { Operation } from '@/components/pages/Operation.jsx'

const OperationPage: NextPage = () => {
  const router = useRouter()
  const [operationId] = useState(router.query.operationId)

  if (typeof operationId !== 'string') {
    return null
  }

  return (
    <Page>
      <Operation operationId={operationId} />
    </Page>
  )
}

export default OperationPage
