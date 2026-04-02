import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { OperationsListCard } from '@/components/cards/OperationsList'
import { StatisticsCard } from '@/components/cards/Statistics'
import { WalletInfoCard } from '@/components/cards/WalletInfo'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import { useOptionalWallet } from '@/contexts/RootStore/hooks/useWallet'
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
    </CategoryFilterProvider>
  )
}
