import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '@/components/common/Button'
import { ROUTES } from '@/constants/routes'
import { useWallets } from '@/contexts/RootStore/hooks/useWallets'

interface AddProps {
  groupId: string
}

export const Add = ({ groupId }: AddProps) => {
  const router = useRouter()
  const { createWallet } = useWallets({ groupId })

  const handleCreate = React.useCallback(() => {
    const walletId = createWallet()
    void router.push(ROUTES.WALLET(walletId))
  }, [createWallet, router])

  return (
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}
