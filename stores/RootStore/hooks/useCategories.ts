import { useCallback, useMemo } from 'react'
import { ClientCategory } from '../../../types/client.ts'
import { useRootStore } from '../RootStore.tsx'
import { getAvailableOperations } from '../getters/operations.ts'
import { CategoriesActionTypes } from '../types.tsx'

interface Props {
  groupId?: string
  walletId?: string
}

export const useCategories = ({ groupId, walletId }: Props = {}) => {
  const { state, dispatch } = useRootStore()

  const categories = useMemo<ClientCategory[]>(() => {
    const operations = getAvailableOperations(state, { groupId, walletId })

    const categoriesMap = operations.reduce<
      Record<string, ClientCategory | undefined>
    >((acc, operation) => {
      let category = acc[operation.category]
      if (!category) {
        category = { name: operation.category, operationsCount: 0 }
        acc[operation.category] = category
      }

      category.operationsCount++

      return acc
    }, {})

    const categories = Object.values(categoriesMap) as ClientCategory[]
    return categories.sort((a, b) => a.name.localeCompare(b.name))
  }, [groupId, state, walletId])

  const renameCategory = useCallback(
    (oldName: string, newName: string) => {
      dispatch({
        type: CategoriesActionTypes.RENAME_CATEGORY,
        payload: { oldName, newName },
      })
    },
    [dispatch]
  )

  return {
    categories,
    renameCategory,
  }
}
