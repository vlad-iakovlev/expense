import { FC } from 'react'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { useWalletBalance } from '../../../stores/RootStore/hooks/useWalletBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  walletId: string
}

export const WalletInfoBalanceInDefaultCurrency: FC<Props> = ({ walletId }) => {
  const { wallet } = useWallet({ walletId })
  const { walletBalance } = useWalletBalance({ walletId })

  if (wallet.currency.id === wallet.group.defaultCurrency.id) {
    return null
  }

  return (
    <Card.Text
      end={
        <Amount
          className="font-medium"
          amount={walletBalance.balance}
          currency={walletBalance.currency}
          displayCurrency={wallet.group.defaultCurrency}
        />
      }
    >
      Balance in {wallet.group.defaultCurrency.name}
    </Card.Text>
  )
}
