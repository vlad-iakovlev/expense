import { CurrencySelect } from '@/components/common/CurrencySelect'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup'

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
