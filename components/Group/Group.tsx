import Head from 'next/head'
import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes'
import { GroupInfoCard } from '../cards/GroupInfo'
import { GroupUsersCard } from '../cards/GroupUsers'
import { OperationsCard } from '../cards/Operations'
import { WalletsCard } from '../cards/Wallets'
import { useGroupContext } from '../contexts/Group'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

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

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-6 [&>*]:mb-6">
        <GroupInfoCard />
        <GroupUsersCard />
        <WalletsCard />
        <OperationsCard />
      </div>
    </>
  )
}
