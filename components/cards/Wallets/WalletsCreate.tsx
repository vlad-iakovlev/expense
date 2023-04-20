import { PlusIcon } from '@heroicons/react/20/solid'
import assert from 'assert'
import { useRouter } from 'next/router.js'
import { useCallback } from 'react'
import { createWallet } from '../../../api/client/wallets.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroupContext } from '../../contexts/Group.tsx'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { Button } from '../../ui-kit/Button/Button.tsx'

export const WalletsCreate = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { groupResponse } = useGroupContext()

  const handleCreate = useCallback(() => {
    void (async () => {
      assert(groupResponse, 'groupResponse is not defined')

      try {
        setLoading(true)

        const { walletId } = await createWallet({
          groupId: groupResponse.group.id,
          name: 'Untitled',
          currencyId: groupResponse.group.defaultCurrency.id,
        })

        await router.push(ROUTES.WALLET(walletId))
      } finally {
        setLoading(false)
      }
    })()
  }, [groupResponse, router, setLoading])

  if (!groupResponse) {
    return null
  }

  return (
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
