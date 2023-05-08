import { useRouter } from 'next/router.js'
import { FC, useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useOperations } from '../../../stores/RootStore/hooks/useOperations.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'

interface Props {
  walletId: string | undefined
}

export const Add: FC<Props> = ({ walletId }) => {
  const router = useRouter()
  const { createOperation } = useOperations({ walletId })

  const handleCreate = useCallback(() => {
    const operationId = createOperation()
    const href = ROUTES.OPERATION(operationId)
    void router.push({ pathname: href, query: { animation: 'forward' } }, href)
  }, [createOperation, router])

  if (!walletId) {
    return null
  }

  return (
    <Button rounded size="sm" onClick={handleCreate}>
      Add
    </Button>
  )
}
