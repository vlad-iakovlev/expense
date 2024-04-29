import { Amount } from '@/components/common/Amount.jsx'
import { Card } from '@/components/common/Card/index.jsx'
import { useWalletBalance } from '@/contexts/RootStore/hooks/useWalletBalance.js'

interface BalanceProps {
  walletId: string
}

export const Balance = ({ walletId }: BalanceProps) => {
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
