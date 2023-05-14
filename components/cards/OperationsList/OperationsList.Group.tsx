import { FC } from 'react'
import { formatDate } from '../../../utils/formatDate.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Operation } from './OperationsList.Operation.tsx'

interface Props {
  date: Date
  operationIds: string[]
  walletId: string | undefined
}

export const Group: FC<Props> = ({ date, operationIds, walletId }) => {
  return (
    <div className="bg-white">
      <Card.Subtitle subtitle={formatDate(date)} />

      {operationIds.map((operationId) => (
        <Operation
          key={operationId}
          operationId={operationId}
          walletId={walletId}
        />
      ))}
    </div>
  )
}