import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Page } from '@/components/layout/Page/index'
import { Operation } from '@/components/pages/Operation'

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
