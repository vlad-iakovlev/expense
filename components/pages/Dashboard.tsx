import { GroupCreateCard } from '@/components/cards/GroupCreate/index.jsx'
import { GroupOpenCard } from '@/components/cards/GroupOpen/index.jsx'
import { Columns } from '@/components/common/Columns.jsx'
import { Title } from '@/components/common/Title.jsx'
import { NextHead } from '@/components/next/Head.js'
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
