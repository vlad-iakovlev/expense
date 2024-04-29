import { GroupCreateCard } from '@/components/cards/GroupCreate/GroupCreate.jsx'
import { GroupOpenCard } from '@/components/cards/GroupOpen/GroupOpen.jsx'
import { NextHead } from '@/components/next/Head.js'
import { Columns } from '@/components/ui-kit/Columns/Columns.jsx'
import { Title } from '@/components/ui-kit/Title/Title.jsx'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups.js'

export const Dashboard = () => {
  const { groupIds } = useGroups()

  return (
    <>
      <NextHead>
        <title>Expense</title>
      </NextHead>

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
