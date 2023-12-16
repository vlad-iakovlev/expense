import { useGroup } from '../../../contexts/RootStore/hooks/useGroup.js'
import { Card } from '../../ui-kit/Card/Card.jsx'

interface Props {
  groupId: string
}

export const Name = ({ groupId }: Props) => {
  const { group, setGroupName } = useGroup({ groupId })

  return <Card.Input label="Name" value={group.name} onChange={setGroupName} />
}
