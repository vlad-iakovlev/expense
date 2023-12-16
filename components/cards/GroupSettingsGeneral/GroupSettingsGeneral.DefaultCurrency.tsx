import { useGroup } from '../../../contexts/RootStore/hooks/useGroup.js'
import { CurrencySelect } from '../../ui-kit/CurrencySelect/CurrencySelect.jsx'

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
