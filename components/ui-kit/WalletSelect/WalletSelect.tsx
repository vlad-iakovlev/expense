import { FC, useCallback, useMemo } from 'react'
import { useRootStore } from '../../../stores/RootStore/RootStore.tsx'
import { getPopulatedWallet } from '../../../stores/RootStore/getters/wallets.ts'
import { useWallets } from '../../../stores/RootStore/hooks/useWallets.ts'
import { PopulatedClientWallet } from '../../../types/client.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'
import { CurrencyBadge } from '../CurrencyBadge/CurrencyBadge.tsx'

export interface WalletSelectProps {
  label: string
  groupId?: string
  value: PopulatedClientWallet
  onChange: (walletId: string) => void
}

export const WalletSelect: FC<WalletSelectProps> = ({
  label,
  groupId,
  value,
  onChange,
}) => {
  const { state } = useRootStore()
  const { walletIds } = useWallets({ groupId })

  const walletsOptions = useMemo(() => {
    return walletIds.map((walletId) => {
      const wallet = getPopulatedWallet(state, walletId)

      return {
        id: wallet.id,
        label: wallet.name,
        suffix: <CurrencyBadge currency={wallet.currency} />,
      }
    })
  }, [state, walletIds])

  const valueForSelect = useMemo(
    () => ({
      id: value.id,
      label: `${value.name} ${value.currency.symbol}`,
    }),
    [value.currency.symbol, value.id, value.name]
  )

  const handleChange = useCallback(
    (option: CardSelectOption) => onChange(option.id),
    [onChange]
  )

  return (
    <Card.Select
      label={label}
      options={walletsOptions}
      value={valueForSelect}
      onChange={handleChange}
    />
  )
}
