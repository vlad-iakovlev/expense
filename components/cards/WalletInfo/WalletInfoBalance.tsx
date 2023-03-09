import { FC } from 'react'
import { useWalletContext } from '../../contexts/Wallet'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'

export const WalletInfoBalance: FC = () => {
  const { walletResponse } = useWalletContext()

  if (!walletResponse) {
    return <Card.Skeleton />
  }

  return (
    <Card.Text
      end={
        <Amount
          className="font-medium"
          amount={walletResponse.wallet.balance}
          currency={walletResponse.wallet.currency}
        />
      }
    >
      Balance
    </Card.Text>
  )
}
