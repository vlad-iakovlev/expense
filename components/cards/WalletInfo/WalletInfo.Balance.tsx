import { Amount } from '@/components/ui-kit/Amount/Amount.jsx'
import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { useWalletBalance } from '@/contexts/RootStore/hooks/useWalletBalance.js'

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
