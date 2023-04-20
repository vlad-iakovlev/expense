import { PlusIcon } from '@heroicons/react/20/solid'
import assert from 'assert'
import { useRouter } from 'next/router.js'
import { FC, useCallback } from 'react'
import { createGroup } from '../../../api/client/groups.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { useCurrenciesContext } from '../../contexts/Currencies.tsx'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { Button } from '../../ui-kit/Button/Button.tsx'

export const GroupsCreate: FC = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { currenciesResponse } = useCurrenciesContext()

  const handleCreate = useCallback(() => {
    void (async () => {
      assert(currenciesResponse, 'currenciesResponse is not defined')

      try {
        setLoading(true)

        const { groupId } = await createGroup({
          name: 'Untitled',
          defaultCurrencyId:
            currenciesResponse.currencies.find((c) => c.name === 'USD')?.id ??
            '',
        })

        await router.push(ROUTES.GROUP(groupId))
      } finally {
        setLoading(false)
      }
    })()
  }, [currenciesResponse, router, setLoading])

  return (
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
