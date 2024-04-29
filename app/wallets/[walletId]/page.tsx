'use client'

import { Page } from '@/components/layout/Page/index.jsx'
import { Wallet } from '@/components/pages/Wallet.jsx'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter.jsx'

interface WalletPageProps {
  params: {
    walletId: string
  }
}

export default function WalletPage({ params }: WalletPageProps) {
  return (
    <Page>
      <CategoryFilterProvider>
        <Wallet walletId={params.walletId} />
      </CategoryFilterProvider>
    </Page>
  )
}
