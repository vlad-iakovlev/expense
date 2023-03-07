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
  const { group } = useGroupContext()

  const handleCreate = useCallback(async () => {
    try {
      setLoading(true)

      const { wallet } = await createWallet({
        groupId: group.id,
        name: 'Untitled',
        currencyId: group.defaultCurrency.id,
      })

      await router.push(ROUTES.WALLET(wallet.id))
    } finally {
      setLoading(false)
    }
  }, [group.defaultCurrency.id, group.id, router, setLoading])

  return (
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
