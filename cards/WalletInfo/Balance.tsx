import { Amount } from '@/components/common/Amount'
import { Card } from '@/components/common/Card/index'
import { useWalletBalance } from '@/contexts/RootStore/hooks/useWalletBalance'

type BalanceProps = {
  walletId: string
}

export const Balance = ({ walletId }: BalanceProps) => {
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
