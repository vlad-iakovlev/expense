import { Amount } from '@/components/common/Amount'
import { Card } from '@/components/common/Card/index'
import { useGroupBalance } from '@/contexts/RootStore/hooks/useGroupBalance'

interface BalanceProps {
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
