import { useRouter } from 'next/router.js'
import React from 'react'
import { Button } from '@/components/common/Button.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useOperations } from '@/contexts/RootStore/hooks/useOperations.js'

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
