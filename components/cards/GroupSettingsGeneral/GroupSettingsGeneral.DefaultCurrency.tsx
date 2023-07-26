import { useGroup } from '../../../contexts/RootStore/hooks/useGroup.ts'
import { CurrencySelect } from '../../ui-kit/CurrencySelect/CurrencySelect.tsx'

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
