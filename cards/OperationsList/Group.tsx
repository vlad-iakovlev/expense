import { Card } from '@/components/common/Card/index'
import { formatDate, formatDateForAriaLabel } from '@/utils/formatDate'
import { Operation } from './Operation'

interface GroupProps {
  date: Date
  operationIds: string[]
  walletId: string | undefined
}

export const Group = ({ date, operationIds, walletId }: GroupProps) => (
  <div className="bg-secondary-background" role="listitem">
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
