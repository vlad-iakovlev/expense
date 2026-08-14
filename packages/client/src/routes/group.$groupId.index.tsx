import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { GroupInfoCard } from '@/cards/GroupInfo'
import { OperationsListCard } from '@/cards/OperationsList'
import { StatisticsCard } from '@/cards/Statistics'
import { WalletsListCard } from '@/cards/WalletsList'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Columns } from '@/components/Columns'
import { Title } from '@/components/Title'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import { useGroup, useOptionalGroup } from '@/contexts/RootStore/hooks/useGroup'
import { Page } from '@/layout/Page'
import { Route as DashboardRoute } from '@/routes/index'

export const Route = createFileRoute('/group/$groupId/')({
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
  const { groupId } = Route.useParams()
  const { group } = useOptionalGroup({ groupId })
  const navigate = useNavigate()

  const { setGroupName } = useGroup({ groupId })

  useEffect(() => {
    if (!group) void navigate({ to: DashboardRoute.to })
  }, [group, navigate])

  if (!group) return null

  return (
    <CategoryFilterProvider>
      <Breadcrumbs
        parents={[
          {
            to: DashboardRoute.to,
            title: 'Dashboard',
          },
        ]}
      />
      <Title title={group.name} onChange={setGroupName} />

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] xl:grid-rows-none">
        <GroupInfoCard groupId={groupId} />
        <div className="grid grid-cols-1 items-start gap-[inherit] md:row-span-full lg:col-span-2 lg:grid-cols-2">
          <WalletsListCard groupId={groupId} />
          <OperationsListCard groupId={groupId} />
        </div>
        <StatisticsCard
          className="md:max-xl:col-start-1 md:max-xl:row-start-2 xl:row-span-full"
          groupId={groupId}
        />
      </Columns>
    </CategoryFilterProvider>
  )
}
