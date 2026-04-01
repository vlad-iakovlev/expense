import { createFileRoute } from '@tanstack/react-router'
import { GroupCreateCard } from '@/components/cards/GroupCreate'
import { GroupOpenCard } from '@/components/cards/GroupOpen'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups'

export const Route = createFileRoute('/')({
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
  const { groupIds } = useGroups()

  return (
    <>
      <Title title="Dashboard" />

      <Columns>
        {groupIds.map((groupId) => (
          <GroupOpenCard key={groupId} groupId={groupId} />
        ))}
        <GroupCreateCard />
      </Columns>
    </>
  )
}
