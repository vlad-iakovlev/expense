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
      <GroupTitle className="mb-6" group={group} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <GroupUsers group={group} />
      </div>
    </>
  )
}
