import { CurrencySelect } from '@/components/ui-kit/CurrencySelect/CurrencySelect.jsx'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'

interface Props {
  groupId: string
}

export const DefaultCurrency = ({ groupId }: Props) => {
  const { group, setGroupDefaultCurrency } = useGroup({ groupId })

  return (
    <CurrencySelect
      label="Default currency"
      value={group.defaultCurrency}
      onChange={setGroupDefaultCurrency}
    />
  )
}
