import { FC } from 'react'
import { useGroupBalance } from '../../../stores/RootStore/hooks/useGroupBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string
}

export const GroupInfoBalance: FC<Props> = ({ groupId }) => {
  const { groupBalance } = useGroupBalance({ groupId })

  return (
    <Card.Text
      end={
        <Amount
          className="font-medium"
          amount={groupBalance.balance}
          currency={groupBalance.currency}
        />
      }
    >
      Balance
    </Card.Text>
  )
}
