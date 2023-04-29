import assert from 'assert'
import { GetServerSideProps, NextPage } from 'next'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper.tsx'
import { Operation } from '../../components/pages/Operation/Operation.tsx'

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

const OperationPage: NextPage<Props> = ({ operationId }) => (
  <PageWrapper>
    <Operation operationId={operationId} />
  </PageWrapper>
)

export default OperationPage
