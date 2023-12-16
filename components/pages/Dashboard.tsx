import { useGroups } from '../../contexts/RootStore/hooks/useGroups.js'
import { GroupCreateCard } from '../cards/GroupCreate/GroupCreate.jsx'
import { GroupOpenCard } from '../cards/GroupOpen/GroupOpen.jsx'
import { NextHead } from '../next/Head.js'
import { Columns } from '../ui-kit/Columns/Columns.jsx'
import { Title } from '../ui-kit/Title/Title.jsx'

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
