import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { FC } from 'react'
import { ClientGroup } from '../../models/group'
import { GroupTitle } from './GroupTitle'
import { GroupUsers } from './GroupUsers'

interface Props {
  group: ClientGroup
}

export const Group: FC<Props> = ({ group }) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <Link
          className="flex-none text-lg text-cyan-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <ChevronRightIcon className="w-4 h-4" />
        <GroupTitle group={group} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <GroupUsers group={group} />
      </div>
    </>
  )
}
