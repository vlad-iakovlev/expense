import Head from 'next/head'
import { FC, useCallback } from 'react'
import { updateGroup } from '../../api/client/groups'
import { ROUTES } from '../../constants/routes'
import { GroupUsersCard } from '../cards/GroupUsers'
import { OperationsCard } from '../cards/Operations'
import { WalletsCard } from '../cards/Wallets'
import { useGroupContext } from '../contexts/Group'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

export const Group: FC = () => {
  const { group, mutateGroup } = useGroupContext()

  const handleNameChange = useCallback(
    async (name: string) => {
      await updateGroup({
        groupId: group.id,
        name,
      })
      await mutateGroup()
    },
    [group.id, mutateGroup]
  )

  return (
    <>
      <Head>
        <title>{`Expense > ${group.name}`}</title>
      </Head>

      <Breadcrumbs>
        <Breadcrumbs.Link href={ROUTES.DASHBOARD} title="Dashboard" />
        <Breadcrumbs.EditableTitle
          title={group.name}
          onChange={handleNameChange}
        />
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        <GroupUsersCard />
        <WalletsCard />
        <OperationsCard />
      </div>
    </>
  )
}
