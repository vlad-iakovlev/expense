import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { GroupInfoCard } from '@/components/cards/GroupInfo'
import { OperationsListCard } from '@/components/cards/OperationsList'
import { StatisticsCard } from '@/components/cards/Statistics'
import { WalletsListCard } from '@/components/cards/WalletsList'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import { useOptionalGroup } from '@/contexts/RootStore/hooks/useGroup'
import { Route as IndexRoute } from '@/routes/index'

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

  useEffect(() => {
    if (!group) void navigate({ to: IndexRoute.to })
  }, [group, navigate])

  if (!group) return null

  return (
    <CategoryFilterProvider>
      <Breadcrumbs
        parents={[
          {
            to: IndexRoute.to,
            title: 'Dashboard',
          },
        ]}
      />
      <Title title={group.name} />

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
