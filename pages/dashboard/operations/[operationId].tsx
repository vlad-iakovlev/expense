import { GetServerSideProps, NextPage } from 'next'
import { CategoriesProvider } from '../../../components/contexts/Categories'
import {
  OperationContext,
  OperationProvider,
} from '../../../components/contexts/Operation'
import { WalletsProvider } from '../../../components/contexts/Wallets'
import { Operation } from '../../../components/Operation'

interface Props {
  operationId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      operationId: String(context.query.operationId),
    },
  }
}

const OperationPage: NextPage<Props> = ({ operationId }) => (
  <CategoriesProvider>
    <OperationProvider operationId={operationId}>
      <OperationContext.Consumer>
        {(value) => (
          <WalletsProvider groupId={value?.operation.wallet.group.id}>
            <Operation />
          </WalletsProvider>
        )}
      </OperationContext.Consumer>
    </OperationProvider>
  </CategoriesProvider>
)

export default OperationPage
