import { useGroups } from '../../contexts/RootStore/hooks/useGroups.ts'
import { GroupCreateCard } from '../cards/GroupCreate/GroupCreate.tsx'
import { GroupOpenCard } from '../cards/GroupOpen/GroupOpen.tsx'
import { NextHead } from '../next/Head.ts'
import { Columns } from '../ui-kit/Columns/Columns.tsx'
import { Title } from '../ui-kit/Title/Title.tsx'

export const Dashboard: React.FC = () => {
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
