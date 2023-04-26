import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import assert from 'node:assert'
import { FC, useCallback } from 'react'
import { createOperation } from '../../../api/client/operations.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationsContext } from '../../contexts/Operations.tsx'
import { Button } from '../../ui-kit/Button/Button.tsx'

export const OperationsCreate: FC = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { operationsPayload } = useOperationsContext()

  const handleCreate = useCallback(() => {
    void (async () => {
      assert(operationsPayload.walletId, 'walletId is not defined')

      try {
        setLoading(true)

        const { operationId } = await createOperation({
          name: 'Untitled',
          category: 'No category',
          date: new Date().toISOString(),
          incomeAmount: 0,
          expenseAmount: 0,
          incomeWalletId: null,
          expenseWalletId: operationsPayload.walletId,
        })

        await router.push(ROUTES.OPERATION(operationId))
      } finally {
        setLoading(false)
      }
    })()
  }, [operationsPayload.walletId, router, setLoading])

  if (!operationsPayload.walletId) {
    return null
  }

  return (
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
