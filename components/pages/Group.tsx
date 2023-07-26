import { useMemo } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { useGroup } from '../../contexts/RootStore/hooks/useGroup.ts'
import { GroupInfoCard } from '../cards/GroupInfo/GroupInfo.tsx'
import { OperationsListCard } from '../cards/OperationsList/OperationsList.tsx'
import { StatisticsCard } from '../cards/Statistics/Statistics.tsx'
import { WalletsListCard } from '../cards/WalletsList/WalletsList.tsx'
import { NextHead } from '../next/Head.ts'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'
import { Title } from '../ui-kit/Title/Title.tsx'

interface Props {
  groupId: string
}

export const Group = ({ groupId }: Props) => {
  const { group } = useGroup({ groupId })

  const parents = useMemo(() => {
    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
    ]
  }, [])

  return (
    <>
      <NextHead>
        <title>{`Expense > ${group.name}`}</title>
      </NextHead>

      <Breadcrumbs parents={parents} />
      <Title title={group.name} />

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] xl:grid-rows-none">
        <GroupInfoCard groupId={groupId} />
        <div className="md:row-span-full lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 items-start gap-[inherit]">
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
