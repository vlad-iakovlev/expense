import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { GroupInfoCard } from '../cards/GroupInfo/GroupInfo.tsx'
import { GroupUsersCard } from '../cards/GroupUsers/GroupUsers.tsx'
import { OperationsCard } from '../cards/Operations/Operations.tsx'
import { RenameCategoryCard } from '../cards/RenameCategory/RenameCategory.tsx'
import { StatisticsCard } from '../cards/Statistics/Statistics.tsx'
import { WalletsCard } from '../cards/Wallets/Wallets.tsx'
import { useGroupContext } from '../contexts/Group.tsx'
import { NextHead } from '../next/Head.ts'
import { BreadcrumbSkeleton } from '../ui-kit/Breadcrumbs/BreadcrumbSkeleton.tsx'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'

export const Group: FC = () => {
  const { groupResponse } = useGroupContext()

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
        <title>
          {groupResponse
            ? `Expense > ${groupResponse.group.name}`
            : 'Loading...'}
        </title>
      </NextHead>

      {groupResponse ? (
        <Breadcrumbs title={groupResponse.group.name} parents={parents} />
      ) : (
        <BreadcrumbSkeleton withParent />
      )}

      <Columns className="md:grid-flow-col md:grid-rows-[auto_auto_auto_auto_1fr] lg:grid-rows-[auto_auto_auto_1fr] xl:grid-rows-[auto_auto_1fr]">
        <GroupInfoCard />
        <GroupUsersCard />
        <RenameCategoryCard />
        <WalletsCard className="xl:row-span-full" />
        <OperationsCard className="lg:row-span-full" />
        <StatisticsCard className="md:row-span-full" />
      </Columns>
    </>
  )
}
