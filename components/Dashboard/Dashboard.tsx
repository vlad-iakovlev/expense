import Head from 'next/head'
import { FC } from 'react'
import { GroupsCard } from '../cards/Groups'
import { OperationsCard } from '../cards/Operations'
import { WalletsCard } from '../cards/Wallets'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

export const Dashboard: FC = () => {
  return (
    <>
      <Head>
        <title>{'Expense > Dashboard'}</title>
      </Head>

      <Breadcrumbs>
        <Breadcrumbs.Title title="Dashboard" />
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        <GroupsCard />
        <WalletsCard />
        <OperationsCard />
      </div>
    </>
  )
}
