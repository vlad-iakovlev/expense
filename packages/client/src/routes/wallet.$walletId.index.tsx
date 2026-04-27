import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { OperationsListCard } from '@/cards/OperationsList'
import { StatisticsCard } from '@/cards/Statistics'
import { WalletInfoCard } from '@/cards/WalletInfo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Columns } from '@/components/Columns'
import { Title } from '@/components/Title'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import {
  useOptionalWallet,
  useWallet,
} from '@/contexts/RootStore/hooks/useWallet'
import { Page } from '@/layout/Page'
import { Route as GroupRoute } from '@/routes/group.$groupId.index'
import { Route as DashboardRoute } from '@/routes/index'

export const Route = createFileRoute('/wallet/$walletId/')({
  component: () => (
    <Page>
      <Page.AuthGuard>
        <Page.StoreGuard>
          <RouteComponent />
        </Page.StoreGuard>
      </Page.AuthGuard>
    </Page>
  ),
})

const RouteComponent = () => {
  const { walletId } = Route.useParams()
  const { wallet } = useOptionalWallet({ walletId })
  const navigate = useNavigate()

  const { setWalletName } = useWallet({ walletId })

  useEffect(() => {
    if (!wallet) void navigate({ to: DashboardRoute.to })
  }, [navigate, wallet])

  if (!wallet) return null

  return (
    <CategoryFilterProvider>
      <Breadcrumbs
        parents={[
          {
            to: DashboardRoute.to,
            title: 'Dashboard',
          },
          {
            to: GroupRoute.to,
            params: { groupId: wallet.group.id },
            title: wallet.group.name,
          },
        ]}
      />
      <Title
        title={wallet.name}
        suffix={wallet.currency.symbol}
        onChange={setWalletName}
      />

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
    </CategoryFilterProvider>
  )
}
