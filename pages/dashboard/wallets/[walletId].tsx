import { GetServerSideProps, NextPage } from 'next'
import { CheckSwrContexts } from '../../../components/CheckSwrContexts'
import { CategoriesProvider } from '../../../components/contexts/Categories'
import { CurrenciesProvider } from '../../../components/contexts/Currencies'
import { ErrorProvider } from '../../../components/contexts/Error'
import { LoadingProvider } from '../../../components/contexts/Loading'
import { OperationsProvider } from '../../../components/contexts/Operations'
import { WalletProvider } from '../../../components/contexts/Wallet'
import { Wallet, WalletSkeleton } from '../../../components/Wallet'

interface Props {
  walletId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      walletId: String(context.query.walletId),
    },
  }
}

const WalletPage: NextPage<Props> = ({ walletId }) => (
  <LoadingProvider>
    <ErrorProvider>
      <CurrenciesProvider>
        <CategoriesProvider walletId={walletId}>
          <OperationsProvider walletId={walletId}>
            <WalletProvider walletId={walletId}>
              <CheckSwrContexts
                renderLoading={() => <WalletSkeleton />}
                renderContent={() => <Wallet />}
              />
            </WalletProvider>
          </OperationsProvider>
        </CategoriesProvider>
      </CurrenciesProvider>
    </ErrorProvider>
  </LoadingProvider>
)

export default WalletPage
