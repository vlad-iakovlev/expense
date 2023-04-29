import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import { FC, useCallback } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useWallets } from '../../../stores/RootStore/hooks/useWallets.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'

interface Props {
  groupId: string | undefined
}

export const WalletsCreate: FC<Props> = ({ groupId }) => {
  const router = useRouter()
  const { createWallet } = useWallets({ groupId })

  const handleCreate = useCallback(() => {
    const walletId = createWallet()
    void router.push(ROUTES.WALLET(walletId))
  }, [createWallet, router])

  if (!groupId) {
    return null
  }

  return (
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
