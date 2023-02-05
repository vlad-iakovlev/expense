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

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-6 [&>*]:mb-6">
        <GroupsCard />
        <WalletsCard />
        <OperationsCard />
      </div>
    </>
  )
}
