'use client'

import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useEffect } from 'react'
import { OperationsListCard } from '@/cards/OperationsList/index'
import { StatisticsCard } from '@/cards/Statistics/index'
import { WalletInfoCard } from '@/cards/WalletInfo/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { ROUTES } from '@/constants/routes'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import { useOptionalWallet } from '@/contexts/RootStore/hooks/useWallet'

type WalletPageProps = {
  params: Promise<{
    walletId: string
  }>
}

const WalletPage = ({ params }: WalletPageProps) => {
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
        ]}
      />
      <Title title={`${wallet.name} ${wallet.currency.symbol}`} />

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] lg:grid-rows-none">
        <WalletInfoCard walletId={walletId} />
        <OperationsListCard
          className="md:max-lg:row-span-full"
          walletId={walletId}
        />
        <StatisticsCard
          className="md:max-lg:col-start-1 md:max-lg:row-start-2"
          walletId={walletId}
        />
      </Columns>
    </>
  )
}

export default function WrappedWalletPage(props: WalletPageProps) {
  return (
    <Page>
      <CategoryFilterProvider>
        <WalletPage {...props} />
      </CategoryFilterProvider>
    </Page>
  )
}
