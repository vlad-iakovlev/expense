import {
  formatDate,
  formatDateForAriaLabel,
} from '../../../utils/formatDate.js'
import { Card } from '../../ui-kit/Card/Card.jsx'
import { Operation } from './OperationsList.Operation.jsx'

interface Props {
  date: Date
  operationIds: string[]
  walletId: string | undefined
}

export const Group = ({ date, operationIds, walletId }: Props) => (
  <div className="bg-secondary" role="listitem">
    <div role="list" aria-label={formatDateForAriaLabel(date)}>
      <Card.Subtitle subtitle={formatDate(date)} />

      {operationIds.map((operationId) => (
        <Operation
          key={operationId}
          operationId={operationId}
          walletId={walletId}
        />
      ))}
    </div>
  </div>
)
