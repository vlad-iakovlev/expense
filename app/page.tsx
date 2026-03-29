'use client'

import { GroupCreateCard } from '@/cards/GroupCreate/index'
import { GroupOpenCard } from '@/cards/GroupOpen/index'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups'

const HomePage = () => {
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

export default function WrappedHomePage() {
  return (
    <Page>
      <HomePage />
    </Page>
  )
}
