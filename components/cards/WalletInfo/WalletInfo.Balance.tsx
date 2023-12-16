import { useWalletBalance } from '../../../contexts/RootStore/hooks/useWalletBalance.js'
import { Amount } from '../../ui-kit/Amount/Amount.jsx'
import { Card } from '../../ui-kit/Card/Card.jsx'

interface Props {
  walletId: string
}

export const Balance = ({ walletId }: Props) => {
  const { walletBalance } = useWalletBalance({ walletId })

  return (
    <Card.Item
      label="Balance"
      value={
        <Amount
          className="select-text font-medium"
          amount={walletBalance.balance}
          currency={walletBalance.currency}
          showSign="negative"
          hideCurrency
        />
      }
    />
  )
}
