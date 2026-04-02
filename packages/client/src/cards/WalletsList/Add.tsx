import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import { Button } from '@/components/Button'
import { useWallets } from '@/contexts/RootStore/hooks/useWallets'
import { Route as WalletRoute } from '@/routes/wallet.$walletId.index'

type AddProps = {
  groupId: string
}

export const Add = ({ groupId }: AddProps) => {
  const navigate = useNavigate()
  const { createWallet } = useWallets({ groupId })

  const handleCreate = useCallback(() => {
    const walletId = createWallet()
    void navigate({ to: WalletRoute.to, params: { walletId } })
  }, [createWallet, navigate])

  return (
    <Button rounded size="sm" theme="green" onClick={handleCreate}>
      Add
    </Button>
  )
}
