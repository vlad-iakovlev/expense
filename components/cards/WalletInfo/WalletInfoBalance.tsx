import { FC } from 'react'
import { useWalletContext } from '../../contexts/Wallet.tsx'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

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
