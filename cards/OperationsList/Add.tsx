import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Button } from '@/components/common/Button'
import { ROUTES } from '@/constants/routes'
import { useOperations } from '@/contexts/RootStore/hooks/useOperations'

type AddProps = {
  walletId: string | undefined
}

export const Add = ({ walletId }: AddProps) => {
  const router = useRouter()
  const { createOperation } = useOperations({ walletId })

  const handleCreate = useCallback(() => {
    const operationId = createOperation()
    void router.push(ROUTES.OPERATION(operationId))
  }, [createOperation, router])

  if (!walletId) {
    return null
  }

  return (
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}
