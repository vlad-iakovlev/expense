import { Amount } from '@/components/Amount'
import { Card } from '@/components/Card'
import { useGroupBalance } from '@/contexts/RootStore/hooks/useGroupBalance'

type BalanceProps = {
  groupId: string
}

export const Balance = ({ groupId }: BalanceProps) => {
  const { groupBalance } = useGroupBalance({ groupId })

  return (
    <Card.Item
      label="Balance"
      value={
        <Amount
          className="font-medium select-text"
          amount={groupBalance.balance}
          currency={groupBalance.currency}
          showSign="negative"
        />
      }
    />
  )
}
