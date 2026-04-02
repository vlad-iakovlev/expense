import { createFileRoute } from '@tanstack/react-router'
import { GroupCreateCard } from '@/cards/GroupCreate'
import { GroupOpenCard } from '@/cards/GroupOpen'
import { Columns } from '@/components/Columns'
import { Title } from '@/components/Title'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups'
import { Page } from '@/layout/Page'

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
