import assert from 'assert'
import { GetServerSideProps, NextPage } from 'next'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper.tsx'
import { Wallet } from '../../components/pages/Wallet/Wallet.tsx'

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
  <PageWrapper>
    <Wallet walletId={walletId} />
  </PageWrapper>
)

export default WalletPage
