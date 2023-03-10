import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { createOperation } from '../../../api/client/operations'
import { ROUTES } from '../../../constants/routes'
import { useLoadingContext } from '../../contexts/Loading'
import { useWalletContext } from '../../contexts/Wallet'
import { Button } from '../../ui-kit/Button'

export const OperationsCreate = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { walletResponse } = useWalletContext()

  const handleCreate = useCallback(async () => {
    if (!walletResponse) return

    try {
      setLoading(true)

      const { operation } = await createOperation({
        name: 'Untitled',
        category: 'No category',
        date: new Date().toISOString(),
        incomeAmount: 0,
        expenseAmount: 0,
        incomeWalletId: null,
        expenseWalletId: walletResponse.wallet.id,
      })

      await router.push(ROUTES.OPERATION(operation.id))
    } finally {
      setLoading(false)
    }
  }, [router, setLoading, walletResponse])

  if (!walletResponse) {
    return null
  }

  return (
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
