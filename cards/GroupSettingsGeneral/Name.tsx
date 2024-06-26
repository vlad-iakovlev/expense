import { Card } from '@/components/common/Card/index.jsx'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'

interface NameProps {
  groupId: string
}

export const Name = ({ groupId }: NameProps) => {
  const { group, setGroupName } = useGroup({ groupId })

  return <Card.Input label="Name" value={group.name} onChange={setGroupName} />
}
