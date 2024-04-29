import { Card } from '@/components/common/Card/index.jsx'
import { formatDate, formatDateForAriaLabel } from '@/utils/formatDate.js'
import { Operation } from './Operation.jsx'

interface GroupProps {
  date: Date
  operationIds: string[]
  walletId: string | undefined
}

export const Group = ({ date, operationIds, walletId }: GroupProps) => (
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
