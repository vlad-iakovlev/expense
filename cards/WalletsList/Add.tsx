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
    const href = ROUTES.WALLET(walletId)
    void router.push({ pathname: href, query: { animation: 'forward' } }, href)
  }, [createWallet, router])

  return (
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}
