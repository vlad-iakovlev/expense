import { FC } from 'react'
import { ClientGroup } from '../../models/group'
import { GroupTitle } from './GroupTitle'

interface Props {
  group: ClientGroup
}

export const Group: FC<Props> = ({ group }) => {
  return (
    <>
      <GroupTitle group={group} />
    </>
  )
}
