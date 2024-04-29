import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { Category } from './OperationInfo.Category.jsx'
import { Date } from './OperationInfo.Date.jsx'
import { Delete } from './OperationInfo.Delete.jsx'
import { ExpenseAmount } from './OperationInfo.ExpenseAmount.jsx'
import { ExpenseWallet } from './OperationInfo.ExpenseWallet.jsx'
import { IncomeAmount } from './OperationInfo.IncomeAmount.jsx'
import { IncomeWallet } from './OperationInfo.IncomeWallet.jsx'
import { Name } from './OperationInfo.Name.jsx'
import { Type } from './OperationInfo.Type.jsx'

interface Props {
  className?: string
  operationId: string
}

export const OperationInfoCard = ({ className, operationId }: Props) => (
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
