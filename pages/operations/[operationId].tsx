import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper.tsx'
import { Operation } from '../../components/pages/Operation/Operation.tsx'

const OperationPage: NextPage = () => {
  const router = useRouter()
  const operationId = router.query.operationId

  if (typeof operationId !== 'string') {
    return null
  }

  return (
    <PageWrapper>
      <Operation operationId={operationId} />
    </PageWrapper>
  )
}

export default OperationPage
