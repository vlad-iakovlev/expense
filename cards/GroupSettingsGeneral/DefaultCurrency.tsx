import { CurrencySelect } from '@/components/common/CurrencySelect.jsx'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'

interface DefaultCurrencyProps {
  groupId: string
}

export const DefaultCurrency = ({ groupId }: DefaultCurrencyProps) => {
  const { group, setGroupDefaultCurrency } = useGroup({ groupId })

  return (
    <CurrencySelect
      label="Default currency"
      value={group.defaultCurrency}
      onChange={setGroupDefaultCurrency}
    />
  )
}
