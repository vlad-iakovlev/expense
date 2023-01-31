import { GetServerSideProps, NextPage } from 'next'
import { CurrenciesProvider } from '../../../components/contexts/Currencies'
import { OperationsProvider } from '../../../components/contexts/Operations'
import { WalletProvider } from '../../../components/contexts/Wallet'
import { Wallet } from '../../../components/Wallet'

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
  <CurrenciesProvider>
    <OperationsProvider walletId={walletId}>
      <WalletProvider walletId={walletId}>
        <Wallet />
      </WalletProvider>
    </OperationsProvider>
  </CurrenciesProvider>
)

export default WalletPage
