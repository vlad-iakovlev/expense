import { Amount } from '@/components/ui-kit/Amount/Amount.jsx'
import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { useGroupBalance } from '@/contexts/RootStore/hooks/useGroupBalance.js'

interface Props {
  groupId: string
}

export const Balance = ({ groupId }: Props) => {
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
          hideCurrency
        />
      }
    />
  )
}
