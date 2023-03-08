import Head from 'next/head'
import { FC } from 'react'
import { GroupsCard } from '../cards/Groups'
import { OperationsCard } from '../cards/Operations'
import { StatisticsCard } from '../cards/Statistics'
import { WalletsCard } from '../cards/Wallets'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'
import { Columns } from '../ui-kit/Columns'

export const Dashboard: FC = () => {
  return (
    <>
      <Head>
        <title>{'Expense > Dashboard'}</title>
      </Head>

      <Breadcrumbs title="Dashboard" />

      <Columns>
        <GroupsCard />
        <WalletsCard />
        <OperationsCard />
        <StatisticsCard />
      </Columns>
    </>
  )
}
