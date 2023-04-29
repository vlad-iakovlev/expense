import { FC } from 'react'
import { useGroups } from '../../../stores/RootStore/hooks/useGroups.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { GroupsCreate } from './GroupsCreate.tsx'
import { GroupsItem } from './GroupsItem.tsx'

interface Props {
  className?: string
}

export const GroupsCard: FC<Props> = ({ className }) => {
  const { groupIds } = useGroups()

  return (
    <Card className={className}>
      <Card.Title title="Groups" action={<GroupsCreate />} />

      {!!groupIds.length && (
        <>
          <Card.Divider />
          {groupIds.map((groupId) => (
            <GroupsItem key={groupId} groupId={groupId} />
          ))}
        </>
      )}
    </Card>
  )
}
