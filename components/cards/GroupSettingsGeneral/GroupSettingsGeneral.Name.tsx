import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'

interface Props {
  groupId: string
}

export const Name = ({ groupId }: Props) => {
  const { group, setGroupName } = useGroup({ groupId })

  return <Card.Input label="Name" value={group.name} onChange={setGroupName} />
}
