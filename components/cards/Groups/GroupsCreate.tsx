import { PlusIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { createGroup } from '../../../api/client/groups'
import { ROUTES } from '../../../constants/routes'
import { useCurrenciesContext } from '../../contexts/Currencies'
import { useLoadingContext } from '../../contexts/Loading'
import { Button } from '../../ui-kit/Button'

export const GroupsCreate = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { currenciesResponse } = useCurrenciesContext()

  const handleCreate = useCallback(async () => {
    if (!currenciesResponse) return

    try {
      setLoading(true)

      const { group } = await createGroup({
        name: 'Untitled',
        defaultCurrencyId:
          currenciesResponse.currencies.find((c) => c.name === 'USD')?.id || '',
      })

      await router.push(ROUTES.GROUP(group.id))
    } finally {
      setLoading(false)
    }
  }, [currenciesResponse, router, setLoading])

  return (
    <Button rounded size="sm" iconStart={<PlusIcon />} onClick={handleCreate} />
  )
}
