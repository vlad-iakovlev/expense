import assert from 'assert'
import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useMemo } from 'react'
import { CheckSwrContexts } from '../../components/CheckSwrContexts/CheckSwrContexts.tsx'
import { Wallet } from '../../components/Wallet/Wallet.tsx'
import { CategoriesProvider } from '../../components/contexts/Categories.tsx'
import { CurrenciesProvider } from '../../components/contexts/Currencies.tsx'
import { ErrorProvider } from '../../components/contexts/Error.tsx'
import { LoadingProvider } from '../../components/contexts/Loading.tsx'
import { OperationsProvider } from '../../components/contexts/Operations.tsx'
import { StatisticsByCategoryProvider } from '../../components/contexts/StatisticsByCategory.tsx'
import { WalletProvider } from '../../components/contexts/Wallet.tsx'

const WalletPage: NextPage = () => {
  const router = useRouter()

  const walletId = useMemo<string>(() => {
    assert(
      typeof router.query.walletId === 'string',
      'walletId is not a string'
    )
    return router.query.walletId
  }, [router.query.walletId])

  return (
    <LoadingProvider>
      <ErrorProvider>
        <CurrenciesProvider>
          <CategoriesProvider walletId={walletId}>
            <OperationsProvider walletId={walletId}>
              <WalletProvider walletId={walletId}>
                <StatisticsByCategoryProvider walletId={walletId}>
                  <CheckSwrContexts renderContent={() => <Wallet />} />
                </StatisticsByCategoryProvider>
              </WalletProvider>
            </OperationsProvider>
          </CategoriesProvider>
        </CurrenciesProvider>
      </ErrorProvider>
    </LoadingProvider>
  )
}

export default WalletPage
