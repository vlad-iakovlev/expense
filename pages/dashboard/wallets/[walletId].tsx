import { GetServerSideProps, NextPage } from 'next'
import { CurrenciesProvider } from '../../../components/contexts/Currencies'
import { OperationsProvider } from '../../../components/contexts/Operations'
import { WalletProvider } from '../../../components/contexts/Wallet'
import { Wallet } from '../../../components/Wallet'
import { CheckSwrContexts } from '../../../components/CheckSwrContexts'
import { LoadingProvider } from '../../../components/contexts/Loading'
import { ErrorProvider } from '../../../components/contexts/Error'

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
        <OperationsProvider walletId={walletId}>
          <WalletProvider walletId={walletId}>
            <CheckSwrContexts renderContent={() => <Wallet />} />
          </WalletProvider>
        </OperationsProvider>
      </CurrenciesProvider>
    </ErrorProvider>
  </LoadingProvider>
)

export default WalletPage
