import { GetServerSideProps, NextPage } from 'next'
import assert from 'node:assert'
import { CheckSwrContexts } from '../../components/CheckSwrContexts/CheckSwrContexts.tsx'
import { Wallet } from '../../components/Wallet/Wallet.tsx'
import { CategoriesProvider } from '../../components/contexts/Categories.tsx'
import { CurrenciesProvider } from '../../components/contexts/Currencies.tsx'
import { ErrorProvider } from '../../components/contexts/Error.tsx'
import { LoadingProvider } from '../../components/contexts/Loading.tsx'
import { OperationsProvider } from '../../components/contexts/Operations.tsx'
import { StatisticsByCategoryProvider } from '../../components/contexts/StatisticsByCategory.tsx'
import { WalletProvider } from '../../components/contexts/Wallet.tsx'

interface Props {
  walletId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const walletId = context.query.walletId
  assert(typeof walletId === 'string', 'walletId is not a string')
  return Promise.resolve({ props: { walletId } })
}

const WalletPage: NextPage<Props> = ({ walletId }) => (
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

export default WalletPage
