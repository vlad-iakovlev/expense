import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { FC } from 'react'
import { ClientGroup } from '../../api/types/groups'
import { ClientWallet } from '../../api/types/wallets'
import { GroupTitle } from './GroupTitle'
import { GroupUsers } from './GroupUsers'
import { GroupWallets } from './GroupWallets'

interface Props {
  group: ClientGroup
  wallets: ClientWallet[]
}

export const Group: FC<Props> = ({ group, wallets }) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <Link className="flex-none text-lg text-cyan-900" href="/dashboard">
          Dashboard
        </Link>
        <ChevronRightIcon className="w-4 h-4" />
        <GroupTitle className="flex-auto" group={group} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        <GroupUsers group={group} />
        <GroupWallets group={group} wallets={wallets} />
      </div>
    </>
  )
}
