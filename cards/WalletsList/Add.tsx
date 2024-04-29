import { useRouter } from 'next/router.js'
import React from 'react'
import { Button } from '@/components/common/Button.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useWallets } from '@/contexts/RootStore/hooks/useWallets.js'

interface AddProps {
  groupId: string
}

export const Add = ({ groupId }: AddProps) => {
  const router = useRouter()
  const { createWallet } = useWallets({ groupId })

  const handleCreate = React.useCallback(() => {
    const walletId = createWallet()
    void router.push(
      `${ROUTES.WALLET(walletId)}?animation=forward`,
      ROUTES.WALLET(walletId),
    )
  }, [createWallet, router])

  return (
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}
