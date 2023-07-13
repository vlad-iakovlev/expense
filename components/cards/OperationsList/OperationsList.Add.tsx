import { useRouter } from 'next/router.js'
import { useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useOperations } from '../../../contexts/RootStore/hooks/useOperations.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'

interface Props {
  walletId: string | undefined
}

export const Add = ({ walletId }: Props) => {
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
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}
