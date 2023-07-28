import { useWalletBalance } from '../../../contexts/RootStore/hooks/useWalletBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

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
          className="font-medium select-text"
          amount={walletBalance.balance}
          currency={walletBalance.currency}
          showSign="negative"
          hideCurrency
        />
      }
    />
  )
}
