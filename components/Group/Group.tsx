import { FC, useCallback } from 'react'
import { useSWRConfig } from 'swr'
import { updateGroup } from '../../api/client/groups'
import { ClientGroup } from '../../api/types/groups'
import { ClientWallet } from '../../api/types/wallets'
import { ROUTES } from '../../constants/routes'
import { SWR_KEYS } from '../../constants/swr'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'
import { GroupUsers } from '../cards/GroupUsers'
import { Wallets } from '../cards/Wallets'

interface Props {
  group: ClientGroup
  wallets: ClientWallet[]
}

export const Group: FC<Props> = ({ group, wallets }) => {
  const { mutate } = useSWRConfig()

  const handleNameChange = useCallback(
    async (name: string) => {
      await updateGroup({
        groupId: group.id,
        name,
      })
      await mutate(SWR_KEYS.GROUP(group.id))
    },
    [group.id, mutate]
  )

  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Link href={ROUTES.DASHBOARD} title="Dashboard" />
        <Breadcrumbs.EditableTitle
          title={group.name}
          onChange={handleNameChange}
        />
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        <GroupUsers group={group} />
        <Wallets groupId={group.id} wallets={wallets} />
      </div>
    </>
  )
}
