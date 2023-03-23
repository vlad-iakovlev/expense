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

      <Columns className="md:grid-rows-[auto_auto_1fr] lg:grid-rows-[auto_1fr] xl:grid-rows-none">
        <GroupsCard className="row-start-1 col-start-1" />
        <WalletsCard className="row-start-2 col-start-1 xl:row-span-full xl:col-start-2" />
        <OperationsCard className="row-start-3 col-start-1 lg:row-span-full lg:col-start-2 xl:col-start-3" />
        <StatisticsCard className="row-start-4 col-start-1 md:row-span-full md:col-start-2 lg:col-start-3 xl:col-start-4" />
      </Columns>
    </>
  )
}
