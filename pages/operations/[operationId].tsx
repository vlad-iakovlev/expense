import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { forwardRef, useState } from 'react'
import { PageWrapper } from '../../components/layout/PageWrapper/PageWrapper.tsx'
import { Operation } from '../../components/pages/Operation/Operation.tsx'

const OperationPage = forwardRef<HTMLDivElement, NextPage>(
  function OperationPage({}, ref) {
    const router = useRouter()
    const [operationId] = useState(router.query.operationId)

    if (typeof operationId !== 'string') {
      return null
    }

    return (
      <PageWrapper ref={ref}>
        <Operation operationId={operationId} />
      </PageWrapper>
    )
  }
)

export default OperationPage
