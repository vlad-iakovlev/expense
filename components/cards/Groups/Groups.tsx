import { FC } from 'react'
import { useGroups } from '../../../stores/RootStore/hooks/useGroups.ts'
import { GroupsCreate } from './GroupsCreate.tsx'
import { GroupsItem } from './GroupsItem.tsx'

export const GroupsCards: FC = () => {
  const { groupIds } = useGroups()

  return (
    <>
      {groupIds.map((groupId) => (
        <GroupsItem key={groupId} groupId={groupId} />
      ))}

      <GroupsCreate />
    </>
  )
}
