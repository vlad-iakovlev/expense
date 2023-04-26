import { GetServerSideProps, NextPage } from 'next'
import assert from 'node:assert'
import { CheckSwrContexts } from '../../components/CheckSwrContexts/CheckSwrContexts.tsx'
import { Operation } from '../../components/Operation/Operation.tsx'
import {
  CategoriesContext,
  CategoriesProvider,
} from '../../components/contexts/Categories.tsx'
import { CurrenciesProvider } from '../../components/contexts/Currencies.tsx'
import { ErrorProvider } from '../../components/contexts/Error.tsx'
import { LoadingProvider } from '../../components/contexts/Loading.tsx'
import {
  OperationContext,
  OperationProvider,
} from '../../components/contexts/Operation.tsx'
import {
  WalletsContext,
  WalletsProvider,
} from '../../components/contexts/Wallets.tsx'

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
  <LoadingProvider>
    <ErrorProvider>
      <CurrenciesProvider>
        <OperationProvider operationId={operationId}>
          <OperationContext.Consumer>
            {(operationContext) => {
              const wallet =
                operationContext?.response?.operation.expenseWallet ??
                operationContext?.response?.operation.incomeWallet

              if (!wallet) {
                return (
                  <CategoriesContext.Provider
                    value={{
                      hasError: false,
                      payload: {},
                      mutate: async () => {},
                    }}
                  >
                    <WalletsContext.Provider
                      value={{
                        hasError: false,
                        payload: {},
                        mutate: async () => {},
                      }}
                    >
                      <CheckSwrContexts renderContent={() => <Operation />} />
                    </WalletsContext.Provider>
                  </CategoriesContext.Provider>
                )
              }

              return (
                <CategoriesProvider groupId={wallet.group.id}>
                  <WalletsProvider groupId={wallet.group.id}>
                    <CheckSwrContexts renderContent={() => <Operation />} />
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
