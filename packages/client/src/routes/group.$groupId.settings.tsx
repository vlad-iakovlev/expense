'use client'

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { GroupMembersCard } from '@/components/cards/GroupMembers'
import { GroupSettingsGeneralCard } from '@/components/cards/GroupSettingsGeneral'
import { RenameCategoryCard } from '@/components/cards/RenameCategory'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import { useOptionalGroup } from '@/contexts/RootStore/hooks/useGroup'
import { Route as GroupRoute } from '@/routes/group.$groupId.index'
import { Route as DashboardRoute } from '@/routes/index'

export const Route = createFileRoute('/group/$groupId/settings')({
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
          {
            to: GroupRoute.to,
            params: { groupId },
            title: group.name,
          },
        ]}
      />
      <Title title="Settings" />

      <Columns>
        <GroupSettingsGeneralCard groupId={groupId} />
        <GroupMembersCard groupId={groupId} />
        <RenameCategoryCard groupId={groupId} />
      </Columns>
    </CategoryFilterProvider>
  )
}
