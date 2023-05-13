import { FC } from 'react'
import { useGroup } from '../../../stores/RootStore/hooks/useGroup.ts'
import { CurrencySelect } from '../../ui-kit/CurrencySelect/CurrencySelect.tsx'

interface Props {
  groupId: string
}

export const DefaultCurrency: FC<Props> = ({ groupId }) => {
  const { group, setGroupDefaultCurrency } = useGroup({ groupId })

  return (
    <CurrencySelect
      label="Default currency"
      value={group.defaultCurrency}
      onChange={setGroupDefaultCurrency}
    />
  )
}
