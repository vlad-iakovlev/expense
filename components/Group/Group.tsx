import Head from 'next/head'
import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes'
import { GroupInfoCard } from '../cards/GroupInfo'
import { GroupUsersCard } from '../cards/GroupUsers'
import { OperationsCard } from '../cards/Operations'
import { StatisticsCard } from '../cards/Statistics'
import { WalletsCard } from '../cards/Wallets'
import { useGroupContext } from '../contexts/Group'
import { Breadcrumbs, BreadcrumbSkeleton } from '../ui-kit/Breadcrumbs'
import { Columns } from '../ui-kit/Columns'

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
      <Head>
        <title>
          {groupResponse
            ? `Expense > ${groupResponse.group.name}`
            : 'Loading...'}
        </title>
      </Head>

      {groupResponse ? (
        <Breadcrumbs title={groupResponse.group.name} parents={parents} />
      ) : (
        <BreadcrumbSkeleton withParent />
      )}

      <Columns className="md:grid-rows-[auto_auto_auto_1fr] lg:grid-rows-[auto_auto_1fr] xl:grid-rows-[auto_1fr]">
        <GroupInfoCard className="row-start-1 col-start-1" />
        <GroupUsersCard className="row-start-2 col-start-1" />
        <WalletsCard className="row-start-3 col-start-1 xl:row-start-1 xl:row-span-2 xl:col-start-2" />
        <OperationsCard className="row-start-4 col-start-1 lg:row-start-1 lg:row-span-3 lg:col-start-2 xl:row-span-2 xl:col-start-3" />
        <StatisticsCard className="row-start-5 col-start-1 md:row-start-1 md:row-span-4 md:col-start-2 lg:row-span-3 lg:col-start-3 xl:row-span-2 xl:col-start-4" />
      </Columns>
    </>
  )
}
