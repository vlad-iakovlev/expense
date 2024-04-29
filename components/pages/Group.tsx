import { useMemo } from 'react'
import { GroupInfoCard } from '@/components/cards/GroupInfo/index.jsx'
import { OperationsListCard } from '@/components/cards/OperationsList/index.jsx'
import { StatisticsCard } from '@/components/cards/Statistics/index.jsx'
import { WalletsListCard } from '@/components/cards/WalletsList/index.jsx'
import { Breadcrumbs } from '@/components/common/Breadcrumbs.jsx'
import { Columns } from '@/components/common/Columns.jsx'
import { Title } from '@/components/common/Title.jsx'
import { NextHead } from '@/components/next/Head.js'
import { ROUTES } from '@/constants/routes.js'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'

interface Props {
  groupId: string
}

export const Group = ({ groupId }: Props) => {
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
      <NextHead>
        <title>{`Expense > ${group.name}`}</title>
      </NextHead>

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
