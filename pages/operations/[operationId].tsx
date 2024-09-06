import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { Page } from '@/components/layout/Page/index.jsx'
import { Operation } from '@/components/pages/Operation.jsx'

const OperationPage: NextPage = () => {
  const router = useRouter()

  if (typeof router.query.operationId !== 'string') {
    return null
  }

  return (
    <Page>
      <Operation operationId={router.query.operationId} />
    </Page>
  )
}

export default OperationPage
