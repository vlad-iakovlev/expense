import { Amount } from '@/components/common/Amount.jsx'
import { Card } from '@/components/common/Card/index.jsx'
import { useGroupBalance } from '@/contexts/RootStore/hooks/useGroupBalance.js'

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
          className="select-text font-medium"
          amount={groupBalance.balance}
          currency={groupBalance.currency}
          showSign="negative"
        />
      }
    />
  )
}
