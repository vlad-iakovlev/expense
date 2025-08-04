import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { Button } from '@/components/common/Button'
import { ROUTES } from '@/constants/routes'
import { useWallets } from '@/contexts/RootStore/hooks/useWallets'

type AddProps = {
  groupId: string
}

export const Add = ({ groupId }: AddProps) => {
  const router = useRouter()
  const { createWallet } = useWallets({ groupId })

  const handleCreate = useCallback(() => {
    const walletId = createWallet()
    void router.push(ROUTES.WALLET(walletId))
  }, [createWallet, router])

  return (
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}
