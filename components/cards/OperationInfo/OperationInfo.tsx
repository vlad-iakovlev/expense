import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { OperationInfoCategory } from './OperationInfoCategory'
import { OperationInfoDate } from './OperationInfoDate'
import { OperationInfoDelete } from './OperationInfoDelete'
import { OperationInfoExpenseAmount } from './OperationInfoExpenseAmount'
import { OperationInfoExpenseWallet } from './OperationInfoExpenseWallet'
import { OperationInfoIncomeAmount } from './OperationInfoIncomeAmount'
import { OperationInfoIncomeWallet } from './OperationInfoIncomeWallet'
import { OperationInfoName } from './OperationInfoName'
import { OperationInfoType } from './OperationInfoType'

export const OperationInfoCard: FC = () => {
  return (
    <Card>
      <Card.Title title="Info" action={<OperationInfoDelete />} />
      <Card.Divider />
      <OperationInfoDate />
      <OperationInfoCategory />
      <OperationInfoName />
      <OperationInfoType />
      <OperationInfoExpenseWallet />
      <OperationInfoExpenseAmount />
      <OperationInfoIncomeWallet />
      <OperationInfoIncomeAmount />
    </Card>
  )
}
