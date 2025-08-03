import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Page } from '@/components/layout/Page/index'
import { WalletSettings } from '@/components/pages/WalletSettings'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'

const WalletSettingsPage: NextPage = () => {
  const router = useRouter()

  if (typeof router.query.walletId !== 'string') {
    return null
  }

  return (
    <Page>
      <CategoryFilterProvider>
        <WalletSettings walletId={router.query.walletId} />
      </CategoryFilterProvider>
    </Page>
  )
}

export default WalletSettingsPage
