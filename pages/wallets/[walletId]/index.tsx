import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { Page } from '@/components/layout/Page/index.jsx'
import { Wallet } from '@/components/pages/Wallet.jsx'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter.jsx'

const WalletPage: NextPage = () => {
  const router = useRouter()

  if (typeof router.query.walletId !== 'string') {
    return null
  }

  return (
    <Page>
      <CategoryFilterProvider>
        <Wallet walletId={router.query.walletId} />
      </CategoryFilterProvider>
    </Page>
  )
}

export default WalletPage
