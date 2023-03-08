import { GetServerSideProps, NextPage } from 'next'
import { CheckSwrContexts } from '../../../components/CheckSwrContexts'
import { CategoriesProvider } from '../../../components/contexts/Categories'
import { CurrenciesProvider } from '../../../components/contexts/Currencies'
import { ErrorProvider } from '../../../components/contexts/Error'
import { LoadingProvider } from '../../../components/contexts/Loading'
import {
  OperationContext,
  OperationProvider,
} from '../../../components/contexts/Operation'
import { WalletsProvider } from '../../../components/contexts/Wallets'
import { Operation, OperationSkeleton } from '../../../components/Operation'

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
      <CurrenciesProvider>
        <OperationProvider operationId={operationId}>
          <OperationContext.Consumer>
            {(operationContext) => {
              const wallet =
                operationContext?.data?.operation.expenseWallet ||
                operationContext?.data?.operation.incomeWallet

              if (!wallet) {
                return <OperationSkeleton />
              }

              return (
                <CategoriesProvider groupId={wallet.group.id}>
                  <WalletsProvider groupId={wallet.group.id}>
                    <CheckSwrContexts
                      renderLoading={() => <OperationSkeleton />}
                      renderContent={() => <Operation />}
                    />
                  </WalletsProvider>
                </CategoriesProvider>
              )
            }}
          </OperationContext.Consumer>
        </OperationProvider>
      </CurrenciesProvider>
    </ErrorProvider>
  </LoadingProvider>
)

export default OperationPage
