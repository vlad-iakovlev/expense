import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper.tsx'
import { Wallet } from '../../components/pages/Wallet/Wallet.tsx'

const WalletPage: NextPage = () => {
  const router = useRouter()
  const walletId = router.query.walletId

  if (typeof walletId !== 'string') {
    return null
  }

  return (
    <PageWrapper>
      <Wallet walletId={walletId} />
    </PageWrapper>
  )
}

export default WalletPage
