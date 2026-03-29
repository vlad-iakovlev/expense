'use client'

import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useEffect } from 'react'
import { WalletSettingsGeneralCard } from '@/cards/WalletSettingsGeneral/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { ROUTES } from '@/constants/routes'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import { useOptionalWallet } from '@/contexts/RootStore/hooks/useWallet'

type WalletSettingsPageProps = {
  params: Promise<{
    walletId: string
  }>
}

const WalletSettingsPage = ({ params }: WalletSettingsPageProps) => {
  const { walletId } = use(params)
  const router = useRouter()
  const { wallet } = useOptionalWallet({ walletId })

  useEffect(() => {
    if (!wallet) {
      router.push(ROUTES.DASHBOARD)
    }
  }, [router, wallet])

  if (!wallet) return null

  return (
    <>
      <Breadcrumbs
        parents={[
          {
            href: ROUTES.DASHBOARD,
            title: 'Dashboard',
          },
          {
            href: ROUTES.GROUP(wallet.group.id),
            title: wallet.group.name,
          },
          {
            href: ROUTES.WALLET(walletId),
            title: `${wallet.name} ${wallet.currency.symbol}`,
          },
        ]}
      />
      <Title title="Settings" />

      <Columns>
        <WalletSettingsGeneralCard walletId={walletId} />
      </Columns>
    </>
  )
}

export default function WrappedWalletSettingsPage(
  props: WalletSettingsPageProps,
) {
  return (
    <Page>
      <CategoryFilterProvider>
        <WalletSettingsPage {...props} />
      </CategoryFilterProvider>
    </Page>
  )
}
