import { Card } from '@/components/common/Card/index'
import { Category } from './Category'
import { Date } from './Date'
import { Delete } from './Delete'
import { ExpenseAmount } from './ExpenseAmount'
import { ExpenseWallet } from './ExpenseWallet'
import { IncomeAmount } from './IncomeAmount'
import { IncomeWallet } from './IncomeWallet'
import { Name } from './Name'
import { Type } from './Type'

interface OperationInfoCardProps {
  className?: string
  operationId: string
}

export const OperationInfoCard = ({
  className,
  operationId,
}: OperationInfoCardProps) => (
  <Card className={className} aria-label="Operation info">
    <Card.Title title="Info" actions={<Delete operationId={operationId} />} />
    <Card.Divider />
    <Date operationId={operationId} />
    <Category operationId={operationId} />
    <Name operationId={operationId} />
    <Type operationId={operationId} />
    <ExpenseWallet operationId={operationId} />
    <ExpenseAmount operationId={operationId} />
    <IncomeWallet operationId={operationId} />
    <IncomeAmount operationId={operationId} />
  </Card>
)
