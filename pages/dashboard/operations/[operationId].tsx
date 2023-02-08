import { GetServerSideProps, NextPage } from 'next'
import { CategoriesProvider } from '../../../components/contexts/Categories'
import {
  OperationContext,
  OperationProvider,
} from '../../../components/contexts/Operation'
import { WalletsProvider } from '../../../components/contexts/Wallets'
import { Operation } from '../../../components/Operation'
import { CheckSwrContexts } from '../../../components/CheckSwrContexts'
import { LoadingProvider } from '../../../components/contexts/Loading'
import { ErrorProvider } from '../../../components/contexts/Error'

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
  <LoadingProvider>
    <ErrorProvider>
      <CategoriesProvider>
        <OperationProvider operationId={operationId}>
          <OperationContext.Consumer>
            {(operationContext) => {
              const wallet =
                operationContext?.data?.operation.expenseWallet ||
                operationContext?.data?.operation.incomeWallet

              if (!wallet) return null

              return (
                <WalletsProvider groupId={wallet.group.id}>
                  <CheckSwrContexts renderContent={() => <Operation />} />
                </WalletsProvider>
              )
            }}
          </OperationContext.Consumer>
        </OperationProvider>
      </CategoriesProvider>
    </ErrorProvider>
  </LoadingProvider>
)

export default OperationPage
