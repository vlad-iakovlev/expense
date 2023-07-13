import { Card } from '../../ui-kit/Card/Card.tsx'
import { Category } from './OperationInfo.Category.tsx'
import { Date } from './OperationInfo.Date.tsx'
import { Delete } from './OperationInfo.Delete.tsx'
import { ExpenseAmount } from './OperationInfo.ExpenseAmount.tsx'
import { ExpenseWallet } from './OperationInfo.ExpenseWallet.tsx'
import { IncomeAmount } from './OperationInfo.IncomeAmount.tsx'
import { IncomeWallet } from './OperationInfo.IncomeWallet.tsx'
import { Name } from './OperationInfo.Name.tsx'
import { Type } from './OperationInfo.Type.tsx'

interface Props {
  className?: string
  operationId: string
}

export const OperationInfoCard = ({ className, operationId }: Props) => {
  return (
    <Card className={className}>
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
}
