import Head from 'next/head'
import { GroupCreateCard } from '@/cards/GroupCreate/index'
import { GroupOpenCard } from '@/cards/GroupOpen/index'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { useGroups } from '@/contexts/RootStore/hooks/useGroups'

export const Dashboard = () => {
  const { groupIds } = useGroups()

  return (
    <>
      <Head>
        <title>Expense</title>
      </Head>

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
