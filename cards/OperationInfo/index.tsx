import { Card } from '@/components/common/Card/index.jsx'
import { Category } from './Category.jsx'
import { Date } from './Date.jsx'
import { Delete } from './Delete.jsx'
import { ExpenseAmount } from './ExpenseAmount.jsx'
import { ExpenseWallet } from './ExpenseWallet.jsx'
import { IncomeAmount } from './IncomeAmount.jsx'
import { IncomeWallet } from './IncomeWallet.jsx'
import { Name } from './Name.jsx'
import { Type } from './Type.jsx'

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
