import { FC, useCallback, useMemo } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useOperationContext } from '../../contexts/Operation'
import { Card, CardSelectOption } from '../../ui-kit/Card'

const income = { id: 'income', name: 'Income' }
const expense = { id: 'expense', name: 'Expense' }
const transfer = { id: 'transfer', name: 'Transfer' }
const unknown = { id: 'unknown', name: 'Unknown' }

const options: CardSelectOption[] = [income, expense, transfer]

export const OperationInfoType: FC = () => {
  const { operation, mutateOperation } = useOperationContext()

  const value = useMemo(() => {
    if (operation.incomeWallet && operation.expenseWallet) return transfer
    if (operation.incomeWallet) return income
    if (operation.expenseWallet) return expense
    return unknown
  }, [operation.expenseWallet, operation.incomeWallet])

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      const amount = operation.expenseAmount || operation.incomeAmount
      const wallet = operation.expenseWallet || operation.incomeWallet

      switch (option.id) {
        case 'income':
          await updateOperation({
            operationId: operation.id,
            incomeAmount: amount,
            expenseAmount: 0,
            incomeWalletId: wallet?.id || null,
            expenseWalletId: null,
          })
          break

        case 'expense':
          await updateOperation({
            operationId: operation.id,
            incomeAmount: 0,
            expenseAmount: amount,
            incomeWalletId: null,
            expenseWalletId: wallet?.id || null,
          })
          break

        case 'transfer':
          await updateOperation({
            operationId: operation.id,
            incomeAmount: amount,
            expenseAmount: amount,
            incomeWalletId: wallet?.id || null,
            expenseWalletId: wallet?.id || null,
          })
          break
      }

      await mutateOperation()
    },
    [
      mutateOperation,
      operation.expenseAmount,
      operation.expenseWallet,
      operation.id,
      operation.incomeAmount,
      operation.incomeWallet,
    ]
  )

  return (
    <Card.Select
      name="Type"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
