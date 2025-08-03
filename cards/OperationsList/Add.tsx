import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '@/components/common/Button'
import { ROUTES } from '@/constants/routes'
import { useOperations } from '@/contexts/RootStore/hooks/useOperations'

interface AddProps {
  walletId: string | undefined
}

export const Add = ({ walletId }: AddProps) => {
  const router = useRouter()
  const { createOperation } = useOperations({ walletId })

  const handleCreate = React.useCallback(() => {
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
