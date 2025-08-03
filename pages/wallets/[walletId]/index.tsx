import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Page } from '@/components/layout/Page/index'
import { Wallet } from '@/components/pages/Wallet'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'

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
