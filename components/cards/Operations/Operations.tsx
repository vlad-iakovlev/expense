import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, Fragment, useCallback } from 'react'
import { createOperation } from '../../../api/client/operations'
import { ROUTES } from '../../../constants/routes'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationsContext } from '../../contexts/Operations'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'
import { OperationsCategory } from './OperationsCategory'
import { OperationsExpenseItem } from './OperationsExpenseItem'
import { OperationsIncomeItem } from './OperationsIncomeItem'
import { OperationsTransferItem } from './OperationsTransferItem'

export const OperationsCard: FC = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const {
    operations,
    operationsQuery,
    hasPrevOperations,
    hasNextOperations,
    getPrevOperations,
    getNextOperations,
  } = useOperationsContext()

  const handleCreate = useCallback(async () => {
    if (!operationsQuery.walletId) return

    try {
      setLoading(true)

      const { operation } = await createOperation({
        name: 'Untitled',
        category: 'No category',
        date: new Date().toISOString(),
        incomeAmount: 0,
        expenseAmount: 0,
        incomeWalletId: operationsQuery.walletId,
        expenseWalletId: null,
      })

      await router.push(ROUTES.OPERATION(operation.id))
    } finally {
      setLoading(false)
    }
  }, [operationsQuery.walletId, router, setLoading])

  if (!operationsQuery.walletId && !operations.length) return null

  return (
    <Card>
      <Card.Title
        title="Operations"
        action={
          operationsQuery.walletId ? (
            <Button
              rounded
              size="sm"
              iconStart={<PlusIcon />}
              onClick={handleCreate}
            />
          ) : undefined
        }
      />

      <Card.Divider />

      <OperationsCategory />

      {operations.length ? <Card.Divider /> : null}

      {operations.map((operation) => (
        <Fragment key={operation.id}>
          {operation.incomeWallet && operation.expenseWallet ? (
            <OperationsTransferItem operation={operation} />
          ) : null}
          {operation.incomeWallet && !operation.expenseWallet ? (
            <OperationsIncomeItem operation={operation} />
          ) : null}
          {!operation.incomeWallet && operation.expenseWallet ? (
            <OperationsExpenseItem operation={operation} />
          ) : null}
        </Fragment>
      ))}

      {hasPrevOperations || hasNextOperations ? (
        <>
          <Card.Divider />

          <Card.Pagination
            hasPrev={hasPrevOperations}
            hasNext={hasNextOperations}
            onPrevClick={getPrevOperations}
            onNextClick={getNextOperations}
          />
        </>
      ) : null}
    </Card>
  )
}
