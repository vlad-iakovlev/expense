import { FC } from 'react'
import { useWalletContext } from '../../contexts/Wallet'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'

export const WalletInfoBalanceInDefaultCurrency: FC = () => {
  const { wallet } = useWalletContext()

  if (wallet.currency.id === wallet.group.defaultCurrency.id) {
    return null
  }

  return (
    <Card.Text
      end={
        <Amount
          className="font-medium"
          amount={wallet.balance}
          currency={wallet.currency}
          displayCurrency={wallet.group.defaultCurrency}
        />
      }
    >
      Balance in {wallet.group.defaultCurrency.name}
    </Card.Text>
  )
}
