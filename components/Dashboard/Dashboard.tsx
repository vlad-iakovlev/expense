import { FC } from 'react'
import { ClientGroup } from '../../api/types/groups'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'
import { Groups } from '../cards/Groups'
import { Wallets } from '../cards/Wallets'
import { ClientWallet } from '../../api/types/wallets'

interface Props {
  groups: ClientGroup[]
  wallets: ClientWallet[]
}

export const Dashboard: FC<Props> = ({ groups, wallets }) => {
  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Title title="Dashboard" />
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        <Groups groups={groups} />
        {wallets.length ? <Wallets wallets={wallets} /> : null}
      </div>
    </>
  )
}
