import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { OperationInfoAmount } from './OperationInfoAmount'
import { OperationInfoCategory } from './OperationInfoCategory'
import { OperationInfoDate } from './OperationInfoDate'
import { OperationInfoName } from './OperationInfoName'
import { OperationInfoType } from './OperationInfoType'
import { OperationInfoWallet } from './OperationInfoWallet'

export const OperationInfoCard: FC = () => (
  <Card>
    <Card.Title title="Info" />
    <Card.Divider />
    <OperationInfoDate />
    <OperationInfoWallet />
    <OperationInfoCategory />
    <OperationInfoName />
    <OperationInfoType />
    <OperationInfoAmount />
  </Card>
)
