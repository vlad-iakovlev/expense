import { useMemo } from 'react'
import { Card, CardSelectItem } from '@/components/common/Card/index.jsx'
import { getPopulatedWallet } from '@/contexts/RootStore/getters/wallets.js'
import { useGroupedWallets } from '@/contexts/RootStore/hooks/useGroupedWallets.js'
import { useRootStore } from '@/contexts/RootStore/index.jsx'
import { PopulatedClientWallet } from '@/types/client.js'
import { CurrencyBadge } from './CurrencyBadge.jsx'

export interface WalletSelectProps {
  label: string
  groupId?: string
  value: PopulatedClientWallet
  onChange: (walletId: string) => void
}

export const WalletSelect = ({
  label,
  groupId,
  value,
  onChange,
}: WalletSelectProps) => {
  const { state } = useRootStore()
  const { groupedWallets } = useGroupedWallets({ groupId })

  const walletsOptions = useMemo<CardSelectItem[]>(
    () =>
      groupedWallets.reduce<CardSelectItem[]>(
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
        [],
      ),
    [groupedWallets, state],
  )

  const valueForSelect = useMemo(
    () => ({
      id: value.id,
      label: `${value.name} ${value.currency.symbol}`,
    }),
    [value.currency.symbol, value.id, value.name],
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
