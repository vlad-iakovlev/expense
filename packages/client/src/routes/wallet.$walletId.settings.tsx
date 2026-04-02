import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { WalletSettingsGeneralCard } from '@/cards/WalletSettingsGeneral'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Columns } from '@/components/Columns'
import { Title } from '@/components/Title'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import { useOptionalWallet } from '@/contexts/RootStore/hooks/useWallet'
import { Page } from '@/layout/Page'
import { Route as GroupRoute } from '@/routes/group.$groupId.index'
import { Route as DashboardRoute } from '@/routes/index'
import { Route as WalletRoute } from '@/routes/wallet.$walletId.index'

export const Route = createFileRoute('/wallet/$walletId/settings')({
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
          {
            to: WalletRoute.to,
            params: { walletId },
            title: `${wallet.name} ${wallet.currency.symbol}`,
          },
        ]}
      />
      <Title title="Settings" />

      <Columns>
        <WalletSettingsGeneralCard walletId={walletId} />
      </Columns>
    </CategoryFilterProvider>
  )
}
