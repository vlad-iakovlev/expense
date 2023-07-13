import { useGroup } from '../../../contexts/RootStore/hooks/useGroup.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string
}

export const Name = ({ groupId }: Props) => {
  const { group, setGroupName } = useGroup({ groupId })

  return <Card.Input label="Name" value={group.name} onChange={setGroupName} />
}
