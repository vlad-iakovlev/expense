import { useMemo } from 'react'
import { useRootStore } from '../../../contexts/RootStore/RootStore.tsx'
import { getPopulatedWallet } from '../../../contexts/RootStore/getters/wallets.ts'
import { useGroupedWallets } from '../../../contexts/RootStore/hooks/useGroupedWallets.ts'
import { PopulatedClientWallet } from '../../../types/client.ts'
import { Card, CardSelectItem } from '../../ui-kit/Card/Card.tsx'
import { CurrencyBadge } from '../CurrencyBadge/CurrencyBadge.tsx'

export interface WalletSelectProps {
  label: string
  groupId?: string
  value: PopulatedClientWallet
  onChange: (walletId: string) => void
}

export const WalletSelect: React.FC<WalletSelectProps> = ({
  label,
  groupId,
  value,
  onChange,
}) => {
  const { state } = useRootStore()
  const { groupedWallets } = useGroupedWallets({ groupId })

  const walletsOptions = useMemo<CardSelectItem[]>(() => {
    return groupedWallets.reduce<CardSelectItem[]>(
      (acc, { currency, walletIds }, index) => {
        if (index > 0) acc.push({ type: 'divider', id: currency.id })

        walletIds.forEach((walletId) => {
          const wallet = getPopulatedWallet(state, walletId)

          acc.push({
            id: wallet.id,
            label: wallet.name,
            suffix: <CurrencyBadge currency={wallet.currency} />,
          })
        })

        return acc
      },
      []
    )
  }, [groupedWallets, state])

  const valueForSelect = useMemo(
    () => ({
      id: value.id,
      label: `${value.name} ${value.currency.symbol}`,
    }),
    [value.currency.symbol, value.id, value.name]
  )

  return (
    <Card.Select
      label={label}
      options={walletsOptions}
      value={valueForSelect}
      onChange={onChange}
    />
  )
}
