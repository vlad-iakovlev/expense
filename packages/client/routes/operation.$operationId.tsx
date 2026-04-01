import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { OperationInfoCard } from '@/components/cards/OperationInfo'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { useOptionalOperation } from '@/contexts/RootStore/hooks/useOperation'

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
    if (!operation) void navigate({ to: '/' })
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
                  to: '/',
                  title: 'Dashboard',
                },
                {
                  to: '/group/$groupId',
                  params: { groupId: wallet.group.id },
                  title: wallet.group.name,
                },
                {
                  to: '/wallet/$walletId',
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
