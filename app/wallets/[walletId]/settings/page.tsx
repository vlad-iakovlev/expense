'use client'

import { Page } from '@/components/layout/Page/index.jsx'
import { WalletSettings } from '@/components/pages/WalletSettings.jsx'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter.jsx'

interface WalletSettingsPageProps {
  params: {
    walletId: string
  }
}

export default function WalletSettingsPage({
  params,
}: WalletSettingsPageProps) {
  return (
    <Page>
      <CategoryFilterProvider>
        <WalletSettings walletId={params.walletId} />
      </CategoryFilterProvider>
    </Page>
  )
}
