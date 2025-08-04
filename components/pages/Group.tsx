import Head from 'next/head'
import { useMemo } from 'react'
import { GroupInfoCard } from '@/cards/GroupInfo/index'
import { OperationsListCard } from '@/cards/OperationsList/index'
import { StatisticsCard } from '@/cards/Statistics/index'
import { WalletsListCard } from '@/cards/WalletsList/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { ROUTES } from '@/constants/routes'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup'

type GroupProps = {
  groupId: string
}

export const Group = ({ groupId }: GroupProps) => {
  const { group } = useGroup({ groupId })

  const parents = useMemo(
    () => [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
    ],
    [],
  )

  return (
    <>
      <Head>
        <title>{`Expense > ${group.name}`}</title>
      </Head>

      <Breadcrumbs parents={parents} />
      <Title title={group.name} />

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] xl:grid-rows-none">
        <GroupInfoCard groupId={groupId} />
        <div className="grid grid-cols-1 items-start gap-[inherit] md:row-span-full lg:col-span-2 lg:grid-cols-2">
          <WalletsListCard groupId={groupId} />
          <OperationsListCard groupId={groupId} />
        </div>
        <StatisticsCard
          className="md:max-xl:col-start-1 md:max-xl:row-start-2 xl:row-span-full"
          groupId={groupId}
        />
      </Columns>
    </>
  )
}
