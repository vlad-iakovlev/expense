import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { OperationInfoCard } from '@/cards/OperationInfo'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Columns } from '@/components/Columns'
import { Title } from '@/components/Title'
import { useOptionalOperation } from '@/contexts/RootStore/hooks/useOperation'
import { Page } from '@/layout/Page'
import { Route as GroupRoute } from '@/routes/group.$groupId.index'
import { Route as DashboardRoute } from '@/routes/index'
import { Route as WalletRoute } from '@/routes/wallet.$walletId.index'

export const Route = createFileRoute('/operation/$operationId')({
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
  const { operationId } = Route.useParams()
  const { operation } = useOptionalOperation({ operationId })
  const navigate = useNavigate()

  useEffect(() => {
    if (!operation) void navigate({ to: DashboardRoute.to })
  }, [navigate, operation])

  if (!operation) return null

  const wallet = operation.expenseWallet ?? operation.incomeWallet

  return (
    <>
      <Breadcrumbs
        parents={
          wallet
            ? [
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
                  params: { walletId: wallet.id },
                  title: `${wallet.name} ${wallet.currency.symbol}`,
                },
              ]
            : undefined
        }
      />
      <Title title={operation.name} />

      <Columns>
        <OperationInfoCard operationId={operationId} />
      </Columns>
    </>
  )
}
