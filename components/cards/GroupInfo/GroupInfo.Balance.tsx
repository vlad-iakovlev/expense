import { FC } from 'react'
import { useGroupBalance } from '../../../stores/RootStore/hooks/useGroupBalance.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string
}

export const Balance: FC<Props> = ({ groupId }) => {
  const { groupBalance } = useGroupBalance({ groupId })

  return (
    <Card.Text
      label="Balance"
      value={
        <Amount
          className="font-medium select-text"
          amount={groupBalance.balance}
          showSign="negative"
        />
      }
    />
  )
}
