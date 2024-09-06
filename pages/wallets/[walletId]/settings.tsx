import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { Page } from '@/components/layout/Page/index.jsx'
import { WalletSettings } from '@/components/pages/WalletSettings.jsx'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter.jsx'

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
