import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { forwardRef, useState } from 'react'
import { Page } from '../../components/layout/Page/Page.tsx'
import { Operation } from '../../components/pages/Operation/Operation.tsx'

const OperationPage = forwardRef<HTMLDivElement, NextPage>(
  function OperationPage({}, ref) {
    const router = useRouter()
    const [operationId] = useState(router.query.operationId)

    if (typeof operationId !== 'string') {
      return null
    }

    return (
      <Page ref={ref}>
        <Operation operationId={operationId} />
      </Page>
    )
  }
)

export default OperationPage
