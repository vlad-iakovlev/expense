import assert from 'assert'
import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useMemo } from 'react'
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

const OperationPage: NextPage = () => {
  const router = useRouter()

  const operationId = useMemo<string>(() => {
    assert(
      typeof router.query.operationId === 'string',
      'operationId is not a string'
    )
    return router.query.operationId
  }, [router.query.operationId])

  return (
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
}

export default OperationPage
