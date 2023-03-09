import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { createWallet } from '../../../api/client/wallets'
import { ROUTES } from '../../../constants/routes'
import { useGroupContext } from '../../contexts/Group'
import { useLoadingContext } from '../../contexts/Loading'
import { Button } from '../../ui-kit/Button'

export const WalletsCreate = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { groupResponse } = useGroupContext()

  const handleCreate = useCallback(async () => {
    if (!groupResponse) return

    try {
      setLoading(true)

      const { wallet } = await createWallet({
        groupId: groupResponse.group.id,
        name: 'Untitled',
        currencyId: groupResponse.group.defaultCurrency.id,
      })

      await router.push(ROUTES.WALLET(wallet.id))
    } finally {
      setLoading(false)
    }
  }, [groupResponse, router, setLoading])

  if (!groupResponse) {
    return null
  }

  return (
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
