import { FC } from 'react'
import { useWalletContext } from '../../contexts/Wallet'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'

export const WalletInfoBalanceInDefaultCurrency: FC = () => {
  const { walletResponse } = useWalletContext()

  if (
    !walletResponse ||
    walletResponse.wallet.currency.id ===
      walletResponse.wallet.group.defaultCurrency.id
  ) {
    return null
  }

  return (
    <Card.Text
      end={
        <Amount
          className="font-medium"
          amount={walletResponse.wallet.balance}
          currency={walletResponse.wallet.currency}
          displayCurrency={walletResponse.wallet.group.defaultCurrency}
        />
      }
    >
      Balance in {walletResponse.wallet.group.defaultCurrency.name}
    </Card.Text>
  )
}
