import { useRouter } from 'next/router.js'
import { FC, useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useWallets } from '../../../stores/RootStore/hooks/useWallets.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'

interface Props {
  groupId: string
}

export const Add: FC<Props> = ({ groupId }) => {
  const router = useRouter()
  const { createWallet } = useWallets({ groupId })

  const handleCreate = useCallback(() => {
    const walletId = createWallet()
    const href = ROUTES.WALLET(walletId)
    void router.push({ pathname: href, query: { animation: 'forward' } }, href)
  }, [createWallet, router])

  return (
    <Button rounded size="sm" onClick={handleCreate}>
      Add
    </Button>
  )
}
