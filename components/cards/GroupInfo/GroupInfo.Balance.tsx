import { useGroupBalance } from '../../../contexts/RootStore/hooks/useGroupBalance.js'
import { Amount } from '../../ui-kit/Amount/Amount.jsx'
import { Card } from '../../ui-kit/Card/Card.jsx'

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
