import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import { FC, useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useOperations } from '../../../stores/RootStore/hooks/useOperations.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'

interface Props {
  walletId: string | undefined
}

export const OperationsCreate: FC<Props> = ({ walletId }) => {
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
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
