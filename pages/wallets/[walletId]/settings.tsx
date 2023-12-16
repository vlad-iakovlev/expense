import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useState } from 'react'
import { Page } from '../../../components/layout/Page/Page.jsx'
import { WalletSettings } from '../../../components/pages/WalletSettings.jsx'
import { CategoryFilterProvider } from '../../../contexts/CategoryFilter/CategoryFilter.jsx'

const WalletSettingsPage: NextPage = () => {
  const router = useRouter()
  const [walletId] = useState(router.query.walletId)

  if (typeof walletId !== 'string') {
    return null
  }

  return (
    <Page>
      <CategoryFilterProvider>
        <WalletSettings walletId={walletId} />
      </CategoryFilterProvider>
    </Page>
  )
}

export default WalletSettingsPage
