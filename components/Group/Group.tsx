import Head from 'next/head'
import { FC } from 'react'
import { ROUTES } from '../../constants/routes'
import { GroupInfoCard } from '../cards/GroupInfo'
import { GroupUsersCard } from '../cards/GroupUsers'
import { OperationsCard } from '../cards/Operations'
import { WalletsCard } from '../cards/Wallets'
import { useGroupContext } from '../contexts/Group'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

export const Group: FC = () => {
  const { group } = useGroupContext()

  return (
    <>
      <Head>
        <title>{`Expense > ${group.name}`}</title>
      </Head>

      <Breadcrumbs>
        <Breadcrumbs.Link href={ROUTES.DASHBOARD} title="Dashboard" />
        <Breadcrumbs.Title title={group.name} />
      </Breadcrumbs>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-6 [&>*]:mb-6">
        <GroupInfoCard />
        <GroupUsersCard />
        <WalletsCard />
        <OperationsCard />
      </div>
    </>
  )
}
