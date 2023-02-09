import { FC } from 'react'
import { useWalletContext } from '../../contexts/Wallet'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'

export const WalletInfoBalance: FC = () => {
  const { wallet } = useWalletContext()

  return (
    <Card.Text
      end={
        <Amount
          className="font-medium"
          amount={wallet.balance}
          currency={wallet.currency}
        />
      }
    >
      Balance
    </Card.Text>
  )
}
