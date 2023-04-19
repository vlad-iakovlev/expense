import { FC, useCallback, useMemo } from 'react'
import { updateOperation } from '../../../api/client/operations.ts'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationContext } from '../../contexts/Operation.tsx'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

const income = { id: 'income', name: 'Income' }
const expense = { id: 'expense', name: 'Expense' }
const transfer = { id: 'transfer', name: 'Transfer' }
const unknown = { id: 'unknown', name: 'Unknown' }

const options: CardSelectOption[] = [income, expense, transfer]

export const OperationInfoType: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operationResponse, mutateOperation } = useOperationContext()

  const value = useMemo(() => {
    if (
      operationResponse?.operation.incomeWallet &&
      operationResponse.operation.expenseWallet
    ) {
      return transfer
    }

    if (operationResponse?.operation.incomeWallet) {
      return income
    }

    if (operationResponse?.operation.expenseWallet) {
      return expense
    }

    return unknown
  }, [
    operationResponse?.operation.expenseWallet,
    operationResponse?.operation.incomeWallet,
  ])

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      if (!operationResponse) return

      try {
        setLoading(true)

        const amount =
          operationResponse.operation.expenseAmount ||
          operationResponse.operation.incomeAmount
        const wallet =
          operationResponse.operation.expenseWallet ??
          operationResponse.operation.incomeWallet

        switch (option.id) {
          case 'income':
            await updateOperation({
              operationId: operationResponse.operation.id,
              incomeAmount: amount,
              expenseAmount: 0,
              incomeWalletId: wallet?.id ?? null,
              expenseWalletId: null,
            })
            break

          case 'expense':
            await updateOperation({
              operationId: operationResponse.operation.id,
              incomeAmount: 0,
              expenseAmount: amount,
              incomeWalletId: null,
              expenseWalletId: wallet?.id ?? null,
            })
            break

          case 'transfer':
            await updateOperation({
              operationId: operationResponse.operation.id,
              incomeAmount: amount,
              expenseAmount: amount,
              incomeWalletId: wallet?.id ?? null,
              expenseWalletId: wallet?.id ?? null,
            })
            break
        }

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operationResponse, setLoading]
  )

  if (!operationResponse) {
    return <Card.Skeleton />
  }

  return (
    <Card.Select
      name="Type"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
