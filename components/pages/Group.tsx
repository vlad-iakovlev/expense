import { useMemo } from 'react'
import { ROUTES } from '../../constants/routes.js'
import { useGroup } from '../../contexts/RootStore/hooks/useGroup.js'
import { GroupInfoCard } from '../cards/GroupInfo/GroupInfo.jsx'
import { OperationsListCard } from '../cards/OperationsList/OperationsList.jsx'
import { StatisticsCard } from '../cards/Statistics/Statistics.jsx'
import { WalletsListCard } from '../cards/WalletsList/WalletsList.jsx'
import { NextHead } from '../next/Head.js'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.jsx'
import { Columns } from '../ui-kit/Columns/Columns.jsx'
import { Title } from '../ui-kit/Title/Title.jsx'

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
