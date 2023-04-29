import assert from 'assert'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { NextError } from '../../components/next/Error.ts'
import { NextHead } from '../../components/next/Head.ts'
import { Operation } from '../../components/pages/Operation/Operation.tsx'
import { Overlay } from '../../components/ui-kit/Overlay/Overlay.tsx'

interface Props {
  operationId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const operationId = context.query.operationId
  assert(typeof operationId === 'string', 'operationId is not a string')
  return Promise.resolve({ props: { operationId } })
}

const OperationPage: NextPage<Props> = ({ operationId }) => {
  const session = useSession()

  return (
    <>
      {session.status === 'authenticated' ? (
        <Operation operationId={operationId} />
      ) : (
        <NextHead>
          <title>Expense</title>
        </NextHead>
      )}

      {session.status === 'unauthenticated' && <NextError statusCode={403} />}

      <Overlay isVisible={session.status === 'loading'} />
    </>
  )
}

export default OperationPage
