import { GroupCreateCard } from '@/cards/GroupCreate/index.jsx'
import { GroupOpenCard } from '@/cards/GroupOpen/index.jsx'
import { Columns } from '@/components/common/Columns.jsx'
import { Title } from '@/components/common/Title.jsx'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups.js'
import { useTitle } from '@/hooks/useTitle.js'

export const Dashboard = () => {
  const { groupIds } = useGroups()

  useTitle('Expense')

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
