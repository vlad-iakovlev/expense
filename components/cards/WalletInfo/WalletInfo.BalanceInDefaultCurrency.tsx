import { FC } from 'react'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { useWalletBalance } from '../../../stores/RootStore/hooks/useWalletBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  walletId: string
}

export const BalanceInDefaultCurrency: FC<Props> = ({ walletId }) => {
  const { wallet } = useWallet({ walletId })
  const { walletBalance } = useWalletBalance({ walletId })

  if (wallet.currency.id === wallet.group.defaultCurrency.id) {
    return null
  }

  return (
    <Card.Text
      label={`Balance in ${wallet.group.defaultCurrency.symbol}`}
      value={
        <Amount
          className="font-medium select-text"
          amount={
            walletBalance.balance *
            (wallet.group.defaultCurrency.rate / walletBalance.currency.rate)
          }
        />
      }
    />
  )
}
