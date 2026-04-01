import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { Button } from '@/components/common/Button'
import { useOperations } from '@/contexts/RootStore/hooks/useOperations'

type AddProps = {
  walletId: string | undefined
}

export const Add = ({ walletId }: AddProps) => {
  const navigate = useNavigate()
  const { createOperation } = useOperations({ walletId })

  const handleCreate = useCallback(() => {
    const operationId = createOperation()
    void navigate({ to: '/operation/$operationId', params: { operationId } })
  }, [createOperation, navigate])

  if (!walletId) {
    return null
  }

  return (
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}
