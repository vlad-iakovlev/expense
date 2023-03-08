import Head from 'next/head'
import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes'
import { GroupInfoCard } from '../cards/GroupInfo'
import { GroupUsersCard } from '../cards/GroupUsers'
import { OperationsCard } from '../cards/Operations'
import { StatisticsByCategoryCard } from '../cards/StatisticsByCategory'
import { WalletsCard } from '../cards/Wallets'
import { useGroupContext } from '../contexts/Group'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'
import { Columns } from '../ui-kit/Columns'

export const Group: FC = () => {
  const { group } = useGroupContext()

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
        <title>{`Expense > ${group.name}`}</title>
      </Head>

      <Breadcrumbs title={group.name} parents={parents} />

      <Columns>
        <GroupInfoCard />
        <GroupUsersCard />
        <WalletsCard />
        <OperationsCard />
        <StatisticsByCategoryCard />
      </Columns>
    </>
  )
}
