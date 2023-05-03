import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { useGroup } from '../../stores/RootStore/hooks/useGroup.ts'
import { GroupInfoCard } from '../cards/GroupInfo/GroupInfo.tsx'
import { GroupUsersCard } from '../cards/GroupUsers/GroupUsers.tsx'
import { OperationsListCard } from '../cards/OperationsList/OperationsList.tsx'
import { RenameCategoryCard } from '../cards/RenameCategory/RenameCategory.tsx'
import { StatisticsCard } from '../cards/Statistics/Statistics.tsx'
import { WalletsListCard } from '../cards/WalletsList/WalletsList.tsx'
import { NextHead } from '../next/Head.ts'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'
import { Title } from '../ui-kit/Title/Title.tsx'

interface Props {
  groupId: string
}

export const Group: FC<Props> = ({ groupId }) => {
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

      <Columns className="md:grid-flow-col md:grid-rows-[auto_auto_auto_auto_1fr] lg:grid-rows-[auto_auto_auto_1fr] xl:grid-rows-[auto_auto_1fr]">
        <GroupInfoCard groupId={groupId} />
        <GroupUsersCard groupId={groupId} />
        <RenameCategoryCard groupId={groupId} />
        <WalletsListCard className="xl:row-span-full" groupId={groupId} />
        <OperationsListCard className="lg:row-span-full" groupId={groupId} />
        <StatisticsCard className="md:row-span-full" groupId={groupId} />
      </Columns>
    </>
  )
}
